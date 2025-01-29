import axios from "axios";
// import { store } from "../Store/store";
let baseUrl = "http://192.168.1.59:8000/";
// let baseUrl = "https://shopping-website-12o1.onrender.com/";

export function GetData(apiRoute, payload, callback) {
  //   const auth = store.getState()?.auth?.authToken;
  const auth = "";
  axios
    .get(baseUrl + apiRoute, {
      params: payload,
      headers: {
        "Content-Type": "application/json",
        token: auth,
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error?.response);
    });
}
export function PostData(apiRoute, payload, callback) {
  //   const auth = store?.getState()?.auth.authToken;
  const auth = "";

  try {
    axios
      .post(baseUrl + apiRoute, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: auth,
        },
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error?.response);
      });
  } catch (error) {
    callback(error);
  }
}
