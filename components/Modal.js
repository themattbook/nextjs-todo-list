import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Modal() {
  const { logout, currentUser } = useAuth();
  return (
    <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
      <span className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 select-none">
        <div className="mx-1">
          <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {currentUser.email}
          </h1>
        </div>
      </span>

      <hr className="border-gray-200 dark:border-gray-700 " />

      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:text-white hover:bg-violet-300 select-none"
        onClick={logout}
      >
        Sign Out
      </a>
    </div>
  );
}
