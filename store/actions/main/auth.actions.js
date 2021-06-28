import Router from 'next/router';
import { setCookie, removeCookie, getCookieFromBrowser } from '../../../utils/cookie';
import api from '../../../config/ApiConfig.js'
import jwtDecode from 'jwt-decode';
import * as actions from './message.actions';
import JwtDecode from 'jwt-decode';
import { i18n } from '~/i18n';

export const LOGIN = '[AUTH] AUTHENTICATE';
export const REGISTER = '[AUTH] AUTHENTICATE';
export const LOGOUT = '[AUTH] DEAUTHENTICATE';

// gets token from the api and stores it in the redux store and in cookie
export const authenticate = ({ email, password }) => {
  return (dispatch) => {
    api.post('auth/login', { email, password })
      .then((response) => {
        setCookie('token', response.data.access_token);
        i18n.changeLanguage(response.data.profile.language);
        dispatch({type: LOGIN, payload: {decodedToken: response.data.decodedToken, profile: response.data.profile}});
        let isapproved = response.data.decodedToken.isapproved;
        let isactive = response.data.decodedToken.isactive;
        let profiletype = response.data.decodedToken.profiletype;
        if (isapproved === undefined || isapproved === null || isapproved === false)
          Router.push('/verification/');
        else if (profiletype === 'Teacher' && (isactive === undefined || isactive === null || isactive === false))
          Router.push('/wait/');
        else
          Router.push('/');
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Invalid email and password."}));
        // throw new Error(err);
      });
  };
};

export const social_login = (req) => {
  console.log(req);
  return (dispatch) => {
    api.get(`${req.socialtype}-login`, req)
      .then((response) => {
        setCookie('token', response.data.access_token);
        dispatch({type: LOGIN, payload: {decodedToken: response.data.decodedToken, profile: response.data.profile}});
        let isactive = response.data.decodedToken.isactive;
        let profiletype = response.data.decodedToken.profiletype;
        if (profiletype === 'Teacher' && (isactive === undefined || isactive === null || isactive === false))
          Router.push('/wait/');
        else
          Router.push('/');
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Invalid social account."}));
        // throw new Error(err);
      });
  };
};

export const register = ({ email, password, profiletype, firstname, lastname, schoolname, country, language }) => {
  return (dispatch) => {
    api.post(`auth/register`, { email, password, profiletype, firstname, lastname, schoolname, country, language})
      .then((response) => {
        setCookie('token', response.data.access_token);
        dispatch(send_v_email({ email: response.data.decodedToken.email }));
        Router.push('/verification/');
        dispatch({type: REGISTER, payload: {decodedToken: response.data.decodedToken, profile: response.data.profile}});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Invalid email and password."}));
        // throw new Error(err);
      });
  };
};

export const social_register = ({ email, firstname, lastname, socialmediastuff }) => {
  return (dispatch) => {
    api.post(`auth/social-register`, { email, firstname, lastname, socialmediastuff})
      .then((response) => {
        setCookie('token', response.data.access_token);
        Router.push('/');
        dispatch({type: REGISTER, payload: {decodedToken: response.data.decodedToken, profile: response.data.profile}});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Invalid social account."}));
        // throw new Error(err);
      });
  };
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = () => {
  let token = getCookieFromBrowser('token');
  if ( !token )
  {
    return (dispatch) => {
      dispatch({type: null});
    };
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if ( decoded.exp < currentTime )
    {
      dispatch(actions.showMessage({message: "Access token expired."}));
      console.warn('access token expired');
      return (dispatch) => {
        dispatch({type: null});
      };
    }      
  } catch (error) {
    return (dispatch) => {
      dispatch({type: null});
    };    
  }

  return (dispatch) => {
    api.post(`auth/access-token`, { access_token: token})
      .then((response) => {
        setCookie('token', response.data.access_token);
        dispatch({type: LOGIN, payload: {decodedToken: response.data.decodedToken, profile: response.data.profile}});
        let isapproved = response.data.decodedToken.isapproved;
        let isactive = response.data.decodedToken.isactive;
        let profiletype = response.data.decodedToken.profiletype;
        if (isapproved === undefined || isapproved === null || isapproved === false)
          Router.push('/verification/');
        else if (profiletype === 'Teacher' && (isactive === undefined || isactive === null || isactive === false))
          Router.push('/wait/');
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Invalid access token."}));
        // throw new Error(err);
      });
  };
};

// removing the token
export const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('token');
    Router.push('/');
    dispatch({type: LOGOUT});
  };
};

