import {
    SVENDOR_START,
    LOAD_NEW_VENDOR
} from '../actions/vendorActions';

const initialState = {
    loading:false,
    vendors: [],
    done:false,
};
const updateobject=(oldState,newState)=>{
return {...oldState,...newState}
}

const vendorsReducer = (state = initialState, action) => {
  switch (action.type) {
      case SVENDOR_START:
      return updateobject(state, { loading:true});
      case LOAD_NEW_VENDOR:
        if(state.done === false){
          return updateobject(state, {loading:false, vendors:action.vendors,done:true})
        }else{
          return state;
        }
    default:
      return state;
  }
};

export default vendorsReducer;
