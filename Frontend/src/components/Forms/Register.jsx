import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingLabelInput from "../Sections/FLoatingInput";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../Store/Slices/userSlice";
const Register = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Full name must be at least 3 characters")
        .required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        dispatch(registerUser(values));

        alert("Registration Successful!");
      } catch (error) {
        alert("Registration failed: " + error.message);
      }
    },
  });

  return (
    <div className=" flex justify-center items-center min-h-[75vh] bg-[#f5f0f0]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-6">
          Register with a new account
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <FloatingLabelInput
              type="text"
              name="fullName"
              label="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName &&
              formik.values.fullName.length > 0 &&
              formik.errors.fullName && (
                <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
              )}
          </div>

          <div>
            <FloatingLabelInput
              type="email"
              name="email"
              label="Email"
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
              label="Password"
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
            className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            REGISTER
          </button>
        </form>

        <p className="text-center text-sm mt-1">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>

        <div className="mt-1 text-center">
          <p className="text-sm">Or continue with social account</p>
          <button className="flex items-center justify-center w-full p-2 mt-1 border rounded-md bg-gray-100 hover:bg-gray-200 transition">
            <FaGoogle className="mr-2" /> SIGN UP WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
