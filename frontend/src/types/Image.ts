export interface PortfolioImage {
  id: number;
  name: string;
  image: string;  // URL to image
  date_taken: string;  // ISO date
  coordinates: string;
  camera_used: string;
  description: string;
  category: 'friends' | 'employers' | 'visitors';
  created_at: string;
}

export interface AccessPassword {
  id: number;
  password: string;
  category: 'friends' | 'employers' | 'visitors';
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
}