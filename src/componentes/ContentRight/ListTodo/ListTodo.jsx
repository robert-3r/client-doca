/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Todo } from "../../../api";
import { useAuth } from "../../../hooks";
import "./ListTodo.scss";
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
import { TodoItem } from "../TodoItem";
const todoController = new Todo();
import { useTheme } from "../../../hooks";
import { useRef } from "react";

export const ListTodo = ({ onReload, handleReload, searchText, completed }) => {
  const [todos, setTodos] = useState(null);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const { accessToken } = useAuth();
  const [pagination, setPagination] = useState();
  const { theme } = useTheme();
  const messageContainerRef = useRef(null);

  useEffect(() => {
    getTodos();
  }, [onReload, completed, searchText, page]);

  const getTodos = async () => {
    try {
      const response = await todoController.getTodos(
        accessToken,
        completed,
        searchText,
        page
      );
      setTodos(response.todos.docs);

      setPagination({
        limit: response.todos.limit,
        page: response.todos.page,
        pages: response.todos.pages,
        total: response.todos.total,
      });
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "start",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if (!todos) return <Loader active inline="centered" size="big" />;
  if (size(todos) === 0) return <p className="sin-todo">No hay tareas</p>;
  return (
    <div className="list-todo">
      <div className={message !== "" ? "list-todo-a" : "list-todo-m"}>
        {message !== "" && (
          <p
            ref={messageContainerRef}
            className={
              theme === "light"
                ? "list-todo__message-n light-m "
                : "list-todo__message-n  dark-m"
            }
          >
            {message}
          </p>
        )}
      </div>

      <div className="list-todo__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>

      {map(todos, (todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          handleReload={handleReload}
          setMessage={setMessage}
        />
      ))}
    </div>
  );
};
