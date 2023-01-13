import axios from "axios";
const API_URL = `${process.env.REACT_APP_HOST}/api`;

const getHeader = (auth, form) => {
  let header = {};
  if (auth) {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        header = {
          "auth-token": `${token}`,
        };
      }
    } catch (e) {
      // Restoring token failed
    }
  }
  if (!form) {
    header = {
      ...header,
      "Content-Type": "application/json",
    };
  } else {
    header = {
      ...header,
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
    };
  }

  return header;
};

/**
 * Create Axios Request handler
 * @param requestType
 * @param url
 * @param auth
 * @param form
 * @param {object} data
 * @param params
 */
const apiHandler = (
  requestType,
  url,
  auth,
  form,
  data = undefined,
  params = undefined,
  onUploadProgress = undefined,
  withCredentials = false,
) => {
  const headers = getHeader(auth, form);
  return axios({
    baseURL: API_URL,
    url,
    method: requestType,
    headers,
    data,
    params,
    onUploadProgress,
    withCredentials,
  });
};

export default apiHandler;
