
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { fetchUser, updateUserSettings } from '@/services/mockData';
import { useToast } from '@/components/ui/use-toast';

interface UserContextProps {
  user: User | null;
  isLoading: boolean;
  updateUser: (updatedUser: User) => Promise<void>;
  toggleAgenticAI: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load user data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [toast]);

  const updateUser = async (updatedUser: User) => {
    setIsLoading(true);
    try {
      const result = await updateUserSettings(updatedUser);
      setUser(result);
      toast({
        title: 'Success',
        description: 'Your settings have been updated.',
      });
    } catch (error) {
      console.error('Failed to update user settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAgenticAI = async () => {
    if (!user) return;
    
    try {
      const updatedUser = { 
        ...user, 
        agenticAIEnabled: !user.agenticAIEnabled 
      };
      
      await updateUser(updatedUser);
      
      toast({
        title: user.agenticAIEnabled ? 'Agentic AI Disabled' : 'Agentic AI Enabled',
        description: user.agenticAIEnabled 
          ? 'AI will no longer take automatic actions on your behalf.' 
          : 'AI can now take actions on recommendations with your approval.',
      });
    } catch (error) {
      console.error('Failed to toggle agentic AI:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, updateUser, toggleAgenticAI }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
