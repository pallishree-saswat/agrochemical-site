import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/user";

import axios from "axios";
import { toast } from "react-toastify";

//user signup
export const register =
  (name, email, phoneNumber, password, cb) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const { data } = await axios.post(
        `http://localhost:8000/api/user/register`,
        {
          name,
          email,
          phoneNumber,
          password,
        }
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      if (data.ok === true) {
        localStorage.setItem("email", JSON.stringify(data.email));
        toast.success(data.message);
        cb();
      }
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
      }
    }
  };

//user login
export const login = (email, password, cb) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post(`http://localhost:8000/api/user/login`, {
      email,
      password,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    if (data.success === true) {
      toast.success(data.message);
      cb();
    }

    localStorage.setItem("buyer_user", JSON.stringify(data.user));
    localStorage.setItem("buyer_user_token", JSON.stringify(data.token));
  } catch (error) {
    if (error) {
      toast.error(error.response.data);
    }
  }
};

//verify email or phone
export const verify = (email, verificationCode, cb) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_VERIFY",
    });

    const { data } = await axios.post(
      `http://localhost:8000/api/user/verifyEmail`,
      { email, verificationCode }
    );

    dispatch({
      type: "USER_VERIFY_SUCCESS",
      payload: data,
    });

    if (data.success === true) {
      toast.success(data.message);
      cb(data.success);
    }
    // console.log(data);
    // localStorage.setItem("buyer_user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_VERIFY_FAIL",
      payload: error.response.data.message,
    });

    if (error) {
      toast.error(error.response.data.message);
    }
  }
};

//logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("buyer_user");
  dispatch({ type: USER_LOGOUT });
};

//resend otp
export const resendOtp = (email) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:8000/api/user/resendotp`, { email });
  } catch (error) {
    if (error) {
      toast.error(error.response.data.message);
    }
  }
};

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:8000/api/user/forgotPassword`, {
      email,
    });
  } catch (error) {
    if (error) {
      toast.error(error.response.data.message);
    }
  }
};

//reset  password
export const resetPassword = (email, code, newPassword) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:8000/api/user/resetPassword`, {
      email,
      code,
      newPassword,
    });
  } catch (error) {
    if (error) {
      toast.error(error.response.data.message);
    }
  }
};

//updatePassword
export const updatePassword =
  (id, oldPassword, newPassword) => async (dispatch) => {
    try {
      await axios.post(`http://localhost:8000/api/user/updatePassword`, {
        id,
        oldPassword,
        newPassword,
      });
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message);
      }
    }
  };
