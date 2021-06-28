import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withTranslation } from '~/i18n';
import routeLink from '~/static/text/link';
import { useText } from '~/theme/common';
import SocialAuth from './SocialAuth';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';

function Register(props) {
  if (props.countries === null) {
    props.get_countries();
    props.get_languages();
    return <div></div>
  }

  const classes = useStyles();
  const text = useText();
  const { t } = props;
  const [values, setValues] = useState({
    // name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'Parent',
    firstname: '',
    lastname: '',
    schoolname: '',
    country: '',
    language: ''
  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== values.password) {
        return false;
      }
      return true;
    });
  });

  const [check, setCheck] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleCheck = event => {
    setCheck(event.target.checked);
  };

  const handleSubmit = () => {
    props.register(
      { email: values.email, password: values.password, profiletype: values.type, firstname: values.firstname, lastname: values.lastname,
        schoolname: values.schoolname, country: values.country, language: values.language }
    );
  };

  return (
    <AuthFrame title={t('common:register_title')} subtitle={t('common:register_subtitle')}>
      <div>
        <div className={classes.head}>
          <Typography align="left" className={classes.titleText}>
          {t('common:register')}
          </Typography>
          <Button size="small" className={classes.buttonLink} href={routeLink.hosting.login}>
            <Icon className={clsx(classes.icon, classes.signArrow)}>arrow_forward</Icon>
            <span className={classes.buttonLink}>
            {t('common:register_already')}
            </span>
          </Button>
        </div>
        <SocialAuth authtype="register"/>
        <div className={classes.separator}>
          <Typography style={{color: '#fff'}}>{t('common:register_or')}</Typography>
        </div>
        <ValidatorForm
          onError={errors => console.log(errors)}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup aria-label="gender" name="gender1" value={values.type} onChange={handleChange('type')} style={{flexWrap: 'nowrap', flexDirection: 'row'}}>
                  <FormControlLabel style={{color: '#fff'}} value="Parent" control={<Radio />} label={t('common:register_parent')} />
                  <FormControlLabel style={{color: '#fff'}} value="Teacher" control={<Radio />} label={t('common:register_teacher')} />
                </RadioGroup>
              </FormControl>
            </Grid>

          <Grid item md={6} xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t('common:register_firstname')}
                validators={['required']}
                onChange={handleChange('firstname')}
                errorMessages={['This field is required']}
                name="firstname"
                value={values.firstname}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t('common:register_lastname')}
                validators={['required']}
                errorMessages={['This field is required']}
                onChange={handleChange('lastname')}
                name="lastname"
                value={values.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t('common:register_email')}
                onChange={handleChange('email')}
                name="email"
                value={values.email}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
              />
            </Grid>
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
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
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t('common:register_school_name')}
                onChange={handleChange('schoolname')}
                name="schoolname"
                value={values.schoolname}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formSelectControl} fullWidth>
                <InputLabel style={{marginLeft: 4}} id="lcountry">{t('common:profile_country')}</InputLabel>
                <Select
                  id="country"
                  name="country"
                  value={values.country}
                  onChange={handleSelectChange}
                  fullWidth
                >
                  {props.countries && props.countries.map((country) => 
                      <MenuItem key={country.code} value={country.code}>{country.country}</MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formSelectControl} fullWidth>
                <InputLabel style={{marginLeft: 4}} id="llanguage">{t('common:profile_language')}</InputLabel>
                <Select
                  id="language"
                  name="language"
                  value={values.language}
                  onChange={handleSelectChange}
                  fullWidth
                >
                  {props.languages && props.languages.map((language) => 
                      <MenuItem key={language.code} value={language.code}>{language.language}</MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div className={classes.btnArea}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={check}
                  onChange={(e) => handleCheck(e)}
                  color="secondary"
                  value={check}
                  className={classes.check}
                />
              )}
              label={(
                <span className={text.caption}>
                  {t('common:form_terms')}
                  &nbsp;
                  <a href="#">
                    {t('common:form_privacy')}
                  </a>
                </span>
              )}
            />
            <Button variant="contained" fullWidth type="submit" color="secondary" size="large">
              {t('common:continue')}
            </Button>
          </div>
        </ValidatorForm>
      </div>
    </AuthFrame>
  );
}


Register.propTypes = {
  t: PropTypes.func.isRequired
};

function mapStateToProps({main})
{
    return {
        countries     : main.base.countries,
        languages     : main.base.languages
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      register: actions.register,
      get_countries: actions.get_countries,
      get_languages: actions.get_languages
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['common'])(Register));
