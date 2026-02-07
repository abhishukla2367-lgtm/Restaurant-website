import React from "react";
import star from "../assets/icons/star.svg";

const StarRating = ({ rating = 5 }) => (
  <div className="flex gap-1">
    {[...Array(rating)].map((_, i) => (
      <img key={i} src={star} alt="star" className="h-5 w-5" />
    ))}
  </div>
);

export default StarRating;
