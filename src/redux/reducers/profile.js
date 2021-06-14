import {
  PROFILE_FETCH_START,
  PROFILE_FETCH_SUCCESS,
  PROFILE_FETCH_FAIL,
  PROFILE_UPDATE,
} from "../actions/profile";

const init = {
  loading: false,
  success: false,
  data: {},
  error: "",
  profileData: false,
};
const profileReducer = (state = init, action) => {
  switch (action.type) {
    case PROFILE_FETCH_START:
      return {
        ...state,
        profileData: true,
        loading: true,
      };
    case PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        data: action.payload,
      };
    case PROFILE_UPDATE:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case PROFILE_FETCH_FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default profileReducer;
