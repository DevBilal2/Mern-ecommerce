import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addAddress, updateAddress } from "../../Store/Slices/address";

const AddressPopup = ({ isOpen, onClose, initialValues, editingAddress }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    addressLine1: Yup.string()
      .required("Address line is required")
      .min(10, "Address must be at least 10 characters"),
    city: Yup.string()
      .required("City is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for city"),
    state: Yup.string()
      .required("State is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for state"),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode must be 6 digits"),
    country: Yup.string().required("Country is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\+91\d{10}$/, "Phone must be +91 followed by 10 digits"),
    landmark: Yup.string(),
    addressType: Yup.string().required("Address type is required"),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      addressLine1: "",
      city: "",
      state: "",
      pincode: "",
      country: "India", // Default country
      phone: "+91",
      landmark: "",
      addressType: "home",
    },

    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError(null);
      try {
        const isEditMode = Boolean(editingAddress?._id);

        if (isEditMode) {
          // 🟢 Editing existing address

          console.log("Updating address ID:", editingAddress?._id);
          dispatch(
            updateAddress({ id: editingAddress._id, updatedData: values })
          );
          alert("Address updated successfully");
        } else {
          // 🟢 Adding new address
          dispatch(addAddress(values));

          alert("Address saved");
        }

        onClose();
      } catch (err) {
        console.error("Failed to save address:", err);
        setError(err.message || "Failed to save address. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-white opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Popup Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {initialValues ? "Edit Address" : "Add New Address"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              type="button"
            >
              &times;
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="addressLine1"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address Line 1*
              </label>
              <input
                id="addressLine1"
                name="addressLine1"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressLine1}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  formik.touched.addressLine1 && formik.errors.addressLine1
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="House No., Building, Street, Area"
              />
              {formik.touched.addressLine1 && formik.errors.addressLine1 && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.addressLine1}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City*
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    formik.touched.city && formik.errors.city
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Your city"
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.city}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  State*
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    formik.touched.state && formik.errors.state
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Your state"
                />
                {formik.touched.state && formik.errors.state && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.state}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pincode*
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pincode}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    formik.touched.pincode && formik.errors.pincode
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="6-digit pincode"
                />
                {formik.touched.pincode && formik.errors.pincode && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.pincode}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country*
                </label>
                <select
                  id="country"
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    formik.touched.country && formik.errors.country
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
                {formik.touched.country && formik.errors.country && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.country}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number*
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="+911234567890"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="landmark"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Landmark (optional)
              </label>
              <input
                id="landmark"
                name="landmark"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.landmark}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nearby landmark"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Type*
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="addressType"
                    value="home"
                    onChange={formik.handleChange}
                    checked={formik.values.addressType === "home"}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Home</span>
                </label>

                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="addressType"
                    value="office"
                    onChange={formik.handleChange}
                    checked={formik.values.addressType === "office"}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Office</span>
                </label>

                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="addressType"
                    value="other"
                    onChange={formik.handleChange}
                    checked={formik.values.addressType === "other"}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
              {formik.touched.addressType && formik.errors.addressType && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.addressType}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !formik.isValid}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {initialValues ? "Updating..." : "Saving..."}
                  </span>
                ) : initialValues ? (
                  "Update Address"
                ) : (
                  "Save Address"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressPopup;
