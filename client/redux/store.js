import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducers';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from './Reducers/userSlice'
import storage from 'redux-persist/lib/storage';
// const rootReducer = combineReducers({
//   user: userReducer, // Key for user reducer
// });
const persistConfig = {
  key: 'root',
  storage,
};


const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
export {store,persistor};
