import axios from 'axios';
export const LOGGEDIN = 'LOGGEDIN';
export const LOGIN_ERROR_AUTH = 'LOGIN_ERROR_AUTH';
export const LOGIN_START  = 'LOGIN_START';

// start
// sucess
// fail

const loginStart = ()=>{
    return {
        type:LOGIN_START
    }
}
 function loginchk( username, id, avatar ) {
  return {
    type: LOGGEDIN,
    user: { username, id, avatar },
  };
}

 function authError(error) {
  return {
    type: LOGIN_ERROR_AUTH,
    error,
  };
}

export const login = (email,password) => dispatch=>{
 dispatch( loginStart());

 axios.post('https://haatbazaar.herokuapp.com/api/v1/vendor/auth/signin', {
    email: email,
    password: password
  })
  .then(function (response) {
    if(response.data.success === true){
      var email = response.data.data.username;
      var id = response.data.data._id;
  dispatch(loginchk(email, id, 'ok'))
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('loginsuccess', response.data.success)
  return true;
    }else{  
   dispatch(authError('Username and password didnot matched'))
  alert("Username and password didnot matched")
  return false;
    }
  })
  .catch(function (error) {
    dispatch(authError(error.response.status))
  alert(error.response.data.message)
  return false;
  });

  }
