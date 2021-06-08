import axios from "axios";
import { listCategoryListApi } from "../../utils/baseApi/baseapi";

export const SCATA_START = "SCATA_START";
export const LOAD_NEW_CATA = "LOAD_NEW_CATA";

const catachkStart = () => {
  return {
    type: SCATA_START,
  };
};
function loadcatas(catas) {
  return {
    type: LOAD_NEW_CATA,
    catas,
  };
}

export const getcategorystart = () => (dispatch) => {
  dispatch(catachkStart());

  axios({
    method: "get",
    url: listCategoryListApi,
  })
    .then(function (response) {
      console.log(response);
      dispatch(loadcatas(response.data.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
