import { useEffect } from "react";

/**
 * @description The `authorization_token` initialize;
 * `authorization_token` is Base64 of `${username}:${password-of-username}`
 */
export const useSetAuthorizationToken = (decodedValue: string) =>
  useEffect(() => {
    localStorage.setItem('authorization_token', decodedValue);
    return () => {
      // cleanup
      localStorage.removeItem('authorization_token');
    };
  }, [decodedValue]);
/**
 * @description Returns stored `authorization_token`;
 * `authorization_token` is Base64 of `${username}:${password-of-username}`
 */
export const useGetAuthorizationToken = () => localStorage.getItem('authorization_token');
