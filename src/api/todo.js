import { ENV } from "../utils";

export class Todo {
  base_api = ENV.BASE_API;

  async getTodos(accessToken, completed, searchText = "", page, limit) {
    // eslint-disable-next-line no-useless-catch
    try {
      const pageFilter = `page=${page || 1}`;
      const limitFilter = `limit=${limit || 10}`;
      const isCompleted = `completed=${completed || false}`;
      const text = `search=${searchText ? searchText : ""}`;

      const url = `${this.base_api}/${ENV.API_ROUTER.GET_TODOS}?${text}&${isCompleted}&${pageFilter}&${limitFilter}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

    

      const request = await fetch(url, params);
      const result = await request.json();

      if (request.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createTodo(accessToken, todoData) {
    // eslint-disable-next-line no-useless-catch
    try {
      const url = `${this.base_api}/${ENV.API_ROUTER.CREATE_TODO}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(todoData),
      };

      const request = await fetch(url, params);
      const result = await request.json();

      if (request.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(accessToken, todoData, idTodo) {
    // eslint-disable-next-line no-useless-catch
    try {
      const url = `${this.base_api}/${ENV.API_ROUTER.CREATE_TODO}/${idTodo}`;
      const params = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(todoData),
      };

      const request = await fetch(url, params);
      const response = await request.json();

      console.log(response);
      if (request.status !== 200) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(accessToken, idTodo) {
    // eslint-disable-next-line no-useless-catch
    try {
      const url = `${this.base_api}/${ENV.API_ROUTER.GET_TODOS}/${idTodo}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const request = await fetch(url, params);
      const result = await request.json();

      if (request.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
