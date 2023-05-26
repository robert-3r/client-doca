/* eslint-disable react/no-unescaped-entities */
import { Form } from "semantic-ui-react";
import "./FormRegister.scss";
import { useState } from "react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./FormRegister.form";
import { Auth } from "../../api";
import { useNavigate } from "react-router-dom";

const authController = new Auth();

export const FormRegister = () => {
  const [error, setError] = useState("");
  const [correct, setCorrect] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await authController.register(formValue);
        setCorrect("Registrado correctamente");
        navigate("/");
      } catch (error) {
        setError("Ocurrio un error al registrarse");
        console.log(error);
      } finally {
        setTimeout(() => {
          setCorrect("");
          setError("");
        }, 4000);
      }
    },
  });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <p className="register-form__text">
        "Organiza tu día a día: Regístrate y mantén un seguimiento de tus
        tareas"
      </p>

      <Form.Input
        type="text"
        name="firstname"
        placeholder="Nombre "
        onChange={formik.handleChange}
        value={formik.values.firstname}
        error={formik.errors.firstname}
      />
      <Form.Input
        type="email"
        name="email"
        placeholder="Correo electronico "
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        type="password"
        name="password"
        placeholder="Contraseña "
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Input
        type="password"
        name="repeatPassword"
        placeholder="Repetir contraseña "
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />
      <Form.Checkbox
        name="conditionAccepted"
        label="Acepto los terminos y condiciones "
        onChange={(_, data) =>
          formik.setFieldValue("conditionAccepted", data.checked)
        }
        checked={formik.values.conditionAccepted}
        error={formik.errors.conditionAccepted}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Registrarse
      </Form.Button>

      {error !== "" && <p className="register-form__error">{error}</p>}
      {correct !== "" && <p className="register-form__success">{correct}</p>}
    </Form>
  );
};
