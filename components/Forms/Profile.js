import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Button, Typography} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';
import Dropzone from 'react-dropzone';
import api from '../../config/ApiConfig';
import CircularProgress from '@material-ui/core/CircularProgress';

function ProfileForm(props) {
  if (props.token === null) {
    props.reauthenticate();
    props.get_countries();
    props.get_languages();
    return <div></div>
  }

  const classes = useStyles();
  const text = useText();
  const { t } = props;
  const [values, setValues] = useState({
    type: props.token.profiletype,
    firstname: props.profile.firstname,
    lastname: props.profile.lastname,
    schoolname: props.profile.schoolname,
    country: props.profile.country,
    language: props.profile.language,
    avatar: props.token.avatar,
    avatar_load: false,
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

  const handleSelectChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log('data submited');
  };

  const handleContinue = (event) => {
    const { update_profile } = props;
    event.preventDefault();
    update_profile(
      { email: props.token.email, profiletype: values.type, firstname: values.firstname, lastname: values.lastname,
        schoolname: values.schoolname, country: values.country, language: values.language, avatar: values.avatar }
    );
  };

  const handleDrop = (acceptedFiles, rejectedFiles) => {
    let file = acceptedFiles[0]
    const formData = new FormData()

    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    setValues({ ...values, avatar_load: true });
    return api.post("/upload", formData, config)
        .then(res => {
            setValues({ ...values, avatar: res.data.file, avatar_load: false });
          })
  }


  return (
    <AuthFrame title={t('common:register_title')} subtitle={t('common:register_subtitle')}>
      <div>
        <div className={classes.head}>
        <Typography align="left" className={classes.titleText}>
          {t('common:profile_title')}
        </Typography>
        </div>
        <ValidatorForm
          onError={errors => console.log(errors)}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{width: 122, height: 120}}>
              <Dropzone onDrop={handleDrop} >
                {({getRootProps, getInputProps, isDragActive}) => {
                return (
                    <div
                    {...getRootProps()}
                    >
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <div style={{border: "solid 1px #aaa", width: 120, height: 120}}>
                            <i className="mt-40 fa fa-plus text-blue text-40 align-middle"></i>
                            <p className="text-14 mt-12 text-white">Drop here...</p>
                        </div> :
                        <div style={{border: "solid 1px #aaa", width: 122, height: 122, borderRadius:3}}>
                          <CameraAltIcon style={{position:"absolute", zIndex:9, margin:4, border:"solid 1px #fff", color: "#fff", borderRadius:2}} />
                          {values.avatar_load === true &&
                            <CircularProgress style={{zIndex: 9, position:"absolute", margin: 'auto'}} disableShrink />
                          }
                          {values.avatar_load === false && (values.avatar === undefined || values.avatar === null || values.avatar.length === 0) &&
                            <img width={120} height={120} alt="avatar" src="/static/images/avatars/pp_boy.svg" />
                          }
                          {values.avatar_load === false && (values.avatar !== undefined && values.avatar !== null && values.avatar.length > 0) &&
                            <img width={120} height={120} alt="avatar" src={values.avatar} />
                          }
                        </div>
                    }
                    </div>
                )
                }}
              </Dropzone>
            </div>
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
                label={t('common:register_school_name')}
                onChange={handleChange('schoolname')}
                name="schoolname"
                value={values.schoolname}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formSelectControl} fullWidth>
                <InputLabel id="lcountry">{t('common:profile_country')}</InputLabel>
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
                <InputLabel id="llanguage">{t('common:profile_language')}</InputLabel>
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
            <Grid item xs={12}>
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">{t('common:register_account_type')}</FormLabel> */}
                <RadioGroup aria-label="gender" name="gender1" value={values.type} onChange={handleChange('type')}>
                  <FormControlLabel style={{color: '#fff'}} value="Teacher" control={<Radio />} label={t('common:register_teacher')} />
                  <FormControlLabel style={{color: '#fff'}} value="Parent" control={<Radio />} label={t('common:register_parent')} />
                </RadioGroup>
              </FormControl>
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


ProfileForm.propTypes = {
  t: PropTypes.func.isRequired
};

function mapStateToProps({main})
{
    return {
        token         : main.auth.token,
        profile       : main.auth.profile,
        countries     : main.base.countries,
        languages     : main.base.languages
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      reauthenticate: actions.reauthenticate,
      update_profile: actions.update_profile,
      get_countries: actions.get_countries,
      get_languages: actions.get_languages
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['common'])(ProfileForm));
