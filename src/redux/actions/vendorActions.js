import axios from 'axios';

export const SVENDOR_START = 'SVENDOR_START';
export const LOAD_NEW_VENDOR = 'LOAD_NEW_VENDOR';

const vendorschkStart = ()=>{
    return {
        type:SVENDOR_START
    }
}
function loadvendors(vendors) {
  return {
    type: LOAD_NEW_VENDOR,
    vendors,
  };
}


export const getvendorsstart = (token) => dispatch=>{
       dispatch(vendorschkStart());
  
axios({
  method: 'get',
  url: 'https://haatbazaar.herokuapp.com/api/v1/admin/vendor/list',
  headers:  {"Authorization" : "Bearer "+token}
  })
  .then(function (response) {
    dispatch(loadvendors(response.data.data));

    })
    .catch(function (error) {
      console.log(error)
    
  });


}



