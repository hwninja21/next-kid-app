import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';

function Setpassword(props) {
  const classes = useStyles();
  const text = useText();
  const { t } = props;
  const [values, setValues] = useState({
    // name: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== values.password) {
        return false;
      }
      return true;
    });
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log('data submited');
  };

  const handleContinue = (event) => {
    const { set_forgotten_pw } = props;
    event.preventDefault();
    if (handleDisabled() === true)
      set_forgotten_pw(
        { access_token: props.access_token, password: values.password }
      );
  };

  const handleDisabled = () => {
    if (values.password.length < 4) return false;
    if (values.password !== values.confirmPassword) return false;
    return true;
  };

  return (
    <AuthFrame title={t('common:register_title')} subtitle={t('common:setpw_subtitle')}>
      <div>
        <div className={classes.head}>
        <Typography align="left" className={classes.titleText}>
          {t('common:setpw_title')}
        </Typography>
        </div>
        <ValidatorForm
          onError={errors => console.log(errors)}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextValidator
                variant="filled"
                type="password"
                className={classes.input}
                label={t('common:register_password')}
                validators={['required']}
                onChange={handleChange('password')}
                errorMessages={['This field is required']}
                name="password"
                value={values.password}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextValidator
                variant="filled"
                type="password"
                className={classes.input}
                label={t('common:register_confirm')}
                validators={['isPasswordMatch', 'required']}
                errorMessages={['Password mismatch', 'this field is required']}
                onChange={handleChange('confirmPassword')}
                name="confirm"
                value={values.confirmPassword}
              />
            </Grid>
          </Grid>
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth type="submit" color="secondary" size="large" onClick={handleContinue}>
              {t('common:continue')}
            </Button>
          </div>
        </ValidatorForm>
      </div>
    </AuthFrame>
  );
}


Setpassword.propTypes = {
  t: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      set_forgotten_pw: actions.set_forgotten_pw
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(withTranslation(['common'])(Setpassword));
