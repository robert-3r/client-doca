import { Form, Image } from "semantic-ui-react";
import "./FormUser.scss";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./FormUser.form";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { image } from "../../../assets";
import { ENV } from "../../../utils";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";

const userController = new User();

export const FormUser = ({ userMe, onReload, close }) => {
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(userMe),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userController.updateUser(accessToken, userMe._id, formValue);
        onReload();
        close();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("avatar", URL.createObjectURL(file));
    formik.setFieldValue("fileAvatar", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    onDrop,
  });

  const getAvatar = () => {
    if (formik.values.fileAvatar) {
      return formik.values.avatar;
    } else if (formik.values.avatar) {
      return `${ENV.BASE_PATH}/${formik.values.avatar}`;
    }
    return image.avatarDefault;
  };

  return (
    <div className="container-user">
      <h3>
        Edita tu perfil : <span>{userMe.firstname}</span>{" "}
      </h3>

      <Form className="container-user__form" onSubmit={formik.handleSubmit}>
        <div className="container-user__form-avatar" {...getRootProps()}>
          <input {...getInputProps()} />
          <Image avatar size="small" src={getAvatar()} />
        </div>

        <Form.Group widths="equal">
          <Form.Input
            type="text"
            name="firstname"
            placeholder="Nombre"
            onChange={formik.handleChange}
            value={formik.values.firstname}
            error={formik.errors.firstname}
          />
          <Form.Input
            type="text"
            name="lastname"
            placeholder="Apellido"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            type="email"
            name="email"
            placeholder="Correo electronico"
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
        </Form.Group>
        <Form.Button type="submit" primary fluid  loading={formik.isSubmitting}>
          Actualizar perfil
        </Form.Button>
      </Form>
    </div>
  );
};
