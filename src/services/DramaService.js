import axios from "axios";

const backendUrl = import.meta.env.VITE_APP_BACKENDURL;

export const getDramas = async () => { 
  try {
    const response = await axios.get(`${backendUrl}/explore`);
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getDrama = async (id) => { 
  try {
    const response = await axios.get(`${backendUrl}/drama/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};