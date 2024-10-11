import React, { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RequestForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.requestPasswordReset.url, {
      method: SummaryApi.requestPasswordReset.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success("Please check your email...");
    }
    if (dataApi.status === "error") {
      toast.error("Account does not exist");
    }
  };

  return (
    <div className="antialiased">
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-3xl font-medium text-red-600">Forgot password</h1>
        <p className="text-slate-500">Fill up the form to reset your password</p>

        <form className="my-10" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address:</p>
              <input
                type="email"
                placeholder="Enter email address"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-red-500 hover:shadow"
              />
            </label>

            <button className="w-full py-3 font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg border-red-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>

              <span>Reset password</span>
            </button>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/sign-up">
                <span className="text-red-600 font-medium inline-flex space-x-1 items-center">
                  <span>Sign Up</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForgotPassword;
