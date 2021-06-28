import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';

function ForgotpasswordForm(props) {
  const classes = useStyles();
  const { t } = props;
  const text = useText();
  const [values, setValues] = useState({
    email: '',
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
    const { send_pw_email } = props;
    send_pw_email(
      { email: values.email }
    );
  };

  return (
    <AuthFrame title={t('common:login_title')} subtitle={t('common:forgot_subtitle')}>
      <div>
        <div className={classes.head}>
          <Typography align="left" className={classes.titleText}>
            {t('common:forgot_title')}
          </Typography>
        </div>
        <div className={classes.separator}>
          <Typography>
            {t('common:forgot_subtitle2')}
          </Typography>
        </div>
        <ValidatorForm
          onError={errors => console.log(errors)}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t('common:login_email')}
                onChange={handleChange('email')}
                name="email"
                value={values.email}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
              />
            </Grid>
          </Grid>
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth type="submit" color="secondary" size="large" >
              {t('common:continue')}
            </Button>
          </div>
        </ValidatorForm>
      </div>
    </AuthFrame>
  );
}


ForgotpasswordForm.propTypes = {
  t: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      send_pw_email: actions.send_pw_email
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(withTranslation(['common'])(ForgotpasswordForm));
