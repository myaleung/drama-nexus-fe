import axios from "axios";

const backendUrl = import.meta.env.VITE_APP_BACKENDURL;

export const submitAuthForm = async (userDetails, action) => {
  try {
    // Make a post request with the user details and path
    const response = await axios.post(`${backendUrl}${action}`, userDetails);
    // return the data response from the server
    return response;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const submitProfileUpdate = async (profileDetails, id, token) => {
  try {
    // Make a put request with the new profile details
    const response = await axios.put(`${backendUrl}/members/${id}/edit`, profileDetails, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    // return the data response from the server
    return response;
  } catch (e) {
    return e.response;
  }
};