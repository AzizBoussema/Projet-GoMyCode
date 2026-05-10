import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import restaurantReducer from "./restaurantReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import cartReducer from "./cartReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  restaurantReducer,
  productReducer,
  orderReducer,
  cartReducer,
  adminReducer,
});

export default rootReducer;
