import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  mobile: "",
  verify_email: "",
  last_login_date: "",
  status: "",
  address_details: [],
  shopping_cart: [],
  orderHistory: [],
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user details
    setUserDetails: (state, actions) => {
      state.name = actions.payload?.name;
      state._id = actions.payload?._id;
      state.email = actions.payload?.email;
      state.avatar = actions.payload?.avatar;
      state.mobile = actions.payload?.mobile;
      state.verify_email = actions.payload?.verify_email;
      state.last_login_date = actions.payload?.last_login_date;
      state.status = actions.payload?.status;
      state.address_details = actions.payload?.address_details;
      state.shopping_cart = actions.payload?.shopping_cart;
      state.orderHistory = actions.payload?.orderHistory;
      state.role = actions.payload?.role;
    },
    logoutUser: () => initialState, // Reset to initial state.
  },
});

export const { setUserDetails, logoutUser } = userSlice.actions;

export default userSlice.reducer;
