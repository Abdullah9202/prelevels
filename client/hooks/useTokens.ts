import { useState, useEffect, useCallback } from "react";
import { useUser } from "./useUser";
import { usePasswordStore } from "./usePassword";
import Cookies from "js-cookie";


const useTokens = () => {
  const password = usePasswordStore((state) => state.password);
  const user = useUser((state) => state.user);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Fetch tokens from backend
  const fetchTokens = useCallback(async (): Promise<void> => {
    if (!user?.username || !password) {
      console.warn("Missing credentials. Cannot fetch tokens.");
      return;
    }
  
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/token/pair', { // AZAK
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user?.username, password }),
      });
  
      if (!res.ok) throw new Error("Failed to fetch tokens");
  
      const data = await res.json();
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      Cookies.set("accessToken", data.access, { expires: 1 });
      Cookies.set("refreshToken", data.refresh, { expires: 7 });
  
      console.log("Tokens fetched successfully");
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  }, [user?.username, password]);
  

  // Refresh access token using refresh token
// Only refresh if the refreshToken exists
  const refreshAccessTokens = useCallback(async (): Promise<boolean> => {
    if (!refreshToken) {
      console.warn("Refresh token is missing. Cannot refresh access token.");
      return false;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/token/refresh', { // AZAK
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!res.ok) throw new Error("Failed to refresh access token");

      const data = await res.json();
      setAccessToken(data.access);
      Cookies.set("accessToken", data.access, { expires: 7 });

      console.log("Access token refreshed successfully");
      return true;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return false;
    }
  }, [refreshToken]);


  // Verify access token
  const verifyAccessToken = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/token/verify', { // AZAK
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: accessToken }),
      });

      if (res.ok) {
        console.log("Access token is valid");
        return true; // Token is valid
      } else {
        console.warn("Access token invalid. Attempting to refresh...");
        if (refreshToken) {
          const refreshed = await refreshAccessTokens();
          return refreshed;
        }
      }
    } catch (error) {
      console.error("Error verifying access token:", error);
    }

    return false; // Token is invalid and could not be refreshed
  }, [accessToken, refreshToken, refreshAccessTokens]);

  // Retrieve tokens from cookies on mount
  useEffect(() => {
    const storedAccessToken = Cookies.get("accessToken");
    const storedRefreshToken = Cookies.get("refreshToken");
    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
  }, []);

  // Automatically refresh token every 4.5 minutes (270,000 ms)
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("Attempting to refresh access token...");
      const refreshed = await refreshAccessTokens();
      if (!refreshed) {
        console.error("Failed to refresh token. Consider logging out the user.");
      }
    }, 300000); // 5 minutes in milliseconds
  
    return () => clearInterval(interval);
  }, [refreshAccessTokens]);
  

  return {
    accessToken,
    refreshToken,
    fetchTokens,
    verifyAccessToken,
    refreshAccessTokens,
  };
};

export default useTokens;