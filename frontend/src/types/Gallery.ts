export interface PortfolioImage {
  id: number;
  name: string;
  image: string;
  date_taken: string;
  coordinates: string | null;
  camera_used: string | null;
  description: string | null;
  category: 'friends' | 'employers' | 'visitors';
  created_at: string;
  tags: string[];
}

export interface AccessPassword {
  id: number;
  password: string;
  category: 'friends' | 'employers' | 'visitors';
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
}

export interface PasswordVerificationResponse {
  valid: boolean;
  category: 'friends' | 'employers' | 'visitors';
}
