import axios from "axios";
let url = "http://localhost:8000/api";

export const getSubs = async () => await axios.get(`${url}/subs`);

export const getSub = async (slug) => await axios.get(`${url}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${url}/sub/${slug}`, {
    headers: {
      Authorization: authtoken,
    },
  });

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${url}/sub/${slug}`, sub, {
    headers: {
      Authorization: authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post(`${url}/sub`, sub, {
    headers: {
      Authorization: authtoken,
    },
  });
