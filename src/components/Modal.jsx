import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setClose } from "../redux/features/modalSlice";
import { XCircleIcon } from "@heroicons/react/solid";
import { UpdateTour } from "../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
};

const Modal = () => {
  const { open, id } = useSelector((state) => ({ ...state.modal }));
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setClose());
  };
  const [tourData, setTourData] = useState(initialState);
  const { title, description } = tourData;
  const handeOnchange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateTour({ tourData, id, navigate, toast }));
    closeModal();
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Update your tour
                    </Dialog.Title>
                    <div>
                      <XCircleIcon
                        onClick={closeModal}
                        className="h-7 text-red-500 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
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
                      <div className="w-1/2 mx-auto">
                        <button
                          type="submit"
                          className="rounded-md border border-transparent bg-blue-100  py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-auto px-3 w-full mt-4"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
