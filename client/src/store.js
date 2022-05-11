import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  userLoginReducer,
  userRegisterReducer,
  userVerifyReducer,
} from "./reducers/user";
// import { cartReducer } from "./reducers/cartReducer";
// import { searchReducer } from "./reducers/searchReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerify: userVerifyReducer,
  // cart: cartReducer,
});
const user_Info_FromStorage = localStorage.getItem("buyer_user")
  ? JSON.parse(localStorage.getItem("buyer_user"))
  : null;

const buyer_user_token = localStorage.getItem("buyer_user_token")
  ? JSON.parse(localStorage.getItem("buyer_user_token"))
  : null;

const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : null;

const initialState = {
  userLogin: { user: user_Info_FromStorage, token: buyer_user_token, cart },
  // cart:{cart},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
