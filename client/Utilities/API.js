import axios from "axios";
// import { store } from "../Store/store";
import {store} from '../redux/store'
let baseUrl = "http://localhost:8000/";
// let baseUrl = "https://shopping-website-12o1.onrender.com/";


export function GetData(apiRoute, payload, callback) {
  //   const auth = store.getState()?.auth?.authToken;
  const auth = store.getState()?.user?.authentication_token;
  console.log(auth,"auth")
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
  const auth = store.getState()?.user?.authentication_token;
  console.log(auth,"auth")

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
