import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const { login, signup, currentUser } = useAuth();

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter Email and Password.");
      return;
    }

    if (isLoggingIn) {
      try {
        return await login(email, password);
      } catch (err) {
        setError("Incorrect email or password");
      }
    }
    await signup(email, password);
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-xs sm:text-sm">
      <h1 className="font-light text-xl sm:text-3xl m-2 text-white select-none tracking-tight">
        {isLoggingIn ? "Login to your account" : "Create an account"}
      </h1>
      {error && (
        <div className="text-base sm:text-xl tracking-tight w-full max-w-[40ch] border border-solid border-rose-400 text-rose-400 text-center p-4">
          {error}
        </div>
      )}
      <input
        type="text"
        className="text-base p-2 sm:text-xl outline-none sm:p-4 border border-2 border-gray-300 focus:border-fuchsia-400 duration-300 w-full max-w-[40ch] rounded-md shadow-sm m-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="text-base p-2 sm:text-xl outline-none sm:p-4 border border-2 border-gray-300 focus:border-fuchsia-400 duration-300 w-full max-w-[40ch] rounded-md shadow-sm m-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={submitHandler}
        className="text-base text-white p-2 sm:text-xl outline-none sm:p-4 bg-gradient-to-r from-pink-500 to-yellow-500 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full after:hover:translate-x-full after:duration-300 hover:text-fuchsia-600 w-full max-w-[40ch] rounded-md shadow-sm m-2 overflow-hidden"
      >
        <h2 className="relative z-20">Submit</h2>
      </button>

      <h2
        className="font-bold text-base sm:text-md duration-300 hover:scale-110 cursor-pointer text-white mt-4"
        onClick={() => setIsLoggingIn(!isLoggingIn)}
      >
        {!isLoggingIn
          ? "Already have an account?"
          : "Don't have an account? Create one here."}
      </h2>
    </div>
  );
}
