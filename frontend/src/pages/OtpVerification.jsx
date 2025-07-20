import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import axiosToastError from "../utils/axiosToastError";
import Axios from "../utils/axios";
import SummaryApi from "../common/summaryAPI";

export default function OtpVerification() {
  const initialData = ["", "", "", "", "", ""];
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const [data, setData] = useState(initialData);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newData = [...data];
    newData[index] = value;
    setData(newData);

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const loginContent = () => {
    return (
      <div className="grid gap-1">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          disabled
          value={email}
          className="bg-blue-50 p-2 border-0 rounded outline-none"
        />
        <label htmlFor="otp" className="mt-3">
          Enter your OTP:
        </label>
        <div className="flex items-center gap-2 justify-between mt-2">
          {data.map((item, index) => {
            return (
              <input
                key={"otp" + index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                id="otp"
                ref={(ref) => {
                  inputRef.current[index] = ref;
                  return ref;
                }}
                value={data[index]}
                onChange={(e) => handleChange(e, index)}
                maxLength={1}
                className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-amber-400 text-center font-semibold"
              />
            );
          })}
        </div>
      </div>
    );
  };

  const dataPresent = data.every((e) => e);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataPresent) {
      toast.error("Please enter the OTP !");
      return;
    }

    try {
      const resp = await Axios({
        ...SummaryApi.otpVerification,
        data: {
          otp: data.join(""),
          email: email,
        },
      });

      if (resp?.status != 200) {
        toast.error(resp.data.message);
      }
      if (resp?.status === 200) {
        toast.success(resp.data.message);
        setData(initialData);
        navigate("/reset-password", {
          state: {
            data: resp.data,
            email: email,
          },
        });
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  useEffect(() => {
    if (!email) navigate("/forgot-password");
  }, []);

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter OTP</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {loginContent()}
          <button
            className={`${
              dataPresent ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer `}
          >
            Verify OTP
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
