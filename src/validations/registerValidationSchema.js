import * as yup from "yup";

const registerValidationSchema = yup
  .object({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
  })
  .required();

export default registerValidationSchema;
