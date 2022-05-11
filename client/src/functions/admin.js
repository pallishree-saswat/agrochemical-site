import axios from "axios";
let url = "http://localhost:8000/api";
export const getOrders = async (authtoken) =>
  await axios.get(`${url}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${url}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );