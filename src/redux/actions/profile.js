import axios from "axios";
import {profiledetailapi, profileupdateapi} from "../../utils/baseApi/baseapi";

export const PROFILE_FETCH_START = "PROFILE_FETCH_START";
export const PROFILE_FETCH_SUCCESS = "PROFILE_FETCH_SUCCESS";
export const PROFILE_FETCH_FAIL = "PROFILE_FETCH_FAIL";
export const PROFILE_UPDATE = "PROFILE_UPDATE";

const fetchStart = () => {
  return {
    type: PROFILE_FETCH_START,
  };
};

const fetchSuccess = (data) => {
  return {
    type: PROFILE_FETCH_SUCCESS,
    payload: data,
  };
};

const fetchFail = (err) => {
  return {
    type: PROFILE_FETCH_FAIL,
    payload: err,
  };
};
export const updateSuccess = (data) => {
  return {
    type: PROFILE_UPDATE,
    payload: data,
  };
};

export const profileFetch = (token) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await axios.get(profiledetailapi, {
      headers: {Authorization: "Bearer " + token},
    });
    if (res.data.success) {
      dispatch(fetchSuccess(res.data.data));
    } else {
      dispatch(fetchFail(res.data.message));
    }
  } catch (error) {
    dispatch(fetchFail(error));
  }
};

export const profileUpdate = (data, token) => {
  console.log(data);
  return axios.put(profileupdateapi, data, {
    headers: {Authorization: "Bearer " + token},
  });
};
