import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formvalue, setFormvalue] = useState(initialState);
  const { email, password, name } = formvalue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { looding, error } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password && name) {
      dispatch(register({ formvalue, navigate, toast }));
    }
  };
  return (
    <>
      {looding && (
        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap content-center justify-center w-full min-h-screen py-10 bg-gray-200">
        <div className="flex shadow-md">
          <div className="flex flex-wrap content-center justify-center bg-white rounded-l-md">
            <div className="p-5 py-10 w-96">
              <h1 className="text-xl font-semibold">Register your account</h1>
              <small className="text-gray-400">
                Welcome back! Please enter your details
              </small>

              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block mb-2 text-xs font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => handleOnChange(e)}
                    required
                    placeholder="Enter your name"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-2 text-xs font-semibold">
                    Email
                  </label>
                  <input
                    value={email}
                    required
                    type="email"
                    name="email"
                    onChange={(e) => handleOnChange(e)}
                    placeholder="Enter your email"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-2 text-xs font-semibold">
                    Password
                  </label>
                  <input
                    value={password}
                    required
                    type="password"
                    name="password"
                    onChange={(e) => handleOnChange(e)}
                    placeholder="*****"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="mb-1.5 block w-full text-center text-white bg-indigo-900 hover:bg-indigo-900 px-2 py-1.5 rounded-md"
                  >
                    Register
                  </button>
                </div>
              </form>

              <div className="text-center">
                <span className="mr-1 text-xs font-semibold text-gray-400">
                  Already have an account?
                </span>
                <Link
                  to="/login"
                  className="text-xs font-semibold text-purple-700"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
