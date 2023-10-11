import axios from "axios";

// const baseURL = "https://api-dev.a0bet.net/";

const baseURL = "http://154.26.139.170/api";

export const clientAPI = async (method, url, options) => {
  if (!options) options = {};
  let urlencodedOptions = new URLSearchParams(
    Object.entries(options)
  ).toString();

  const { data } = await axios({
    baseURL,
    url,
    method,
    data: urlencodedOptions,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (method.toLowerCase() === "post") {
    if (data?.status === "OK") return data?.ret;
    else return data?.message;
  } else if (method.toLowerCase() === "get") {
    if (data?.status === "OK") return data?.ret;
    else if (data?.status === "FAILED") return data?.message;
    else return data;
  }
};
