import api from 'axios';
import { PortfolioImage, PasswordVerificationResponse } from '@/types/Gallery';

export const verifyPassword = (password: string) =>
  api.post<PasswordVerificationResponse>('passwords/verify_password/', { password });

export const getImagesByCategory = (category: string) =>
  api.get<PortfolioImage[]>(`images/by_category/?category=${category}`);

export const getAllImages = () =>
  api.get<PortfolioImage[]>('images/');

export const getImageUrl = (imagePath: string): string => {
  const base = (api.defaults.baseURL || '').replace(/\/api\/?$/, '');
  return `${base}${imagePath}`;
};
