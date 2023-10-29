"use client";

import React, { useState } from "react";
import signUp from "../../../firebase/auth/signup";
import { usePathname } from "next/navigation";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pathname = usePathname();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return (window.location.href = "/dashboard");
  };
  return (
    <div className="wrapper flex items-center justify-center h-screen bg-white">
      <div className="form-wrapper w-full max-w-xs">
        <h1 className="text-center text-2xl font-bold">Create an account</h1>
        <h2 className="mb-6 text-center">
          Enter your email and password to sign up
        </h2>
        <form onSubmit={handleForm} className="form">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
