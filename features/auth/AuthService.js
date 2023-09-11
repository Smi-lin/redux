import axios from "axios";
import { backend_url } from "../../../server";

export const API_URL = `${backend_url}/api/users/`;

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// const logout = async (userData) => {
//   const response = await axios.get(API_URL + "logout");
//   return response.data.message;
// };

const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);
  return response.data.message;
};

const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);

  return response.data.message;
};

const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );

  return response.data.message;
};

const getUsers = async () => {
  const response = await axios.get(API_URL + "getUsers");

  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};



const authService = {
  register,
  login,
  // logout,
  getLoginStatus,
  getUser,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
};
export default authService;
