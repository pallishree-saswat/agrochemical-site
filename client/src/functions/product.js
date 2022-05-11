import axios from "axios";
let url = "http://localhost:8000/api";
export const createProduct = async (product, authtoken) =>
  await axios.post(`${url}/product`, product, {
    headers: {
      Authorization: authtoken,
    },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`${url}/products/${count}`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${url}/product/${slug}`, {
    headers: {
      Authorization: authtoken,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${url}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${url}/product/${slug}`, product, {
    headers: {
      Authorization: authtoken,
    },
  });

export const getProducts = async (sort, order, page) =>
  await axios.post(`${url}/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axios.get(`${url}/products/total`);

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${url}/product/star/${productId}`,
    { star },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );

export const getRelated = async (productId) =>
  await axios.get(`${url}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${url}/search/filters`, arg);
