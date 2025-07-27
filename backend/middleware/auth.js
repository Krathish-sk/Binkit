import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No Access Token found!",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return res.status(401).json({
        message: "UnAuthorized access",
      });
    }

    req.userId = decode.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message || error,
    });
  }
};

export default auth;
