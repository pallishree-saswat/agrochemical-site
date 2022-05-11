import axios from "axios";
let url = "http://localhost:8000/api";
export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${url}/user/cart`,
    { cart },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${url}/user/cart`, {
    headers: {
      Authorization: authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${url}/user/cart`, {
    headers: {
      Authorization: authtoken,
    },
  });

export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${url}/user/address`,
    { address },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${url}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );

export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${url}/user/order`,
    { stripeResponse },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${url}/user/orders`, {
    headers: {
      Authorization: authtoken,
    },
  });

export const getWishlist = async (authtoken) =>
  await axios.get(`${url}/user/wishlist`, {
    headers: {
      Authorization: authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${url}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${url}/user/wishlist`,
    { productId },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
