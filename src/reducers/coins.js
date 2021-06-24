import {FETCH_ALL, CREATE, DELETE} from '../constants/actionTypes';

export const coinsReducer = (coins = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...coins, action.payload];
    case DELETE:
      return coins.filter((coin) => coin._id !== action.payload);
    default:
      return coins;
  }
};
