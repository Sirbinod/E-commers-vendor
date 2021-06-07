import axios from "axios";
import { useDispatch } from "react-redux";
import {
  itemsapi,
  itemeditapi,
  itemscreateapi,
  itemdeleteapi,
} from "../../utils/baseApi/baseapi";

export const SITEM_START = "SITEM_START";
export const SITEM_FAIL = "SITEM_FAIL";

export const LOAD_NEW_ITEMS = "LOAD_NEW_ITEMS";
export const UPDATE_NEW_ITEMS = "UPDATE_NEW_ITEMS";
export const DELETE_NEW_ITEMS = "DELETE_NEW_ITEMS";

const itemchkStart = () => {
  return {
    type: SITEM_START,
  };
};

const failStart = (err) => {
  return {
    type: SITEM_FAIL,
    payload: err,
  };
};
function loaditem(items) {
  return {
    type: LOAD_NEW_ITEMS,
    items,
  };
}

function updateitem(data, index) {
  return {
    type: UPDATE_NEW_ITEMS,
    data,
    index,
  };
}

function deleteitem(items) {
  return {
    type: DELETE_NEW_ITEMS,
    items,
  };
}

export const getme = (token) => (dispatch) => {
  dispatch(itemchkStart());

  axios({
    method: "get",
    url: itemsapi,
    headers: { Authorization: "Bearer " + token },
  })
    .then(function (response) {
      dispatch(loaditem(response.data.data));
    })
    .catch(function (error) {
      failStart(error);
      console.log(error);
    });
};

export const addproduct = (token, tosenddata) => {
  if (tosenddata.subCategory === "") {
    tosenddata.subCategory = null;
  }

  if (tosenddata.childCategory === "") {
    tosenddata.childCategory = null;
  }
  console.log(tosenddata);
  return axios.post(itemscreateapi, tosenddata, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const updateProduct = (token, data, id) => {
  console.log(data);
  return axios({
    method: "put",
    url: itemeditapi + id + `/edit`,
    data: data,
    headers: { Authorization: "Bearer " + token },
  });
};
export const getmedeleted = (token, slug) => (dispatch) => {
  dispatch(itemchkStart());
  axios({
    method: "delete",
    url: itemdeleteapi,
    headers: { Authorization: "Bearer " + token },
  })
    .then(function (response) {
      // dispatch(loaditem(response.data.data));
      alert(response.data.message);
    })
    .catch(function (error) {
      console.log(error);
    });
};
