import axios from 'axios';

export const SUSER_START = 'SUSER_START';
export const LOAD_NEW_USER = 'LOAD_NEW_USER';

const userchkStart = ()=>{
    return {
        type:SUSER_START
    }
}
function loadusers(users) {
  return {
    type: LOAD_NEW_USER,
    users,
  };
}


export const getuserstart = (token) => dispatch=>{
       dispatch(userchkStart());
  
axios({
  method: 'get',
  url: 'https://haatbazaar.herokuapp.com/api/v1/admin/user/list',
  headers:  {"Authorization" : "Bearer "+token}
  })
  .then(function (response) {
    dispatch(loadusers(response.data.data));

    })
    .catch(function (error) {
      console.log(error)
    
  });


}



