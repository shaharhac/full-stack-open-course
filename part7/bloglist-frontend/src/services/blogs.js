import axios from "axios";
const baseUrl = "/api/blogs";

let token = "";

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateBlog = async blog => {
  const { author, likes, title, url } = blog;
  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    author,
    likes,
    title,
    url
  });
  return response.data;
};

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, createBlog, setToken, updateBlog, deleteBlog };
