import axios from "axios";

const backendUrl = import.meta.env.VITE_APP_BACKENDURL;

export const getReviews = async (details) => {
  try {
    const response = await axios.get(`${backendUrl}/drama/${details.dramaId}/reviews`, {
      dramaId: details.id,
    });
    return response.data;
  } catch (e) {
    return e.message;
  }
};

export const submitReviewForm = async (reviewDetails, action, id, userProfile, token) => {
  try {
    const response = await axios.post(`${backendUrl}/drama/${id}/${action}`, reviewDetails, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "X-userProfile": `${userProfile}`
      }
    });
    // return the data response from the server
    return response;
  } catch (e) {
    return e.response;
  }
};