import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import axiosToastError from "../utils/axiosToastError";
import Axios from "../utils/axios";
import SummaryApi from "../common/summaryAPI";

export default function Register() {
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [data, setData] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const registerContent = (
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
  const passwordMatches = data.confirmPassword === data.password;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dataPresent) {
      toast.error("All fields are required !");
      return;
    }
    if (!passwordMatches) {
      toast.error("Password does not match !");
      return;
    }

    try {
      const resp = await Axios({
        ...SummaryApi.register,
        data,
      });

      if (resp?.status != 200) {
        toast.error(resp.data.message);
      }
      if (resp?.status === 200) {
        toast.success(resp.data.message);
        setData(initialData);
        navigate("/login");
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
          {registerContent("name", "Name:", "text", true)}
          {registerContent("email", "Email:", "email")}
          {registerContent("password", "Password:", "password")}
          {registerContent("confirmPassword", "Confirm Password:", "password")}
          <button
            className={`${
              dataPresent && passwordMatches
                ? "bg-green-800 hover:bg-green-700"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer `}
          >
            Register
          </button>
        </form>
        <p>
          Already have an account ?
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:text-green-900"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
