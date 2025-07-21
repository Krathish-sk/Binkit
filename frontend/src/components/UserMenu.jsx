import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Divider from "./Divider";

export default function UserMenu() {
  const user = useSelector((state) => state.user);
  return (
    <div className="">
      <div className="font-semibold">My Account</div>
      <div className="text-sm">{user?.name}</div>
      <div className="text-sm">{user?.email}</div>
      <Divider />
      <div className="text-sm grid gap-2">
        <Link to="" className="hover:bg-gray-300 rounded">
          My Orders
        </Link>
        <Link to="" className="hover:bg-gray-300 rounded">
          Save address
        </Link>
        <button className="text-left hover:cursor-pointer hover:bg-gray-300 rounded ">
          Log Out
        </button>
      </div>
    </div>
  );
}
