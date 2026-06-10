import { useState } from "react";
import { signIn, signOut } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";

export function useAuth() {
  const { user, loading } = useAuthContext();
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setAuthLoading(true);
    setError(null);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    await signOut();
    setAuthLoading(false);
  };

  return {
    user,
    loading: loading || authLoading,
    error,
    login,
    logout,
    isAdmin: !!user,
  };
}
