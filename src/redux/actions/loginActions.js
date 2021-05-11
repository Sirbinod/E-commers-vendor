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
 axios({
  method: 'post',
  url: 'https://haatbazaar.herokuapp.com/api/v1/vendor/auth/signin',
  data: {
    email: email,
    password: password
  }
})
  .then(function (response) {
    console.log(response.data)
    if(response.data.success === true){
      var email = response.data.data.username;
      var id = response.data.data._id;
  dispatch(loginchk(email, id, 'ok'))
  localStorage.setItem('token', response.data.token);
  alert(response.data.message) 
    }else{
   dispatch(authError('Username and password didnot matched'))
  alert("Username and password didnot matched")

    }
  })
  .catch(function (error) {
    dispatch(authError(error))
  alert(error)
  });

  // login code 
  // if fail dispatch(auth err(err)))
//  try{
//  const response = axios({
//    baseUrl:"localost.."
//     method:"POST",
//     data:{
//       email:"",
//       password:""
//     }
  }
