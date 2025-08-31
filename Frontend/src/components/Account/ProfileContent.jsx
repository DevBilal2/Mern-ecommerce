import React from "react";
import FloatingLabelInput from "../Sections/FLoatingInput";
const ProfileContent = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
        <p className=" text-blue-500">Change Password</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <FloatingLabelInput
            type="text"
            name="fullname"
            label="Full Name"
            className=""
          />

          <FloatingLabelInput type="email" name="email" label="Email" />
        </div>

        <div>
          <div className="flex">
            <FloatingLabelInput
              label="Phone"
              name="number"
              type="number"
              className="w-40 border rounded-r p-2"
            />
          </div>
        </div>
      </div>
      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Update Profile
      </button>
    </div>
  );
};

export default ProfileContent;
