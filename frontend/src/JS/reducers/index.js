import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import restaurantReducer from "./restaurantReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  restaurantReducer,
  productReducer,
  orderReducer,
  cartReducer,
});

export default rootReducer;
