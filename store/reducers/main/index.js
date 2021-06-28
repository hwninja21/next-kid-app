import {combineReducers} from 'redux';
import auth from './auth.reducer';
import base from './base.reducer';
import data from './data.reducer';
import message from './message.reducer';

const mainReducers = combineReducers({
    auth,
    base,
    data,
    message,
});

export default mainReducers;
