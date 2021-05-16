import {
    SDATAS_START,
    LOAD_NEW_DATAS
} from '../actions/dashboardActions';

const initialState = {
    loading:false,
    datatoput: [],
    done:false,
};
const updateobject=(oldState,newState)=>{
return {...oldState,...newState}
}

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
      case SDATAS_START:
      return state
      case LOAD_NEW_DATAS:
        if(state.done === false){
          return updateobject(state, {loading:false, datatoput:action.datatoput,done:true})
        }else{
          return state;
        }
    default:
      return state;
  }
};

export default dashboardReducer;
