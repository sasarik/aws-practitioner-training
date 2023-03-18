import { useEffect } from 'react';

export const useSetCurrentUser = (userId: string) =>
  useEffect(() => {
    localStorage.setItem('currentUserId', userId);
    return () => {
      // cleanup
      localStorage.removeItem('currentUserId');
    };
  }, [userId]);

export const useGetCurrentUser = () => {
  return localStorage.getItem('currentUserId') ?? 'unknownUser';
};
