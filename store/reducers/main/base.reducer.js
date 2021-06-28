import * as Actions from '../../actions/main/index';

const initialState = {
  countries: null,
  languages: null,
  grades: null,
  subjects: null,
  payment_config: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
  case Actions.GET_COUNTRIES:
    return { ...state, countries: action.payload };
  case Actions.GET_LANGUAGES:
    return { ...state, languages: action.payload };
  case Actions.GET_GRADES:
    return { ...state, grades: action.payload };
  case Actions.GET_PAYMENT_CONFIGS:
      return { ...state, payment_config: action.payload };
  case Actions.GET_SUBJECTS:
    return { ...state, subjects: action.payload };
  default:
    return state;
  }
};
