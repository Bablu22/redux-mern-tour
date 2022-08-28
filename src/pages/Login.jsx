import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formvalue, setFormvalue] = useState(initialState);
  const { email, password } = formvalue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { looding, error } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    const clientId =
      "409967701767-vapgoljqc4oo38c7mni7p81pe6sskfg3.apps.googleusercontent.com";
    function start() {
      gapi.client.init({ clientId: clientId, scope: "" });
    }
    gapi.load("client:auth2", start);
  });

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({ formvalue, navigate, toast }));
    }
  };

  const googleSuccess = (response) => {
    const name = response?.profileObj?.name;
    const email = response?.profileObj?.email;
    const token = response?.tokenId;
    const googleId = response?.googleId;
    const data = { name, email, token, googleId };
    dispatch(googleSignIn({ data, navigate, toast }));
  };
  const googleFailure = (error) => {
    toast.error(error);
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
              <h1 className="text-xl font-semibold">Welcome back</h1>
              <small className="text-gray-400">
                Welcome back! Please enter your details
              </small>

              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block mb-2 text-xs font-semibold">
                    Email
                  </label>
                  <input
                    value={email}
                    type="email"
                    onChange={(e) => handleOnChange(e)}
                    required
                    name="email"
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
                    type="password"
                    name="password"
                    onChange={(e) => handleOnChange(e)}
                    placeholder="*****"
                    required
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                </div>

                <div className="flex flex-wrap content-center mb-3">
                  <input
                    id="remember"
                    type="checkbox"
                    className="mr-1 checked:bg-purple-700"
                  />{" "}
                  <label className="mr-auto text-xs font-semibold">
                    Remember for 30 days
                  </label>
                  <a
                    href="#/"
                    className="text-xs font-semibold text-purple-700"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md"
                  >
                    Sign in
                  </button>
                  <GoogleLogin
                    clientId="409967701767-vapgoljqc4oo38c7mni7p81pe6sskfg3.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md"
                      >
                        <img
                          className="w-5 mr-2"
                          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                          alt="google"
                        />
                        Sign in with Google
                      </button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                  />
                </div>
              </form>

              <div className="text-center">
                <span className="mr-1 text-xs font-semibold text-gray-400">
                  Dont have account?
                </span>
                <Link
                  to="/register"
                  className="text-xs font-semibold text-purple-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
