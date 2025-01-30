import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
  authenticationToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDetailsHandler: (state, action) => {
      state.userDetails = action.payload;
    },
    authenticationTokenHandler: (state, action) => {
      state.authenticationToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userDetailsHandler, authenticationTokenHandler } = userSlice.actions;

export default userSlice.reducer;
