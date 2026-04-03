# Azure Deployment Guide

This document walks you through deploying the portfolio site to Azure.

The architecture is:

| Component | Azure service |
|---|---|
| React frontend (SPA) | Azure Static Web Apps |
| Django backend (API) | Azure App Service (Linux, Python 3.11) |
| Database | Azure Database for PostgreSQL – Flexible Server |
| Media uploads (images) | Azure Blob Storage |

---

## Prerequisites

- An [Azure account](https://portal.azure.com) with an active subscription
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) installed and logged in (`az login`)
- [GitHub repository](https://github.com) with this code pushed to `main`
- Node.js 20 and Python 3.11 installed locally (for local testing only)

---

## Step 1 — Create Azure resources

Run the following Azure CLI commands. Replace every value in `<angle-brackets>` with your own names. Resource names must be **globally unique** where indicated.

```bash
# Log in
az login

# Create a resource group to hold everything
az group create --name portfolio-rg --location australiaeast

# ── PostgreSQL ────────────────────────────────────────────────────────────────
# Create the database server (globally unique name required)
az postgres flexible-server create \
  --resource-group portfolio-rg \
  --name portfolio-db-server \           # <-- must be globally unique
  --location australiaeast \
  --admin-user dbadmin \
  --admin-password "<STRONG_DB_PASSWORD>" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --version 15 \
  --public-access 0.0.0.0

# Create the database
az postgres flexible-server db create \
  --resource-group portfolio-rg \
  --server-name portfolio-db-server \
  --database-name portfoliodb

# ── Storage Account ────────────────────────────────────────────────────────────
# Create a storage account (globally unique name, lowercase, no hyphens)
az storage account create \
  --name portfoliomedia \               # <-- must be globally unique
  --resource-group portfolio-rg \
  --location australiaeast \
  --sku Standard_LRS \
  --kind StorageV2

# Create the blob container for media uploads
az storage container create \
  --name media \
  --account-name portfoliomedia \
  --public-access blob               # images served publicly via URL

# ── App Service (backend) ─────────────────────────────────────────────────────
az appservice plan create \
  --name portfolio-plan \
  --resource-group portfolio-rg \
  --is-linux \
  --sku B1

az webapp create \
  --name portfolio-backend \           # <-- must be globally unique
  --resource-group portfolio-rg \
  --plan portfolio-plan \
  --runtime "PYTHON:3.11"

# ── Static Web App (frontend) ─────────────────────────────────────────────────
az staticwebapp create \
  --name portfolio-frontend \          # <-- must be globally unique
  --resource-group portfolio-rg \
  --location eastus2 \                 # Static Web Apps have limited regions
  --sku Free
```

---

## Step 2 — Collect secrets and connection strings

### 2a. PostgreSQL connection string

```bash
# Format: postgres://USER:PASSWORD@HOST:5432/DBNAME
# Replace <STRONG_DB_PASSWORD> with the password you set above.
echo "postgres://dbadmin:<STRONG_DB_PASSWORD>@portfolio-db-server.postgres.database.azure.com:5432/portfoliodb"
```

Make a note of this — it becomes `DATABASE_URL` in Step 3.

### 2b. Django secret key

Generate a cryptographically strong key:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy the output — it becomes `SECRET_KEY` in Step 3.

### 2c. Azure Storage account key

```bash
az storage account keys list \
  --resource-group portfolio-rg \
  --account-name portfoliomedia \
  --query "[0].value" -o tsv
```

Copy the output — it becomes `AZURE_ACCOUNT_KEY` in Step 3.

### 2d. Azure App Service publish profile

```bash
az webapp deployment list-publishing-profiles \
  --name portfolio-backend \
  --resource-group portfolio-rg \
  --xml
```

Copy the entire XML output — it becomes `AZURE_WEBAPP_PUBLISH_PROFILE` in Step 4.

### 2e. Azure Static Web Apps deployment token

```bash
az staticwebapp secrets list \
  --name portfolio-frontend \
  --resource-group portfolio-rg \
  --query "properties.apiKey" -o tsv
```

Copy the output — it becomes `AZURE_STATIC_WEB_APPS_API_TOKEN` in Step 4.

---

## Step 3 — Configure Azure App Service Application Settings (backend environment variables)

These are the environment variables Django reads at runtime. Go to:

**Azure Portal → App Services → portfolio-backend → Settings → Environment variables**

Or set them all at once with the CLI:

```bash
az webapp config appsettings set \
  --name portfolio-backend \
  --resource-group portfolio-rg \
  --settings \
    SECRET_KEY="<output from Step 2b>" \
    DEBUG="False" \
    ALLOWED_HOSTS="portfolio-backend.azurewebsites.net" \
    CORS_ALLOWED_ORIGINS="https://portfolio-frontend.azurestaticapps.net" \
    DATABASE_URL="<output from Step 2a>" \
    AZURE_ACCOUNT_NAME="portfoliomedia" \
    AZURE_ACCOUNT_KEY="<output from Step 2c>" \
    AZURE_MEDIA_CONTAINER="media"
```

**Important:** replace every `<...>` placeholder with your real values before running.

---

## Step 4 — Add GitHub Actions secrets

Go to your GitHub repository → **Settings → Secrets and variables → Actions → New repository secret** and add each secret below.

| Secret name | Value |
|---|---|
| `REACT_APP_API_URL` | `https://portfolio-backend.azurewebsites.net/api/` |
| `AZURE_WEBAPP_NAME` | `portfolio-backend` |
| `AZURE_WEBAPP_PUBLISH_PROFILE` | Full XML output from Step 2d |
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Token output from Step 2e |

---

## Step 5 — First deployment

Push to `main` (or trigger the workflow manually in GitHub → Actions → "Build and Deploy to Azure" → Run workflow). The pipeline will:

1. Build the React app with `REACT_APP_API_URL` baked in
2. Deploy the frontend to Azure Static Web Apps
3. Install Python dependencies and run Django tests
4. Deploy the backend to Azure App Service
5. On startup, `startup.sh` runs `migrate` and `collectstatic` automatically

---

## Step 6 — Create the Django superuser (one-time)

After the first successful deployment, SSH into the App Service to create an admin account:

```bash
az webapp ssh --name portfolio-backend --resource-group portfolio-rg
```

Inside the SSH session:

```bash
cd /home/site/wwwroot
python manage.py createsuperuser
```

The Django admin is then available at:
`https://portfolio-backend.azurewebsites.net/admin/`

---

## Step 7 — Firewall: allow App Service to reach PostgreSQL

By default the database server blocks outside connections. Allow the App Service outbound IP:

```bash
# Get the App Service outbound IPs
az webapp show \
  --name portfolio-backend \
  --resource-group portfolio-rg \
  --query "outboundIpAddresses" -o tsv

# Add a firewall rule for each IP (repeat for each comma-separated IP above)
az postgres flexible-server firewall-rule create \
  --resource-group portfolio-rg \
  --name portfolio-db-server \
  --rule-name AllowAppService \
  --start-ip-address <IP_FROM_ABOVE> \
  --end-ip-address <IP_FROM_ABOVE>
```

---

## Local development (no Azure required)

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env              # edit .env and set SECRET_KEY=anything
python manage.py migrate
python manage.py runserver

# Frontend (separate terminal)
cd frontend
npm install
cp .env.example .env.production.local   # edit: set REACT_APP_API_URL=http://127.0.0.1:8000/api/
npm start
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `DisallowedHost` error | Add your App Service hostname to `ALLOWED_HOSTS` in App Settings |
| CORS errors in browser | Add your Static Web App URL to `CORS_ALLOWED_ORIGINS` in App Settings |
| Media images 404 | Check `AZURE_ACCOUNT_NAME`, `AZURE_ACCOUNT_KEY`, `AZURE_MEDIA_CONTAINER` are all set; verify the container public access is `blob` |
| `OperationalError: could not connect to server` | Check the PostgreSQL firewall rules (Step 7) and `DATABASE_URL` format |
| Static CSS/JS missing on `/admin/` | Re-run `python manage.py collectstatic --noinput` inside the App Service SSH session |
| GitHub Actions deploy fails | Verify all four secrets in Step 4 are set correctly and contain no leading/trailing spaces |
