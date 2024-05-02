import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="flex justify-between mb-10 align-middle items-baseline border-b-2 pb-3">
        <div className="flex gap-8 items-baseline">
          <h1 className="font-bold text-4xl">TokoBuku</h1>
          <p className="navlink cursor-pointer hover:text-emerald-600" onClick={() => navigate("/book")}>
            Home
          </p>
        </div>
        <h4 className="">Admin</h4>
      </div>
    </div>
  );
};

export default NavBar;
