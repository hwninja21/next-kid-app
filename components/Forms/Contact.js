import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import routeLink from '~/static/text/link';
import useStyles from './form-style';
import ReCAPTCHA from "react-google-recaptcha";
import { GOOGLE_RECAPTCHA_CLIENT_KEY } from '~/config/ServerUrl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';

function Contact(props) {
  const classes = useStyles();
  const text = useText();
  const { t } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: ''
  });

  const recaptchaRef = React.createRef();

  const [openNotif, setNotif] = useState(false);

  const [check, setCheck] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = event => {
    setCheck(event.target.checked);
  };

  const handleSubmit = () => {
    props.contact_message({firstname: values.firstname, lastname: values.lastname, email: values.email, message: values.message});
  };

  const handleClose = () => {
    setNotif(false);
  };

  return (
    <div className={classes.pageWrap}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key="top right"
        open={openNotif}
        autoHideDuration={4000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Message Sent</span>}
      />
      <Container maxWidth="md" className={classes.innerWrap}>
        <IconButton href={routeLink.hosting.home} className={classes.backtohome} style={{color: '#fff'}}>
          <i className="ion-ios-home-outline" />
          <i className="ion-ios-arrow-thin-left" />
        </IconButton>
        <Paper className={clsx(classes.formBox, 'fragment-fadeUp')}>
          <div className={classes.fullFromWrap}>
            <Typography
              variant="h3"
              align="center"
              className={clsx(classes.title, text.title)}
              gutterBottom
            >
              {t('common:contact_title2')}
            </Typography>
            <Typography className={clsx(classes.desc, text.subtitle2)}>
              {t('common:contact_subtitle')}
            </Typography>
            <div className={classes.form}>
              <ValidatorForm
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}
              >
                <Grid container spacing={6}>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className={classes.input}
                      label={t('common:form_firstname')}
                      onChange={handleChange('firstname')}
                      name="Firstname"
                      value={values.firstname}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className={classes.input}
                      label={t('common:form_lastname')}
                      onChange={handleChange('lastname')}
                      name="Lastname"
                      value={values.lastname}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      variant="outlined"
                      className={classes.input}
                      label={t('common:form_email')}
                      onChange={handleChange('email')}
                      name="Email"
                      value={values.email}
                      validators={['required', 'isEmail']}
                      errorMessages={['this field is required', 'email is not valid']}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      variant="outlined"
                      multiline
                      rows="6"
                      className={classes.input}
                      label={t('common:form_message')}
                      onChange={handleChange('message')}
                      name="Message"
                      value={values.message}
                    />
                  </Grid>
                </Grid>
                {/* <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={GOOGLE_RECAPTCHA_CLIENT_KEY}
                /> */}
                <div className={clsx(classes.btnArea, classes.flex)}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={check} onChange={(e) => handleCheck(e)} color="primary" value="check" />
                    }
                    label={(
                      <span>
                        {t('common:form_terms')}
                        <br />
                        <a href="#">
                          {t('common:form_privacy')}
                        </a>
                      </span>
                    )}
                  />
                  <Button variant="contained" fullWidth={isMobile} type="submit" color="secondary" size="large">
                    {t('common:form_send')}
                  </Button>
                </div>
              </ValidatorForm>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

Contact.propTypes = {
  t: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      contact_message: actions.contact_message,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(withTranslation(['common'])(Contact));
