import axiosInstance from "@/utils/axios";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  setIsAuthenticate: (isAuthenticated: boolean) => void;
  setUser: React.Dispatch<
    React.SetStateAction<{
      email: string;
      userType: string;
      firstName: string;
      lastName: string;
      isDeleted: boolean;
      phoneNumber: string;
    }>
  >;
  getProfile: () => void;
  isAuthenticate: boolean;
  user: {
    email: string;
    userType: string;
    firstName: string;
    lastName: string;
    isDeleted: boolean;
    phoneNumber: string;
  };
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    email: "",
    userType: "",
    firstName: "",
    lastName: "",
    isDeleted: true,
    phoneNumber: "",
  });
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get("/user/profile");
      setUser(data);
      setIsAuthenticate(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticate,
        setIsAuthenticate,
        user,
        setUser,
        isLoading,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
