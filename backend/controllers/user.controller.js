import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";
import sendEmail from "../config/sendEmail.js";
import verificationEmailTemplate from "../utils/verfiyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtpWithExpiry from "../utils/generateOtpWithExpiry.js";
import forgotPasswordEmailTemplate from "../utils/forgotPasswordEmailTemplate.js";

// User Register Controller
export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide Name, Email & Password",
      });
    }

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res.status(302).json({
        message: "User email already registered !",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const verfiyEmailUrl = `${process.env.FRONTEND_URL}/verfiy-email?code=${save?._id}`;
    const verfiyEmail = await sendEmail({
      sendTo: `${email}`,
      subject: "Verification Email from BinkIt",
      html: verificationEmailTemplate({ name, url: verfiyEmailUrl }),
    });

    return res.status(200).json({
      message: "User registered successfuly",
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
}

// Verfiy Email Controller
export async function verfiyEmailController(req, res) {
  try {
    const { code } = req.body;

    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(404).json({
        message: "User not verfied !",
      });
    }

    const updatedUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return res.status(200).json({
      message: "User verfied successfuly",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
}

// login User Controller
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email & password are mandatory !",
      });
    }

    const userExists = await UserModel.findOne({ email });

    // Check for User in database
    if (!userExists) {
      return res.status(404).json({
        message: "User not registered! Please create an account to login",
      });
    }

    // Password verfification
    const checkPassword = await bcryptjs.compare(password, userExists.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid password!",
      });
    }

    // Check for User status(Active, Inactive, Suspended)
    if (checkPassword && userExists.status !== "Active") {
      return res.status(403).json({
        message: "User Inactive/Suspended! Please contact support Team",
      });
    }

    const accessToken = await generatedAccessToken(userExists._id);
    const refreshToken = await generatedRefreshToken(userExists._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    res.status(200).json({
      message: "Login Successful",
      data: {
        accessToken,
        refreshToken,
        userExists,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
}

// get User details Controller
export async function userDetailsController(req, res) {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    return res.status(200).json({
      message: "User details found",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong !!",
    });
  }
}

// logout User Controller
export async function logoutController(req, res) {
  try {
    const userId = req.userId;

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.status(200).json({
      message: "Logout Successfull",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
    });
  }
}

// Upload User Avatar Controller
export async function uploadAvatarController(req, res) {
  try {
    const userId = req.userId; // From auth middleware
    const image = req.file; // From multer middleware
    const upload = await uploadImageCloudinary(image);
    const updateUser = await UserModel.findById(userId, {
      avatar: upload.url,
    });

    return res.json({
      message: "Upload successfull",
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
}

// Update User Details Controller
export async function updateUserDetailsController(req, res) {
  try {
    const userId = req.userId; // auth middleware
    const { name, email, mobile, password } = req.body;

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (mobile) updatedFields.mobile = mobile;

    if (password) {
      let hashPassword = "";
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
      updatedFields.password = hashPassword;
    }
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    );
    return res.status(200).json({
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
}

// Forgot Password Controller
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    const userFound = await UserModel.findOne({ email });
    if (!userFound) {
      return res.status(404).json({
        message: "No user found with this Email",
      });
    }

    const { otp, expiresAt } = generateOtpWithExpiry();

    const updatedUser = await UserModel.findByIdAndUpdate(userFound._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expiresAt.toISOString()),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot Password from BinkIt",
      html: forgotPasswordEmailTemplate({ name: updatedUser.name, otp }),
    });

    return res.status(200).json({
      message: "Check your email",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
}

// Verify Forgot Password Controller
export async function verifyForgotPasswordController(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(404).json({
        message: "OTP/Email ID is missing!",
      });
    }

    const userFound = await UserModel.findOne({ email });

    if (!userFound) {
      return res.status(404).json({
        message: "No user found with this Email",
      });
    }

    const currentTime = new Date();

    if (userFound.forgot_password_expiry < currentTime) {
      return res.status(401).json({
        message: "OTP already expired !!",
      });
    }

    if (otp !== userFound.forgot_password_otp) {
      return res.status(422).json({
        message: "Invalid OTP !!",
      });
    }

    // OTP is valid
    return res.status(200).json({
      message: "OTP verification succussfull",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
    });
  }
}

// Reset Password Controller
export async function resetPasswordController(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Please provide required details",
      });
    }

    const userFound = await UserModel.findOne({ email });
    if (!userFound) {
      return res.status(404).json({
        message: "No user found with this Email",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Password does not match !",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(confirmPassword, salt);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userFound._id,
      {
        password: hashPassword,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Password Updated succussfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
    });
  }
}

// Refresh Token Controller
export async function refreshTokenController(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({
        message: "No Access Token found!",
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "Token Expired !",
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);

    return res.status(200).json({
      message: "New accessToken has been generated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
}
