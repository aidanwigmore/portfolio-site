import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { CustomButton } from '../../materials/Button';
import { verifyPassword } from '../../api/galleryService';

import Theme from "../../Theme";

interface PasswordPromptProps {
  onSuccess: (category: 'friends' | 'employers' | 'visitors') => void;
}

export default function PasswordPrompt({ onSuccess }: PasswordPromptProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await verifyPassword(password);
      onSuccess(response.data.category);
    } catch {
      setError('Invalid or expired password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: Theme.palette.primary.main,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Gallery Access
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Enter your access password to view the gallery.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={{ mb: 2 }}
              autoFocus
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <CustomButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || !password}
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Enter Gallery'}
            </CustomButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
