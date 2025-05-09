import { getCurrentUser } from "@/services/authService";
import { IUser } from "@/types/user";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => Promise<void>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fetchAndSetUser: () => Promise<void>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const fetchAndSetUser = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();

      setUserState(currentUser);
    } catch (error: any) {
      console.error("Error fetching user:", error);
      setUserState(null);
    } finally {
      setIsLoading(false);
      setInitialLoadComplete(true);
    }
  };

  const setUser = async (user: IUser | null) => {
    setUserState(user);
  };

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  // Only render children after initial load is complete
  if (!initialLoadComplete) {
    return <div></div>;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        setIsLoading,
        fetchAndSetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
