import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { supabase } from "../lib/supabase";
import { User } from "../models/user.model";

type AuthContextModel = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string, username: string) => Promise<User | null>;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  updateUsername: (newUsername: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextModel>({
  user: null,
  loading: true,
  error: null,
  signup: async () => null,
  login: async () => null,
  logout: async () => {},
  updateUsername: async () => false,
  updatePassword: async () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        if (data.session) {
          const userData = localStorage.getItem("user");
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const userData = localStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signup = async (email: string, password: string, username: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        setError(error.message);
        return null;
      }

      if (data.user) {
        const newUser: User = {
          id: data.user.id,
          email: data.user.email || "",
          username,
          created_at: new Date().toISOString(),
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        return newUser;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return null;
      }

      if (data.user) {
        const newUser: User = {
          id: data.user.id,
          email: data.user.email || "",
          username: data.user.user_metadata?.username || email.split("@")[0],
          created_at: data.user.created_at,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        return newUser;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("user");
      setUser(null);
      setLoading(false);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
      setLoading(false);
    }
  };

  const updateUsername = async (newUsername: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { username: newUsername },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return false;
      }

      if (user) {
        const updatedUser = { ...user, username: newUsername };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      setLoading(false);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
      setLoading(false);
      return false;
    }
  };

  const updatePassword = async (newPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return false;
      }

      setError(null);
      setLoading(false);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
      setLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signup,
        login,
        logout,
        updateUsername,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

