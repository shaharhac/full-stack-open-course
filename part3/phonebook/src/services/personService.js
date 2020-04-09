import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => {
    console.log(response.data);
    return response.data;
  });
};

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson);
  return request
    .then(response => response.data)
    .catch(error => {
      throw error.response.data;
    });
};

const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then(response => response.data);
};

const deleteOne = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

export default { getAll, create, update, deleteOne };
