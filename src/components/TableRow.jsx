/* eslint-disable react/prop-types */
import React from "react";
import Moment from "react-moment";
import { PencilAltIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { deleteTour } from "../redux/features/tourSlice";
import { toast } from "react-toastify";
import { setOpen } from "../redux/features/modalSlice";

const TableRow = ({ tours }) => {
  const { imageFile, title, createdAt, _id } = tours;
  const { open } = useSelector((state) => ({ ...state.modal }));
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTour({ id, toast }));
  };

  const openModal = (id) => {
    dispatch(setOpen(id));
  };

  return (
    <div className="bg-white shadow-md  p-5 rounded my-5">
      <div className="flex items-center">
        <img src={imageFile} alt="" className="w-36 h-36 rounded" />
        <div className="flex justify-between w-full ">
          <div>
            <h1 className="ml-6">Title: {title}</h1>
            <div className="ml-6 mt-6">
              <button onClick={() => openModal(_id)}>
                <PencilAltIcon className="h-5" />
              </button>
              <button
                onClick={() => {
                  handleDelete(_id);
                }}
              >
                <TrashIcon className="h-5 text-red-500 ml-3" />
              </button>
            </div>
          </div>
          <p className="font-semibold ml-10 text-sm text-gray-500 flex-end">
            {" "}
            <Moment fromNow>{createdAt}</Moment>
          </p>
        </div>
        <br />
      </div>
    </div>
  );
};

export default TableRow;
