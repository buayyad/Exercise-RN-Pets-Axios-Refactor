const BASE_URL = "https://pets-react-query-backend.eapi.joincoded.com";

export { BASE_URL };

import axios from "axios";

const instance = axios.create({
  baseURL: BASE_URL + "/pets",
});

export default instance;
