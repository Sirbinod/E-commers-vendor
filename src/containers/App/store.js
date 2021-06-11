import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as reduxFormReducer } from "redux-form";
import reducer from "../../redux/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducer, [], enhancer);

export default store;
