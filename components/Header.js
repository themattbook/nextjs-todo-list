import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";

export default function Header() {
  const [isOpen, setIsOpen] = useState();
  const toggle = () => setIsOpen(!isOpen);
  const { currentUser } = useAuth();
  return (
    <div className="sticky top-0 w-full left-0 p-4 flex items-center justify-between text-white bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700">
      <h4 className="font-medium leading-tight text-xl sm:text-3xl select-none mt-2 mb-2">
        <i className="fa-solid fa-circle-check mr-1"></i> Nextjs Todo List
      </h4>
      <div className="relative inline-block">
        {currentUser ? (
          <button
            className="relative z-10 flex items-center p-2"
            onClick={toggle}
          >
            {!isOpen ? (
              <i className="fa-solid fa-user text-xl sm:text-3xl duration-300 hover:opacity-40 cursor-pointer"></i>
            ) : (
              <i className="fa-solid fa-xmark text-xl sm:text-3xl opacity-40 cursor-pointer"></i>
            )}
          </button>
        ) : null}
        {isOpen && currentUser ? <Modal /> : ""}
      </div>
    </div>
  );
}
