import axios from "axios";

const backendUrl = import.meta.env.VITE_APP_BACKENDURL;

export const updateWatchlist = async (details) => {
  try {
    const response = await axios.put(`${backendUrl}/members/${details.userId}/watchlist`, {
      dramaId: details.id,
    }, {
      headers: {
        "Authorization": `Bearer ${details.token}`
      }
    });
    return response.data;
  } catch (e) {
    return e.message;
  }
};