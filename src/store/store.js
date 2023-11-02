import { combineReducers, configureStore } from "@reduxjs/toolkit";

import substrateReducer from "./slices/substrateSlice";
import stakingReducer from "./slices/stakingSlide"

const rootReducer = combineReducers({
  substrate: substrateReducer,
  staking: stakingReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
