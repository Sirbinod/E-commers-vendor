import axios from "axios";

import {loginapi, passwordchangeapi} from "../../utils/baseApi/baseapi";
export const LOGGEDIN = "LOGGEDIN";
export const LOGIN_ERROR_AUTH = "LOGIN_ERROR_AUTH";
export const LOGIN_START = "LOGIN_START";
export const PROFILE_FETCH = "PROFILE_FETCH";

// start
// sucess
// fail

const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};
export const loginchk = (username, id, avatar) => {
  return {
    type: LOGGEDIN,
    user: {username, id, avatar},
  };
};

export const authError = (error) => {
  return {
    type: LOGIN_ERROR_AUTH,
    payload: error,
  };
};

export const login = async (email, password) => {
  return await axios.post(loginapi, {
    email: email,
    password: password,
  });
};
