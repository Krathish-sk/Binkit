export const baseURL = "http://localhost:8080";

const apiUser = "/api/user/";

const SummaryApi = {
  register: {
    url: `${apiUser}register`,
    method: "post",
  },
  login: {
    url: `${apiUser}login`,
    method: "post",
  },
  forgotPassword: {
    url: `${apiUser}forgot-password`,
    method: "put",
  },
  otpVerification: {
    url: `${apiUser}verify-forgot-password-otp`,
    method: "put",
  },
  resetPassword: {
    url: `${apiUser}reset-password`,
    method: "put",
  },
  refreshToken: {
    url: `${apiUser}refresh-token`,
    method: "post",
  },
};

export default SummaryApi;
