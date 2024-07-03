import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const backendUrl = import.meta.env.VITE_APP_BACKENDURL;

export const getUser = async (id, token) => {
  try {
    const response = await axios.get(`${backendUrl}/members/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime === true) {
      logout();
    }
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return error.message;
  }
};

export const loggedIn = () => {
  const token = Cookies.get("token");
  if (!token) {
    return false;
  }
  return isTokenExpired(token) ? false : true;
};

export const logout = () => {
  Cookies.remove("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userProfile");
  window.location.href = "/";
};