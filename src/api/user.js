import { ENV } from "../utils";

export class User {
  baseApi = ENV.BASE_API;

  async getMe(accessToken) {
    // eslint-disable-next-line no-useless-catch
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTER.USER_ME}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(accessToken, idUser, userData) {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = userData;

      if (!data.password) {
        delete data.password;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTER.UPDATE_USER}/${idUser}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
