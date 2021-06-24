import {FETCH_ALL, CREATE, DELETE} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getCoins = () => async (dispatch) => {
  try {
    const {data} = await api.fetchCoins();
    dispatch({type: FETCH_ALL, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const createCoin = (coin) => async (dispatch) => {
  try {
    const {data} = await api.createCoin(coin);
    dispatch({type: CREATE, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCoin = (id) => async (dispatch) => {
  try {
    await api.deleteCoin(id);

    dispatch({type: DELETE, payload: id});
  } catch (error) {
    console.log(error.message);
  }
};
