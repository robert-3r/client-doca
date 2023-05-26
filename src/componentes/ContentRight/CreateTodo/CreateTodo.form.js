import * as Yup from "yup";

export const initialValues = () => {
  return {
    name: "",
  };
};

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
  });
}
