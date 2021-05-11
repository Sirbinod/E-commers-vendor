import {
    SCATA_START,
    LOAD_NEW_CATA
} from '../actions/categoryActions';

const initialState = {
    loading:false,
    catas: [],
    done:false,
};
const updateobject=(oldState,newState)=>{
return {...oldState,...newState}
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
      case SCATA_START:
      return updateobject(state, { loading:true});
      case LOAD_NEW_CATA:
        if(state.done === false){
          return updateobject(state, {loading:false, catas:action.catas,done:true})
        }else{
          return state;
        }
    default:
      return state;
  }
};

export default categoryReducer;
