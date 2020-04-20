import axios from "axios";
const baseUrl = "/api/login";

const loginWithCredentials = async credentials => {
  let response;
  try {
    response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default { loginWithCredentials };
