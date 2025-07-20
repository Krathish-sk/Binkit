import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/axios";
import SummaryApi from "../common/summaryAPI";
import axiosToastError from "../utils/axiosToastError";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [data, setData] = useState(initialData);

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  useEffect(() => {
    if (location?.state?.data?.message !== "OTP verification succussfull") {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetContent = (contentName, displayName, contentType) => {
    return (
      <div className="grid gap-1">
        <label htmlFor={contentName}>{displayName}</label>
        <input
          type={contentType}
          className="bg-blue-50 p-2 border rounded outline-none focus:border-amber-400"
          name={contentName}
          id={contentName}
          value={data[contentName]}
          onChange={handleChange}
          placeholder={`Enter your ${displayName.toLowerCase()}`}
        />
        {/* Password strength indicator */}
        {contentName === "password" && data.password && (
          <div className="mt-2">
            <div className="h-1.5 bg-gray-200 rounded">
              <div
                className={`h-full rounded transition-all ${
                  getPasswordStrength(data.password) === 5
                    ? "bg-green-500"
                    : getPasswordStrength(data.password) >= 3
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${(getPasswordStrength(data.password) / 5) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Password strength:{" "}
              {getPasswordStrength(data.password) === 5
                ? "Strong"
                : getPasswordStrength(data.password) >= 3
                ? "Medium"
                : "Weak"}
            </p>
          </div>
        )}
        {/* Password match indicator */}
        {contentName === "confirmPassword" &&
          data.password &&
          data.confirmPassword && (
            <p
              className={`text-sm mt-1 ${
                passwordMatches ? "text-green-600" : "text-red-600"
              }`}
            >
              {passwordMatches
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </p>
          )}
      </div>
    );
  };

  const dataPresent = Object.values(data).every((e) => e);
  const passwordMatches = data.password === data.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataPresent) {
      toast.error("All fields are required!");
      return;
    }
    if (!passwordMatches) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const resp = await Axios({
        ...SummaryApi.resetPassword,
        data: {
          email: data.email,
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        },
      });

      if (resp?.status !== 200) {
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
        <p className="font-semibold text-lg">Reset Password</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {resetContent("password", "New Password", "password")}
          {resetContent("confirmPassword", "Confirm Password", "password")}
          <button
            className={`${
              dataPresent && passwordMatches
                ? "bg-green-800 hover:bg-green-700"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
          >
            Reset Password
          </button>
        </form>
        <p>
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:text-green-900"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
