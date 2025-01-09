import * as yup from "yup";

export const inquirySchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  message: yup.string().required("Message cannot be empty"),
});
