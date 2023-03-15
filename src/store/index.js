import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import safeReducer from "./safeSlice";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  safe: safeReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["safe"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
