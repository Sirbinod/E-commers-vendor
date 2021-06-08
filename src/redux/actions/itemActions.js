import axios from "axios";
import {useDispatch} from "react-redux";
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
export const DELETE_SUCCEESS = "DELETE_SUCCESS";
export const ADD_PRODUCT = "ADD_PRODUCT";

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

function deleteitem(id) {
  return {
    type: DELETE_NEW_ITEMS,
    id,
  };
}
// function deleteSuccess(id) {
//   return {
//     type: DELETE_SUCCEESS,
//     payload: id,
//   };
// }
export const deleteSuccess = (id) => {
  return {
    type: DELETE_SUCCEESS,
    payload: id,
  };
};

export const getme = (token) => (dispatch) => {
  dispatch(itemchkStart());

  axios({
    method: "get",
    url: itemsapi,
    headers: {Authorization: "Bearer " + token},
  })
    .then(function (response) {
      dispatch(loaditem(response.data.data));
    })
    .catch(function (error) {
      failStart(error);
    });
};
export const addProductSuccess = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const addproduct = (token, tosenddata) => {
  if (tosenddata.subCategory === "") {
    tosenddata.subCategory = null;
  }

  if (tosenddata.childCategory === "") {
    tosenddata.childCategory = null;
  }
  return axios.post(itemscreateapi, tosenddata, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const updateProduct = (token, data, id) => {
  return axios({
    method: "put",
    url: itemeditapi + id + `/edit`,
    data: data,
    headers: {Authorization: "Bearer " + token},
  });
};
export const getmedeleted = (token, slug) => {
  // dispatch(itemchkStart());
  return axios({
    method: "delete",
    url: itemdeleteapi + slug + `/delete`,
    headers: {Authorization: "Bearer " + token},
  });
  // .then(function (response) {
  //   alert(response.data.message);
  // })
  // .catch(function (error) {});
};
