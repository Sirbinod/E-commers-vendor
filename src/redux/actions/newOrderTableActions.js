export const LOAD_NEW_ORDER_TABLE_DATA = 'LOAD_NEW_ORDER_TABLE_DATA';
export const CHANGE_NEW_ORDER_TABLE_DATA = 'CHANGE_NEW_ORDER_TABLE_DATA';
export const DELETE_NEW_ORDER_TABLE_DATA = 'DELETE_NEW_ORDER_TABLE_DATA';


export function loadNewOrderTableData(items) {
  return {
    type: LOAD_NEW_ORDER_TABLE_DATA,
    items,
  };
}

export function changeNewOrderTableData(data, index) {
  return {
    type: CHANGE_NEW_ORDER_TABLE_DATA,
    data,
    index,
  };
}

export function deleteNewOrderTableData(items) {
  return {
    type: DELETE_NEW_ORDER_TABLE_DATA,
    items,
  };
}
