import React from "react";

const AddressCard = ({ icon, title, children }) => (
  <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-xl shadow">
    <div className="text-2xl">{icon}</div>
    <div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-gray-700">{children}</p>
    </div>
  </div>
);

export default AddressCard;
