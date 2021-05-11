import {
    SITEM_START,
  LOAD_NEW_ITEMS,
  UPDATE_NEW_ITEMS,
  DELETE_NEW_ITEMS
} from '../actions/itemActions';

const initialState = {
    loading:false,
    items: [],
    done:false,
};
const updateobject=(oldState,newState)=>{
return {...oldState,...newState}
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
      case SITEM_START:
      return updateobject(state, { loading:true});
      case LOAD_NEW_ITEMS:
        if(state.done === false){
          return updateobject(state, {loading:false, items:action.items,done:true})
        }else{
          return state;
        }
    case UPDATE_NEW_ITEMS:
      return {  ...state,loading:false,message:'We are ready to update' };
    case DELETE_NEW_ITEMS:
      return { ...state, error: action.error,loading:false };
    default:
      return state;
  }
};

export default itemReducer;