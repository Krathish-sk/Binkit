import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide Name"],
    },
    email: {
      type: String,
      required: [true, "Provide Email"],
    },
    password: {
      type: String,
      required: [true, "Provide Password"],
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    last_login_date: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      default: "Active",
      enm: ["Active", "Inactive", "Suspended"],
    },
    addredd_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cartProducts",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "orders",
      },
    ],
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: "",
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
