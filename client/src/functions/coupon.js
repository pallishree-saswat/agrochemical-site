import axios from "axios";
let url = "http://localhost:8000/api";
export const getCoupons = async () =>
  await axios.get(`${url}/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${url}/coupon/${couponId}`, {
    headers: {
       Authorization:authtoken,
    },
  });

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${url}/coupon`,
    { coupon },
    {
      headers: {
         Authorization:authtoken,
      },
    }
  );