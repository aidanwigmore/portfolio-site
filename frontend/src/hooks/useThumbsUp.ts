import { useState, useEffect, useCallback } from 'react';
import api from '@/api/axios';

export function useThumbsUp(type: 'video' | 'project') {
  const [thumbsUpCounts, setThumbsUpCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  const fetchThumbsUpCounts = useCallback(async () => {
    try {
      const response = await api.get(`ratable-items/?type=${type}`);
      const counts: { [key: string]: number } = {};
      response.data.forEach((item: any) => {
        counts[item.external_id] = item.thumbs_up_count;
      });
      setThumbsUpCounts(counts);
    } catch (error) {
      console.error('Error fetching thumbs up counts:', error);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchThumbsUpCounts();
  }, [type, fetchThumbsUpCounts]);

  const handleThumbsUp = useCallback(async (externalId: string) => {
    try {
      const response = await api.get(`ratable-items/?type=${type}`);
      const item = response.data.find((i: any) => i.external_id === externalId);
      
      if (item) {
        await api.post(`ratable-items/${item.id}/add_thumbs_up/`);
        
        setThumbsUpCounts(prev => ({
          ...prev,
          [externalId]: (prev[externalId] || 0) + 1
        }));
      }
    } catch (error) {
      console.error('Error adding thumbs up:', error);
    }
  }, [type]);

  return { thumbsUpCounts, handleThumbsUp, loading };
}