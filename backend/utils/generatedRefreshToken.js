import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generatedRefreshToken = async (userId) => {
  if (!process.env.SECRET_KEY_REFRESH_TOKEN) {
    throw new Error(
      "Missing SECRET_KEY_REFRESH_TOKEN in environment variables !"
    );
  }

  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY_REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  const updateRefreshTokenUser = await UserModel.updateOne(
    { _id: userId },
    {
      refresh_token: token,
    }
  );

  return token;
};

export default generatedRefreshToken;
