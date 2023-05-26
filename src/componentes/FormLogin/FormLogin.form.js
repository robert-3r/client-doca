import * as Yup from "yup";

export const initialValues = () => {
  return {
    email: "",
    password: "",
  };
};

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email(" El Email es invalido")
      .required("El campo es obligatorio"),
    password: Yup.string().required("El campo es obligatorio"),
  });
}
