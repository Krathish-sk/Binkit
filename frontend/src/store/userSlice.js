import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      state = { ...actions.payload };
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
