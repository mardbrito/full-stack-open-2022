import axios from "axios";
const baseUrl = "/api/users";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = (id) => {
  const request = axios.get(baseUrl + "/" + id + "");
  return request.then((response) => response.data);
};

const users = { getAll, getOne };

export default users;
