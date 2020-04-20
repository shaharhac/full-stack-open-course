import axios from "axios";
const baseUrl = "/api/blogs";

const getAllCommentOf = async blogId => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`);
  return response.data;
};

const createCommentTo = async (blogId, text) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { text });
  return response.data;
};

export default { getAllCommentOf, createCommentTo };
