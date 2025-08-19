import React from "react";
import { useNavigate } from "react-router-dom";

function UsserData({ username, email, role }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 w-64 border border-gray-200">
        <h3 className="text-lg font-bold mb-2 text-orange-800">User Info</h3>
        <p>
          <strong>Name:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>

        <hr className="my-3" />
        {(role === "user" || !role || role === "undefined") && (
          <button
            onClick={() => navigate("/orders")}
            className="w-full text-center text-sm font-medium text-blue-600 hover:underline"
          >
            🛒 Your Orders
          </button>
        )}
      </div>
    </>
  );
}

export default UsserData;
