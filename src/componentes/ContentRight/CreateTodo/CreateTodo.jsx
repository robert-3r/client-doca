import { Form } from "semantic-ui-react";
import "./CreateTodo.scss";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./CreateTodo.form";
import { Todo } from "../../../api";
import { useAuth } from "../../../hooks";

const userController = new Todo();

export const CreateTodo = ({ handleReload }) => {
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = {
          name: formValue.name,
        };
        await userController.createTodo(accessToken, data);
        formik.resetForm();
        handleReload();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="create-todo">
      <Form className="create-todo__form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          name="name"
          placeholder="Nombre de la tarea"
          className="input"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Button
          className="create-todo__form-btn"
          fluid
          type="submit"
          color="primary"
          loading={formik.isSubmitting}
        >
          Agregar
        </Form.Button>
      </Form>
    </div>
  );
};
