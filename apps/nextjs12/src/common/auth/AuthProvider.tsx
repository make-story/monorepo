/**
 * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 * https://github.com/sanjay-arya/react-auth-demo
 */
import axios from 'axios';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface IProviderValue {
  token: string;
  setToken: (newToken: string) => void;
}

const AuthContext = createContext<IProviderValue | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  // State to hold the authentication token
  const [token, setToken_] = useState<string>(
    localStorage.getItem('token') || '',
  );

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue: IProviderValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token],
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/*
import { useAuth } from "authProvider";
// ...
const Index = () => {
  const { token } = useAuth();
  // ...
};
*/
export const useAuth = () => {
  return useContext(AuthContext);
};

/*
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
*/
export default AuthProvider;
