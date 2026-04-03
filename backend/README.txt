py -m venv venv
source venv/Scripts/activate
pip install django djangorestframework psycopg2-binary django-cors-headers
django-admin startproject config .
python manage.py runserver
http://127.0.0.1:8000/

python -m manage makemigrations
python -m manage migrate

python -m manage createsuperuser
