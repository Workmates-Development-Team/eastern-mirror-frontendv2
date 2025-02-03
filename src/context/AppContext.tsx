

import axiosInstance from '@/utils/axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthorContextType {

    setAuthors: React.Dispatch<React.SetStateAction<{
        _id: string; name: string; email: string; username: string; avatar: string
    }[]>>;
    authors: {
        _id: string;
        name: string;
        email: string;
        username: string;
        avatar: string;
    }[];
    getAuthors: () => Promise<void>;
}

const AuthorContext = createContext<AuthorContextType | undefined>(undefined);;

import { ReactNode } from 'react';


const AuthorProvider = ({ children }: { children: ReactNode }) => {
    const [authors, setAuthors] = useState<{ _id: string; name: string; email: string; username: string; avatar: string }[]>([]);

    const getAuthors = async () => {
        try {
          const { data } = await axiosInstance.get(
            `/author/all`
          );
          setAuthors(data?.authors);
        } catch (error) {
        }
      };
    
      useEffect(() => {
        getAuthors();
      }, []);

    return (
        <AuthorContext.Provider value={{ setAuthors, authors, getAuthors }}>
            {children}
        </AuthorContext.Provider>
    );
};


const useAuthorContext = () => {
    const context = useContext(AuthorContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export { AuthorProvider, useAuthorContext };