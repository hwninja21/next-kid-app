import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './form-style';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from "react-twitter-login";
import { FACEBOOK_ID, GOOGLE_ID, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_CALLBACK_URL } from '../../config/ServerUrl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';

function SocialAuth(props) {
  const classes = useStyles();

  const responseGoogle = (response) => {
    console.log(response);
    if (response.profileObj !== undefined && response.profileObj !== null) {
      if (props.authtype === 'login') {
        props.social_login({...response, socialtype: 'google'})
      }
      else {
        props.social_register({
          email: response.profileObj.email,
          firstname: response.profileObj.givenName,
          lastname: response.profileObj.familyName,
          socialmediastuff: 'google'
        })
      }
    }
  }

  const responseFacebook = (response) => {
    console.log(response);
    if (response.profileObj !== undefined && response.profileObj !== null) {
      if (props.authtype === 'login') {
        props.social_login({...response, socialtype: 'facebook'})
      }
      else {
        props.social_register({
          email: response.profileObj.email,
          firstname: response.profileObj.givenName,
          lastname: response.profileObj.familyName,
          socialmediastuff: 'facebook'
        })
      }
    }
  }

  const responseTwitter = (err, data) => {
    console.log(err, data);
    if (data.profileObj !== undefined && data.profileObj !== null) {
      if (props.authtype === 'login') {
        props.social_login({...data, socialtype: 'twitter'})
      }
      else {
        props.social_register({
          email: data.profileObj.email,
          firstname: data.profileObj.givenName,
          lastname: data.profileObj.familyName,
          socialmediastuff: 'twitter'
        })
      }
    }
  };

  return (
    <div className={classes.socmedSideLogin}>
      <FacebookLogin
        appId={FACEBOOK_ID}
        render={renderProps => (
          <Button
            style={{margin: 8}}
            variant="contained"
            className={classes.naviBtn}
            type="button"
            size="large"
            onClick={renderProps.onClick}
          >
            <i className="ion-social-facebook" />
            Facebook
          </Button>
        )}
        callback={responseFacebook}
      />
      <TwitterLogin
        authCallback={responseTwitter}
        consumerKey={TWITTER_CONSUMER_KEY}
        consumerSecret={TWITTER_CONSUMER_SECRET}
        callbackUrl={TWITTER_CALLBACK_URL}
        children={
          <Button
            variant="contained"
            className={classes.blueBtn}
            type="button"
            size="large"
          >
            <i className="ion-social-twitter" />
            <span style={{color: '#fff'}}>Twitter</span>
          </Button>
        }
      />
      <GoogleLogin
        clientId={GOOGLE_ID}
        render={renderProps => (
          <Button
            style={{margin: 8}}
            variant="contained"
            className={classes.redBtn}
            type="button"
            size="large"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <i className="ion-social-google" />
            Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      social_login: actions.social_login,
      social_register: actions.social_register
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(SocialAuth);
