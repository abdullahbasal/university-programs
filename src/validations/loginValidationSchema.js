import * as yup from "yup";
const loginValidationSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default loginValidationSchema;
