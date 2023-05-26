const SERVER_IP = "doca-web.onrender.com";

export const ENV = {
  BASE_PATH: `https://${SERVER_IP}`,
  BASE_API: `https://${SERVER_IP}/api/v1`,
  API_ROUTER: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    USER_ME: "user/me",
    REFRESH_TOKEN: "auth/refresh_access_token",
    UPDATE_USER:'user',
    CREATE_TODO:'todo',
    GET_TODOS:'todo'

  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
