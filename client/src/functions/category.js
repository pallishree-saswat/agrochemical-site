import axios from "axios";

let url = "http://localhost:8000/api";

export const getCategories = async () => await axios.get(`${url}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${url}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${url}/category/${slug}`, {
    headers: {
      Authorization: authtoken,
    },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${url}/category/${slug}`, category, {
    headers: {
      Authorization: authtoken,
    },
  });

export const createCategory = async (category, authtoken) =>
  await axios.post(`${url}/category`, category, {
    headers: {
      Authorization: authtoken,
    },
  });

export const getCategorySubs = async (_id) =>
  await axios.get(`${url}/category/subs/${_id}`);
