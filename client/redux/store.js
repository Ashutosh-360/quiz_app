import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducers';
import userReducer from './Reducers/userSlice'

// const rootReducer = combineReducers({
//   user: userReducer, // Key for user reducer
// });
export const store = configureStore({
  reducer: {
    user: userReducer, // Key for user reducer
  },
});

export default store;
