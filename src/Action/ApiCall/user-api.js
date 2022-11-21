import axios from "axios";

const API_URL = "//localhost:8017";
const USERS_ENDPOINT = "/api/users";

export const dangKy = async (user) => {
  const response = await axios.post(API_URL + USERS_ENDPOINT, user);
  return response.data;
};

export const dangNhap = async (user) => {
  const response = await axios.post(
    API_URL + USERS_ENDPOINT + "/dang-nhap",
    user
  );
  return response.data;
};

export const getMe = async () => {
  const token = localStorage.getItem("jwt-token");
  const response = await axios.get(API_URL + USERS_ENDPOINT + "/me", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const invite = async (id, data) => {
  const response = await axios.post(
    API_URL + USERS_ENDPOINT + "/invite/" + id,
    data
  );
  return response.data;
};
