/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ tour }) => {
  const { title, description, name, imageFile, _id } = tour;
  return (
    <>
      <Link to={`/tour/${_id}`}>
        <div className="w-full bg-white border border-gray-300 rounded-lg text-center hover:shadow-lg align-center h-80">
          <img src={imageFile} className="rounded-t-lg" />

          <p className="font-bold pt-3 pb-2"> {title} </p>

          <p className="font-semibold p-2 text-sm text-gray-500">
            {" "}
            by{" "}
            <a href="#" className="text-blue-500 hover:text-blue-700">
              {" "}
              {name}
            </a>{" "}
          </p>

          <p className="px-10 py-2 mb-5 text-gray-500 truncate">
            {" "}
            {description}{" "}
          </p>
        </div>
      </Link>
    </>
  );
};

export default PostCard;
