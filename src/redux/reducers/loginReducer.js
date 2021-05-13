import {
  LOGGEDIN,
  LOGIN_ERROR_AUTH,
  LOGIN_START
} from '../actions/loginActions';

// if(localStorage.)
const token = localStorage.getItem('token')

const initialState = {
    loading:false,
    loggedIn:false,
  username: '',
  id: '',
  avatar: '',
  token:"",
  error:""
};
if(token){
  initialState.loggedIn =true;
  initialState.token=token;
}
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
      case LOGIN_START:
      return { loading:true}
    case LOGGEDIN:
      return { loading:false,loggedIn:true,username: action.user.username, id: action.user.id, avatar: action.user.avatar };
    case LOGIN_ERROR_AUTH:
      return { error: action.error,loading:false,loggedIn:false };
    default:
      return state;
  }
};

export default loginReducer;
