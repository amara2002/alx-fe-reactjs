import React from "react";

const UserProfile = () => {
  return (
    <div className="mx-auto p-4 sm:p-4 md:p-8 max-w-xs sm:max-w-xs md:max-w-sm bg-white shadow-lg rounded-lg text-center">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="mx-auto rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 object-cover"
      />
      <h2 className="mt-4 text-lg md:text-xl font-semibold text-gray-800">
        John Doe
      </h2>
      <p className="mt-2 text-sm md:text-base text-gray-600">
        Front-End Developer passionate about creating responsive, user-friendly web
        applications using modern JavaScript frameworks and utility-first CSS.
      </p>
    </div>
  );
};

export default UserProfile;
