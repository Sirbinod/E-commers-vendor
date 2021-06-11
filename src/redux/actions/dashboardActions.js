import axios from "axios";
import {dashboardapi} from "../../utils/baseApi/baseapi";

export const SDATAS_START = "SDATAS_START";
export const LOAD_NEW_DATAS = "LOAD_NEW_DATAS";

const dashboardchkStart = () => {
  return {
    type: SDATAS_START,
  };
};
function loaddatas(datatoput) {
  return {
    type: LOAD_NEW_DATAS,
    datatoput,
  };
}

export const getdatasstart = (token) => (dispatch) => {
  dispatch(dashboardchkStart());

  axios({
    method: "get",
    url: dashboardapi,
    headers: {Authorization: "Bearer " + token},
  })
    .then(function (response) {
      dispatch(loaddatas(response.data.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
