import axios from "axios";

function createApiClient(baseURL) {
  // https://mevn-nikeshoes-api.vercel.app
  // http://127.0.0.1:3000
  return axios.create({
    baseURL: "http://127.0.0.1:3000" + baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export default createApiClient;
