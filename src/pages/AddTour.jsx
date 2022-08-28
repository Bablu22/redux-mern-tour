import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTour } from "../redux/features/tourSlice";

const initialState = {
  title: "",
  description: "",
};

const AddTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [image, setImage] = useState("");
  const { title, description } = tourData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { looding, error } = useSelector((state) => ({ ...state.tour }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  // Handle input feild data
  const handeOnchange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleClear = () => {
    setTourData({ title: "", description: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title && description && image) {
      const data = { ...tourData, name: user?.user?.name };
      dispatch(createTour({ data, navigate, toast, image }));
    }
    handleClear();
  };

  useEffect(() => {
    error && toast.error(error);
  }, []);

  return (
    <>
      {looding ? (
        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen mt-10 mb-10 ">
          <div className="grid w-11/12 bg-white rounded-lg shadow-xl md:w-9/12 lg:w-1/2">
            <div className="flex justify-center py-4">
              <div className="flex p-2 bg-indigo-200 border-2 border-indigo-300 rounded-full md:p-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex">
                <h1 className="text-xl font-bold text-gray-600 md:text-2xl">
                  Upload your post
                </h1>
              </div>
            </div>

            <form action="" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">
                  Enter Title
                </label>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => handeOnchange(e)}
                  className="px-3 py-2 mt-1 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  placeholder="Enter title"
                  required
                />
              </div>
              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">
                  Enter Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => handeOnchange(e)}
                  className="px-3 py-2 mt-1 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  placeholder="Enter Description"
                  required
                />
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="mb-1 text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">
                  Upload Photo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-purple-300 group">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 lowercase group-hover:text-purple-600">
                        Select a photo
                      </p>
                    </div>
                    <div className="">
                      <input
                        type="file"
                        placeholder="Image"
                        id="title"
                        name="image"
                        required
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-center w-full gap-4 px-10 pt-5 pb-5 md:gap-8">
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-medium text-white bg-indigo-500 rounded-lg shadow-xl hover:bg-purple-700"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTour;
