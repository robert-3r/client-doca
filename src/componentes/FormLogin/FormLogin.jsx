import { useFormik } from "formik";
import { useState } from "react";
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from "./FormLogin.form";
import { Auth } from "../../api";
import { useAuth } from "../../hooks";

const authController = new Auth();

export const FormLogin = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(formValue);

        authController.setAccessToken(response.access);
        authController.setRefreshToken(response.refresh);

        login(response.access);
        setSuccess("Inicio de sesion de correcto");
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          setError("");
          setSuccess("");
        }, 4000);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        type="email"
        name="email"
        placeholder="Correo  electronico"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Iniciar sesión
      </Form.Button>

      {error !== "" && <p className="register-form__error">{error}</p>}
      {success !== "" && <p className="register-form__success">{success}</p>}
    </Form>
  );
};
