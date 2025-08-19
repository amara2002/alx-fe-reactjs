import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

export default function FormikForm() {
  return (
    <div className="p-4 border rounded w-80 mx-auto mt-5">
      <h2 className="text-xl mb-2">Formik Form</h2>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Formik Submitted:", values);
          alert("User registered successfully (mock API with Formik)");
          resetForm();
        }}
      >
        <Form>
          <Field name="username" placeholder="Username" className="block border p-2 w-full mb-2" />
          <ErrorMessage name="username" component="p" className="text-red-500" />

          <Field name="email" type="email" placeholder="Email" className="block border p-2 w-full mb-2" />
          <ErrorMessage name="email" component="p" className="text-red-500" />

          <Field name="password" type="password" placeholder="Password" className="block border p-2 w-full mb-2" />
          <ErrorMessage name="password" component="p" className="text-red-500" />

          <button type="submit" className="bg-green-500 text-white px-4 py-2">Register</button>
        </Form>
      </Formik>
    </div>
  );
}
