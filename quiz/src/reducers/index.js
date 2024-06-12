import { combineReducers } from "redux";
import authenReducer from "./authen";

const allReducers = combineReducers({
  authenReducer,
  // Viết thêm các reducer ở đây
});

export default allReducers;