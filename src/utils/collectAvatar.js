import { getUser } from "../services/AuthUserService";

const collectAvatar = async (id, token) => {
  try {
    const userProfile = await getUser(id, token);
    return userProfile.data.userProfile.profilePicture;
  } catch (e) {
    return e.response;
  }
};

export default collectAvatar;