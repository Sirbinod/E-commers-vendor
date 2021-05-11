import axios from 'axios';

export const SORDER_START = 'SORDER_START';
export const LOAD_NEW_ORDERS = 'LOAD_NEW_ORDERS';

const orderchkStart = ()=>{
    return {
        type:SORDER_START
    }
}
function loadorder(orders) {
  return {
    type: LOAD_NEW_ORDERS,
    orders,
  };
}


export const getorderstart = (token) => dispatch=>{
       dispatch(orderchkStart());
  
axios({
  method: 'get',
  url: 'https://haatbazaar.herokuapp.com/api/v1/vendor/order/list',
  headers:  {"Authorization" : "Bearer "+token}
  })
  .then(function (response) {
    dispatch(loadorder(response.data.data));

    })
    .catch(function (error) {
      console.log(error)
    
  });


}



