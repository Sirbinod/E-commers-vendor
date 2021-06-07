import axios from "axios";
import {userlistapi} from "../../utils/baseApi/baseapi";

export const SUSER_START = "SUSER_START";
export const LOAD_NEW_USER = "LOAD_NEW_USER";

const userchkStart = () => {
  return {
    type: SUSER_START,
  };
};
function loadusers(users) {
  return {
    type: LOAD_NEW_USER,
    users,
  };
}

export const getuserstart = (token) => (dispatch) => {
  dispatch(userchkStart());

  axios({
    method: "get",
    url: userlistapi,
    headers: {Authorization: "Bearer " + token},
  })
    .then(function (response) {
      dispatch(loadusers(response.data.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
