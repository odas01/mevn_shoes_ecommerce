import axios from "axios";

function createApiClient(baseURL) {
  const newBaseURL = "https://mevn-nikeshoes-api.vercel.app/" + baseURL;
  return axios.create({
    newBaseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export default createApiClient;
