import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { usePasswordStore } from "./usePassword";

const useTokens = () => {
  const password = usePasswordStore((state) => state.password);
  const user = useUser((state) => state.user);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Fetch tokens from backend
  const fetchTokens = async (): Promise<void> => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/token/pair", { // AZAK
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user?.username, password: password }),
      });

      if (!res.ok) throw new Error("Failed to fetch tokens");

      const data = await res.json();
      setAccessToken(data.access);
      setRefreshToken(data.refresh);

      console.log("Tokens fetched successfully");
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  };

  // Refresh access token using refresh token
  const refreshAccessTokens = async (): Promise<boolean> => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/token/refresh", { // AZAK
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!res.ok) throw new Error("Failed to refresh access token");

      const data = await res.json();
      setAccessToken(data.access);

      console.log("Access token refreshed successfully");
      return true;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return false;
    }
  };

  // Verify access token
  const verifyAccessToken = async (): Promise<boolean> => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/token/verify", { // AZAK
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
  };

  return {
    accessToken,
    refreshToken,
    fetchTokens,
    verifyAccessToken,
    refreshAccessTokens,
  };
};

export default useTokens;
