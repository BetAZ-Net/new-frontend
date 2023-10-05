import { combineReducers, configureStore } from "@reduxjs/toolkit";

import substrateReducer from "./slices/substrateSlice";

const rootReducer = combineReducers({
  substrate: substrateReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
