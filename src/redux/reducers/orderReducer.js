import {
    SORDER_START,
    LOAD_NEW_ORDERS
} from '../actions/orderActions';

const initialState = {
    loading:false,
    orders: [],
    done:false,
};
const updateobject=(oldState,newState)=>{
return {...oldState,...newState}
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
      case SORDER_START:
      return updateobject(state, { loading:true});
      case LOAD_NEW_ORDERS:
        if(state.done === false){
          return updateobject(state, {loading:false, orders:action.orders,done:true})
        }else{
          return state;
        }
    default:
      return state;
  }
};

export default orderReducer;
