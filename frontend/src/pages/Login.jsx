import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import axiosToastError from "../utils/axiosToastError";
import Axios from "../utils/axios";
import SummaryApi from "../common/summaryAPI";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

export default function Login() {
  const initialData = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();

  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const loginContent = (
    contentName,
    displayName,
    contentType,
    autoFocusTrue
  ) => {
    return (
      <div className="grid gap-1">
        <label htmlFor={contentName}>{displayName}</label>
        <input
          type={contentType}
          autoFocus={autoFocusTrue}
          className="bg-blue-50 p-2 border rounded outline-none focus:border-amber-400"
          name={contentName}
          id={contentName}
          onChange={handleChange}
          value={data[contentName]}
          placeholder={
            contentName === "confirmPassword"
              ? "Confirm your password"
              : `Enter your ${displayName}`
          }
        />
      </div>
    );
  };

  const dataPresent = Object.values(data).every((e) => e);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataPresent) {
      toast.error("All fields are required !");
      return;
    }

    try {
      const resp = await Axios({
        ...SummaryApi.login,
        data,
      });

      if (resp?.status != 200) {
        toast.error(resp.data.message);
      }
      if (resp?.status === 200) {
        localStorage.setItem("accessToken", resp.data.data.accessToken);
        localStorage.setItem("refreshToken", resp.data.data.refreshToken);
        const userDetails = await fetchUserDetails();
        console.log("userdetails", userDetails);
        dispatch(setUserDetails(userDetails.data));
        toast.success(resp.data.message);
        setData(initialData);
        navigate("/");
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p>
          Welcome to <span className="font-bold">Binkit</span>
        </p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {loginContent("email", "Email:", "email", true)}
          {loginContent("password", "Password:", "password")}
          <Link
            to={"/forgot-password"}
            className="block ml-auto hover:text-amber-400"
          >
            Forgot password
          </Link>
          <button
            className={`${
              dataPresent ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer `}
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account ?
          <Link
            to="/register"
            className="font-semibold text-green-700 hover:text-green-900"
          >
            {" "}
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
