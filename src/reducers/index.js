import {combineReducers} from 'redux';

import {coinsReducer} from './coins';

const reducers = combineReducers({coins: coinsReducer});

export default reducers;
