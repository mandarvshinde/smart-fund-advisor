
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { User } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  updateUser: (updatedUser: User) => Promise<void>;
  toggleAgenticAI: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Function to create a user profile from Supabase user
  const createUserProfileFromAuth = (supabaseUser: SupabaseUser): User => {
    return {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata.name || supabaseUser.email?.split('@')[0] || "User",
      email: supabaseUser.email || "",
      profileImage: null,
      riskAppetite: (supabaseUser.user_metadata.risk_appetite as 'low' | 'moderate' | 'high') || 'moderate',
      agenticAIEnabled: false,
    };
  };

  useEffect(() => {
    console.log("UserContext initialization");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        
        // Update the session immediately
        setSession(currentSession);
        
        // Handle user state separately
        if (currentSession?.user) {
          // Use setTimeout to prevent potential auth deadlocks
          setTimeout(() => {
            fetchUserProfile(currentSession.user);
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        console.log("Checking for existing session");
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Got existing session:", currentSession?.user?.email);
        
        setSession(currentSession);
        
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user);
        } else {
          console.log("No session found");
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        toast({
          title: 'Authentication Error',
          description: 'Failed to initialize authentication. Please try again.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log("Fetching profile for user:", supabaseUser.id);
      // Use proper type annotations for Supabase queries
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Failed to fetch profile:', error);
        // If we can't fetch the profile, still create a user object from auth data
        setUser(createUserProfileFromAuth(supabaseUser));
      } else if (data) {
        // Safely cast the data object
        setUser({
          id: data.id,
          name: data.name || supabaseUser.user_metadata.name || "User",
          email: data.email || supabaseUser.email || "",
          profileImage: data.profile_image,
          riskAppetite: data.risk_appetite as 'low' | 'moderate' | 'high',
          agenticAIEnabled: data.agentic_ai_enabled,
        });
      } else {
        console.log("No profile found, creating from metadata");
        // Fallback to user metadata if profile doesn't exist yet
        setUser(createUserProfileFromAuth(supabaseUser));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // If we encounter an error, still create a user object from auth data
      setUser(createUserProfileFromAuth(supabaseUser));
      toast({
        title: 'Error',
        description: 'Failed to load user profile. Using basic profile information.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedUser: User) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updatedUser.name,
          profile_image: updatedUser.profileImage,
          risk_appetite: updatedUser.riskAppetite,
          agentic_ai_enabled: updatedUser.agenticAIEnabled,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedUser.id);

      if (error) throw error;

      setUser(updatedUser);
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

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      
      toast({
        title: 'Signed out',
        description: 'You have been signed out of your account.',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, session, isLoading, updateUser, toggleAgenticAI, logout }}>
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
