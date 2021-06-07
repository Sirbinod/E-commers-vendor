import axios from "axios";
import {useDispatch} from "react-redux";
import {
  itemsapi,
  itemeditapi,
  itemscreateapi,
  itemdeleteapi,
} from "../../utils/baseApi/baseapi";

export const SITEM_START = "SITEM_START";
export const LOAD_NEW_ITEMS = "LOAD_NEW_ITEMS";
export const UPDATE_NEW_ITEMS = "UPDATE_NEW_ITEMS";
export const DELETE_NEW_ITEMS = "DELETE_NEW_ITEMS";

const itemchkStart = () => {
  return {
    type: SITEM_START,
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

// export const seedata = () => {
// loaditem(['abc', 'def']);
//  console.log('We are here');
// };

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
      console.log(error);
    });
};

export const addproduct = (token, tosenddata) => {
  // dispatch(itemchkStart());
  console.log(tosenddata);
  return axios({
    method: "post",
    url: itemscreateapi,
    data: tosenddata,
    headers: {Authorization: "Bearer " + token},
  });
};

export const updateProduct = (token, data, id) => {
  console.log(data);
  return axios({
    method: "put",
    url: itemeditapi + id + `/edit`,
    data: data,
    headers: {Authorization: "Bearer " + token},
  });
};
export const getmedeleted = (token, slug) => (dispatch) => {
  dispatch(itemchkStart());
  axios({
    method: "delete",
    url: itemdeleteapi,
    headers: {Authorization: "Bearer " + token},
  })
    .then(function (response) {
      // dispatch(loaditem(response.data.data));
      alert(response.data.message);
    })
    .catch(function (error) {
      console.log(error);
    });
};
//  export const fetchData = (token) => dispatch =>  {

//        dispatch(itemchkStart());
//       getme(token, dispatch)

// }
