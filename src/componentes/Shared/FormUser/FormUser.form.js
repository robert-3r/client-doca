import * as Yup from "yup";

export const initialValues = (user) => {
  return {
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    fileAvatar: null,
    avatar: user?.avatar || "",
    password: "",
  };
};

export const validationSchema = () => {
  return Yup.object({
    firstname: Yup.string().required(true),
    lastname: Yup.string(),
    email: Yup.string().email().required(true),
    password: Yup.string().min(8, true).max(20, true),
  });
};
