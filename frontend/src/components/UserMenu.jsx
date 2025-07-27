import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";

import Axios from "../utils/axios";
import AxiosToastError from "../utils/axiosToastError";
import Divider from "./Divider";
import { logoutUser } from "../store/userSlice";
import SummaryApi from "../common/summaryAPI";

export default function UserMenu({ close }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resp = await Axios({
        ...SummaryApi.logout,
      });
      if (resp.data.message === "Logout Successfull") {
        if (close) {
          close();
        }
        dispatch(logoutUser());
        localStorage.clear();
        toast.success(resp.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="">
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user?.name}
        </span>
        <Link to={"/dashboard/profile"} className="mr-2 hover:bg-orange-200">
          <HiOutlineExternalLink size={15} onClick={close} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid">
        <Link
          to="/dashboard/myorders"
          className="hover:bg-orange-300 rounded py-1"
        >
          My Orders
        </Link>
        <Link
          to="/dashboard/address"
          className="hover:bg-orange-300 rounded py-1"
        >
          Save address
        </Link>
        <button
          className="text-left hover:cursor-pointer hover:bg-orange-300 rounded py-1"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
