import api from '@/api/axios';
import { PortfolioImage, AccessPassword } from '@/types/Image';

export const uploadImage = (formData: FormData) => 
  api.post<PortfolioImage>('images/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const getImages = (category?: string) => 
  api.get<PortfolioImage[]>('images/', { 
    params: { category } 
  });

export const getImagesByCategory = (category: string) => 
  api.get<PortfolioImage[]>(`images/by_category/?category=${category}`);

export const deleteImage = (id: number) => 
  api.delete(`images/${id}/`);

export const createPassword = (data: Partial<AccessPassword>) => 
  api.post<AccessPassword>('passwords/', data);

export const getPasswords = () => 
  api.get<AccessPassword[]>('passwords/');

export const deletePassword = (id: number) => 
  api.delete(`passwords/${id}/`);

export const verifyPassword = (password: string) => 
  api.post('passwords/verify_password/', { password });

export const getPasswordUsageStats = (passwordId: number) => 
  api.get(`passwords/usage_stats/?password_id=${passwordId}`);
