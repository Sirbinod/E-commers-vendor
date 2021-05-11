import {
    SUSER_START,
    LOAD_NEW_USER
} from '../actions/userActions';

const initialState = {
    loading:false,
    users: [],
    done:false,
};
const updateobject=(oldState,newState)=>{
return {...oldState,...newState}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
      case SUSER_START:
      return updateobject(state, { loading:true});
      case LOAD_NEW_USER:
        if(state.done === false){
          return updateobject(state, {loading:false, users:action.users,done:true})
        }else{
          return state;
        }
    default:
      return state;
  }
};

export default userReducer;
