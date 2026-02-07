import React from "react";
import StarRating from "./StarRating";

const ReviewCard = ({ name, text, rating }) => (
  <div className="bg-white p-6 rounded-xl shadow space-y-2">
    <StarRating rating={rating} />
    <p className="text-gray-700">{text}</p>
    <h4 className="font-semibold">{name}</h4>
  </div>
);

export default ReviewCard;
