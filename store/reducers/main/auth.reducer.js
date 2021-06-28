import * as Actions from '../../actions/main/index';

const initialState = {
  token: null,
  profile: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
  case Actions.LOGIN:
    return { token: action.payload.decodedToken, profile: action.payload.profile };
  case Actions.REGISTER:
    return { token: action.payload.decodedToken, profile: action.payload.profile };
  case Actions.LOGOUT:
    return { token: null };
  default:
    return state;
  }
};
