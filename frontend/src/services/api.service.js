import axios from "axios";

function createApiClient(baseURL) {
  return axios.create({
    baseURL: "https://mevn-nikeshoes-api.vercel.app" + baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export default createApiClient;
