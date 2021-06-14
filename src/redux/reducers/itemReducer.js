import {
  SITEM_START,
  LOAD_NEW_ITEMS,
  UPDATE_NEW_ITEMS,
  DELETE_NEW_ITEMS,
  DELETE_SUCCEESS,
  ADD_PRODUCT,
} from "../actions/itemActions";

const initialState = {
  loading: false,
  items: [],
  done: false,
  process: null,
  listItems: false,
  getItem: (itemId) => this.items.filter((i) => i._id === itemId)[0],
};
const updateobject = (oldState, newState) => {
  return {...oldState, ...newState};
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SITEM_START:
      return updateobject(state, {
        loading: true,
        listItems: true,
        items: [],
      });
    case LOAD_NEW_ITEMS:
      if (state.done === false) {
        return updateobject(state, {
          loading: false,
          items: action.items,
          done: true,
        });
      } else {
        return {...state, items: []};
      }

    case UPDATE_NEW_ITEMS:
      const newItems = [...state.items];
      console.log("========================");
      console.log(newItems);
      console.log("========================");

      // const newItem.push(action.payload);
      const updatedItems = newItems.findIndex(
        (x) => x._id === action.payload._id
      );

      console.log("========================");
      console.log(updatedItems);
      console.log("========================");

      // const currentItemIndex = newItems.indexOf(updatedItems);
      // newItems.remove(updatedItems);

      const newItem = action.payload;
      newItems[updatedItems] = newItem;
      return {
        ...state,
        loading: false,
        items: [...newItems],
      };
    case DELETE_NEW_ITEMS:
      return {
        ...state,
        items: action.items,
        error: action.error,
        loading: false,
      };
    case DELETE_SUCCEESS:
      const initialState = [...state.items];
      const toDelete = initialState.find((x) => x._id === action.payload)[0];
      const indexToDelete = initialState.indexOf(toDelete);
      toDelete.splice(indexToDelete);
      return {
        ...state,
        items: [...initialState],
      };
    case ADD_PRODUCT:
      const initProduct = [...state.items];
      initProduct.push(action.payload);
      return {...state, items: [...initProduct]};

    default:
      return state;
  }
};

export default itemReducer;
