import axios from "axios";
let url = "http://localhost:8000/api";
export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${url}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${url}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${url}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};