export const send_v_email = ({ email }) => {
  return (dispatch) => {
    api.post(`auth/send-v-email`, { email })
      .then((response) => {
        dispatch(actions.showMessage({message: "Email sent."}));
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Failed to send verification email."}));
        // throw new Error(err);
      });
  };
};

export const verify_email_token = ({ access_token }) => {
  return (dispatch) => {
    api.post(`auth/verify-email-token`, { access_token })
      .then((response) => {
        setCookie('token', response.data.access_token);
        dispatch({type: LOGIN, payload: {decodedToken: response.data.decodedToken, profile: response.data.profile}});
        Router.push('/');
        dispatch(actions.showMessage({message: "Successfully verified."}));
      })
      .catch((err) => {
        Router.push('/login');
        dispatch(actions.showMessage({message: "Failed to verification."}));
        // throw new Error(err);
      });
  };
};

export const send_pw_email = ({ email }) => {
  return (dispatch) => {
    dispatch(actions.showMessage({message: "Sending reset email to ...."}));
    api.post(`auth/send-pw-email`, { email })
      .then((response) => {
        Router.push('/');
        dispatch(actions.showMessage({message: "Reset email sent. Please check your email"}));
      })
      .catch((err) => {
        Router.push('/404');
        dispatch(actions.showMessage({message: "Failed to send reset email."}));
        // throw new Error(err);
      });
  };
};

export const set_forgotten_pw = ({ access_token, password }) => {
  return (dispatch) => {
    api.post(`auth/set-forgotten-pw`, { access_token, password })
      .then((response) => {
        setCookie('token', response.data.access_token);
        dispatch({type: LOGIN, payload: {decodedToken: response.data.decodedToken, profile: response.data.profile}});
        Router.push('/');
        dispatch(actions.showMessage({message: "Successfully reset password."}));
      })
      .catch((err) => {
        Router.push('/404');
        dispatch(actions.showMessage({message: "Failed to reset password."}));
        // throw new Error(err);
      });
  };
};

export const change_password = ({ oldpassword, password }) => {
  return (dispatch) => {
    const access_token = getCookieFromBrowser('token');
    const decoded = JwtDecode(access_token);
    api.post(`auth/change-password`, { email: decoded.email, oldpassword, password })
      .then((response) => {
        setCookie('token', response.data.access_token);
        Router.push('/');
        dispatch({type: LOGIN, payload: {decodedToken: response.data.decodedToken, profile: response.data.profile}});
        dispatch(actions.showMessage({message: "Successfully reset password."}));
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Failed to reset password."}));
        // throw new Error(err);
      });
  };
};

export const update_profile = ({ email, profiletype, firstname, lastname, schoolname, country, language, avatar }) => {
  return (dispatch) => {
    api.post(`auth/update-profile`, { email, profiletype, firstname, lastname, schoolname, country, language, avatar})
      .then((response) => {
        setCookie('token', response.data.access_token);
        Router.push('/');
        dispatch({type: LOGIN, payload: {decodedToken: response.data.decodedToken, profile: response.data.profile}});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Invalid email and password."}));
        // throw new Error(err);
      });
  };
};

export const contact_message = (params) => {
  return (dispatch) => {
    api.post(`auth/contact-message`, params)
      .then((response) => {
        Router.push('/');
        dispatch(actions.showMessage({message: "Contact email sent."}));
      })
      .catch((err) => {
        Router.push('/404');
        dispatch(actions.showMessage({message: "Failed to send contact email."}));
        // throw new Error(err);
      });
  };
};