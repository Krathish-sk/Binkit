import jwt from "jsonwebtoken";

const generatedAccessToken = (userId) => {
  if (!process.env.SECRET_KEY_ACCESS_TOKEN) {
    throw new Error(
      "Missing SECRET_KEY_ACCESS_TOKEN in environment variables !"
    );
  }

  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "5h",
  });

  return token;
};

export default generatedAccessToken;
