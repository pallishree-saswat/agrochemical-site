import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/user";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_VERIFY":
      return { loading: true };
    case "USER_VERIFY_SUCCESS":
      return { loading: false, data: action.payload };
    case "USER_VERIFY_FAIL":
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const resendOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case "RESEND_OTP_REQUEST":
      return { loading: true };
    case "RESEND_OTP_SUCCESS":
      return { loading: false, data: action.payload };
    case "RESEND_OTP_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
