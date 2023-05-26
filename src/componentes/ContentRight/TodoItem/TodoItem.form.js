import * as Yup from "yup";

export const initialValues = (todo) => {
  return {
    name: todo.name,
  };
};

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
  });
}
