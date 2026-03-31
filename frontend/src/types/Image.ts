export interface PortfolioImage {
  id: number;
  name: string;
  image: string;
  date_taken: string;
  coordinates: string;
  camera_used: string;
  description: string;
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
