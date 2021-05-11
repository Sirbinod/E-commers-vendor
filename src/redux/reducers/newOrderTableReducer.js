import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  CHANGE_NEW_ORDER_TABLE_DATA,
  DELETE_NEW_ORDER_TABLE_DATA,
  LOAD_NEW_ORDER_TABLE_DATA,
} from '../actions/newOrderTableActions';



const initialState = {
  items: [
   
  ],
  data: {},
};
const fetchedProd = async (dispatch) => {
  const res = await axios 
  .get('https://fakestoreapi.com/products')
  .then((resp) => { 
    console.log('sss');
    console.log('res ', resp.json());
    dispatch({
      type: LOAD_NEW_ORDER_TABLE_DATA,
      payload: res,
    });
  });
  // .catch((err) => {
  //   console.log(err);
  // });
};


const newOrderTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NEW_ORDER_TABLE_DATA: {
      const loadData = state.items[action.index];
      return { ...state, data: loadData };
    }
    case CHANGE_NEW_ORDER_TABLE_DATA: {
      const updatedItems = [...state.items];
      updatedItems[action.index] = action.data;
      return { ...state, items: updatedItems };
    }
    case DELETE_NEW_ORDER_TABLE_DATA:
      return { ...state, items: action.items };
    default:
      return state;
  }
};

export default newOrderTableReducer;
