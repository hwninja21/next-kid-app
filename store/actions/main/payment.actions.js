import Router from 'next/router';
import api from '../../../config/ApiConfig.js'
import * as actions from './message.actions';

export const ADD_NEW_PAYMENT = '[PAYMENT] ADD NEW PAYMENT';

// gets token from the api and stores it in the redux store and in cookie
export const add_new_payment = (row) => {
  return (dispatch) => {
    api.post('payment/add-new-payment', {row})
      .then((response) => {
        dispatch(actions.showMessage({message: "Add new payment success."}));
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Add new payment failed."}));
        // throw new Error(err);
      });
  };
};
