import toast from "react-hot-toast";

const axiosToastError = (error) => {
  toast.error(
    error?.response?.data?.message || error?.response?.data?.statusText
  );
};

export default axiosToastError;
