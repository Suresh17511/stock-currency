import axios from 'axios';

const url = 'https://stock-currency.herokuapp.com/coins';

export const fetchCoins = () => axios.get(url);
export const createCoin = (newCoin) => axios.post(url, newCoin);
export const deleteCoin = (id) => axios.delete(`${url}/${id}`);
