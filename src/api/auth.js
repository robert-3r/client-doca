import { ENV } from "../utils";

export class Auth {
  base_api = ENV.BASE_API;

  async register(data) {
    // eslint-disable-next-line no-useless-catch
    try {
      const url = `${this.base_api}/${ENV.API_ROUTER.REGISTER}`;

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          firstname: data.firstname,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    // eslint-disable-next-line no-useless-catch
    try {
      const url = `${this.base_api}/${ENV.API_ROUTER.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const request = await fetch(url, params);
      const result = await request.json();

     

      if (request.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken(refreshToken) {
    // eslint-disable-next-line no-useless-catch
    try {
      const url = `${this.base_api}/${ENV.API_ROUTER.REFRESH_TOKEN}`;

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(refreshToken),
      };

      const request = await fetch(url, params);
      const result = await request.json();

      if (request.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  setAccessToken(token) {
    localStorage.setItem(ENV.JWT.ACCESS, token);
  }
  getAccessToken() {
    return localStorage.getItem(ENV.JWT.ACCESS);
  }
  setRefreshToken(token) {
    localStorage.setItem(ENV.JWT.REFRESH, token);
  }

  getRefreshToken() {
    return localStorage.getItem(ENV.JWT.REFRESH);
  }
  removeToken() {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  }
}
