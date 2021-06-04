import {
  SITEM_START,
  LOAD_NEW_ITEMS,
  UPDATE_NEW_ITEMS,
  DELETE_NEW_ITEMS,
} from "../actions/itemActions";

const initialState = {
  loading: false,
  items: [],
  done: false,
};
const updateobject = (oldState, newState) => {
  return {...oldState, ...newState};
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SITEM_START:
      return state;
    case LOAD_NEW_ITEMS:
      if (state.done === false) {
        return updateobject(state, {
          loading: false,
          items: action.items,
          done: true,
        });
      } else {
        return state;
      }

    case UPDATE_NEW_ITEMS:
      const newItems = [...state.items];
      const updatedItems = newItems.find((x) => x._id === action.payload._id);
      const currentItemIndex = newItems.indexOf(updatedItems);
      const newItem = action.payload;
      newItems[currentItemIndex] = newItem;
      return {
        ...state,
        loading: false,
        items: [...updatedItems],
        message: "We are ready to update",
      };
    case DELETE_NEW_ITEMS:
      return {...state, error: action.error, loading: false};
    default:
      return state;
  }
};

export default itemReducer;
