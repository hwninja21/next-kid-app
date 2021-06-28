import Router from 'next/router';
import api from '../../../config/ApiConfig.js'
import * as actions from './message.actions';

export const GET_COUNTRIES = '[BASE] GET COUNTRIES';
export const GET_LANGUAGES = '[BASE] GET LANGUAGES';
export const GET_GRADES = '[BASE] GET GRADES';
export const GET_SUBJECTS = '[BASE] GET SUBJECTS';
export const GET_PAYMENT_CONFIGS = '[BASE] GET PAYMENT CONFIGS';

// gets token from the api and stores it in the redux store and in cookie
export const get_countries = () => {
  return (dispatch) => {
    api.get('base/get-country', { })
      .then((response) => {
        dispatch({type: GET_COUNTRIES, payload: response.data.doc});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get countries failed."}));
        // throw new Error(err);
      });
  };
};

export const get_languages = () => {
  return (dispatch) => {
    api.get('base/get-language', { })
      .then((response) => {
        dispatch({type: GET_LANGUAGES, payload: response.data.doc});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get countries failed."}));
        // throw new Error(err);
      });
  };
};

export const get_grades = () => {
  return (dispatch) => {
    api.get('base/get-grade', { })
      .then((response) => {
        dispatch({type: GET_GRADES, payload: response.data.doc});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get grades failed."}));
        // throw new Error(err);
      });
  };
};

export const get_payment_configs = () => {
  return (dispatch) => {
    api.get('base/get-payment-config', { })
      .then((response) => {
        dispatch({type: GET_PAYMENT_CONFIGS, payload: response.data.doc});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get payment config failed."}));
        // throw new Error(err);
      });
  };
};

export const get_subjects = () => {
  return (dispatch) => {
    api.get('base/get-subject', { })
      .then((response) => {
        dispatch({type: GET_SUBJECTS, payload: response.data.doc});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get subjects failed."}));
        // throw new Error(err);
      });
  };
};
