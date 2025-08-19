import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Form Handling in React</h1>

      {/* Controlled Component Form */}
      <RegistrationForm />

      {/* Divider */}
      <hr className="my-6" />

      {/* Formik + Yup Form */}
      <FormikForm />
    </div>
  );
}
