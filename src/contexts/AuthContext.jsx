import { useEffect, useState, createContext } from "react";
import { User, Auth } from "../api";
import { hasExpiredToken } from "../utils";

export const AuthContext = createContext();

const userController = new User();
const authController = new Auth();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();

      if (!accessToken || !refreshToken) {
        logout();
        setLoading(false);
        return;
      }

      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await reLogin();
        }
      } else {
        await login(accessToken);
      }

      setLoading(false);
    })();
  }, []);

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = await authController.refreshAccessToken(
        refreshToken
      );

      authController.setAccessToken(accessToken);
      await login(accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (accessToken) => {
    try {
      const response = await userController.getMe(accessToken);

      setUser(response.response);
      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeToken();
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
