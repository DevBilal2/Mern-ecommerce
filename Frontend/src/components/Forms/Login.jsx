import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import FloatingLabelInput from "../Sections/FLoatingInput";
import { loginUser } from "../../Store/Slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Login Values:", values);
      dispatch(loginUser(values));
      alert("Login Successful!");
      navigate("/");
    },
  });

  return (
    <div className="flex justify-center items-center min-h-[75vh] bg-[#f5f0f0]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-6">
          Login to your account
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <FloatingLabelInput
              type="email"
              name="email"
              label="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email &&
              formik.values.email.length > 0 &&
              formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
          </div>

          <div>
            <FloatingLabelInput
              type="password"
              name="password"
              label="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password &&
              formik.values.password.length > 0 &&
              formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            LOGIN
          </button>
        </form>

        <p className="text-center text-sm mt-1">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Register
          </Link>
        </p>

        <div className="mt-1 text-center">
          <p className="text-sm">Or continue with social account</p>
          <button className="flex items-center justify-center w-full p-2 mt-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition">
            <FaGoogle className="mr-2" /> SIGN IN WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
