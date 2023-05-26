import * as Yup from "yup";

export function initialValues() {
  return {
    firstname: "",
    email: "",
    password: "",
    repeatPassword: "",
    conditionAccepted: false,
  };
}

export function validationSchema() {
  return Yup.object({
    firstname: Yup.string().required("El campo es obligatorio"),
    email: Yup.string()
      .email(" El Email es invalido")
      .required("El campo es obligatorio"),
    password: Yup.string()
      .required("El campo es obligatorio")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(20, "La contraseña debe tener como máximo 20 caracteres"),

    repeatPassword: Yup.string()
      .required("El campo es obligatorio")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    conditionAccepted: Yup.bool().isTrue(true),
  });
}
