/* eslint-disable react/prop-types */
import { BsCheckCircle } from "react-icons/bs";
import { ImRadioUnchecked } from "react-icons/im";
import "./TodoItem.scss";
import { Todo } from "../../../api";
import { useAuth } from "../../../hooks";
import { Confirm, Dropdown, Form, Icon } from "semantic-ui-react";
import { useState } from "react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./TodoItem.form";
import { useTheme } from "../../../hooks";

const todoController = new Todo();

export const TodoItem = ({ todo, handleReload, setMessage }) => {
  const { accessToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { theme } = useTheme();

  const onActiveDesactive = async () => {
    try {
      const data = {
        completed: !todo.completed,
      };

      await todoController.updateUser(accessToken, data, todo._id);
      setMessage(
        !todo.completed
          ? "!Felicitaciones por cumplir tu tarea!"
          : "Asegurate de terminar esta tarea"
      );
      handleReload();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 3500);
    }
  };

  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const editTodo = () => {
    setIsEdit(true);
  };

  const formik = useFormik({
    initialValues: initialValues(todo),
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try {
        const data = {
          name: formValue.name,
        };
        await todoController.updateUser(accessToken, data, todo._id);
        setMessage("!Tarea actualizada correctamente!");
        handleReload();
        setIsEdit(false);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    },
  });

  const handleBlur = () => {
    if (isEdit) {
      formik.handleSubmit();
    }
  };

  const onDelete = async () => {
    try {
      await todoController.deleteTodo(accessToken, todo._id);

      handleReload();
      openCloseConfirm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={theme === "light" ? "todo-item" : "dark"}>
        <div className="ties"></div>

        <div className="todo-item__info">
          <div className="todo-item__info-text">
            <button onClick={onActiveDesactive}>
              {todo.completed ? <BsCheckCircle /> : <ImRadioUnchecked />}
            </button>
            {isEdit ? (
              <Form onSubmit={formik.handleSubmit}>
                <Form.TextArea
                  name="name"
                  placeholder="Nombre de tu tarea"
                  value={formik.values.name}
                  error={formik.touched.name && formik.errors.name}
                  onChange={formik.handleChange}
                  onBlur={handleBlur}
                />
              </Form>
            ) : (
              <h2>{todo.name}</h2>
            )}
          </div>
          <div className="todo-item__info-add">
            {" "}
            <Dropdown
              icon="ellipsis vertical"
              className="post-item__dropdown"
              direction="left"
            >
              <Dropdown.Menu>
                <Dropdown.Item onClick={editTodo}>
                  <Icon name="pencil" color="pink" />
                  Editar
                </Dropdown.Item>
                <Dropdown.Item onClick={openCloseConfirm}>
                  <Icon name="trash" color="red" />
                  Eliminar
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <Confirm
        content={`Eliminar la tarea '${todo.name}'`}
        onConfirm={onDelete}
        onCancel={openCloseConfirm}
        open={showConfirm}
        size="mini"
      />
    </>
  );
};
