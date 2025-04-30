// hooks/useFetch.ts
import { useState, useEffect } from 'react';

const HOURS = 24; // <- Cambia este valor para ajustar el tiempo
const CACHE_TTL = HOURS * 60 * 60 * 1000; // Conversión automática a ms

export const useFetch = <T,>(fetchFunction: () => Promise<T>) => {
  const [apiData, setApiData] = useState<T | null>(null);

  useEffect(() => {
    const executeFetch = async () => {
      try {
        const cacheKey = `cache_${fetchFunction.name}`;
        const cachedData = localStorage.getItem(cacheKey);
        const now = Date.now();

        if (cachedData) {
          const { timestamp, data } = JSON.parse(cachedData);
          if (now - timestamp < CACHE_TTL) {
            setApiData(data);
            return;
          }
        }

        const result = await fetchFunction();
        localStorage.setItem(cacheKey, JSON.stringify({
          timestamp: now,
          data: result
        }));
        
        setApiData(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    executeFetch();
  }, [fetchFunction]);

  return apiData;
};