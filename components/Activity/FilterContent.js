import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Container, Chip, TextField } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import useStyles from './activity-style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';
import _ from '~/@lodash';

function FilterContent(props) {
  if (props.subjects === null) {
    props.get_subjects();
    return null;
  }
  if (props.languages === null) {
    props.get_languages();
    return null;
  }
  if (props.grades === null) {
    props.get_grades();
    return null;
  }

  const classes = useStyles();
  const text = useText();
  const elem = useRef(null);

  // Media Query
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Translation Function
  const { t, fsubject, fgrade, flanguage } = props;

  const [values, setValue] = useState({
  });

  const handleChangeSubject = (event, value) => {
    props.onChange("filter_subject", value);
  }

  const handleChangeGrade = (event, value) => {
    props.onChange("filter_grade", value);
  }

  const handleChangeLanguage = (event, value) => {
    props.onChange("filter_language", value);
  }

  return (
    <div>
      <Container maxWidth="lg">
        <div className={classes.text}>
            <Paper className={classes.filterContent}>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <h4>{t('hosting-landing:filter_subject')}</h4>
                  <Autocomplete
                    multiple
                    className="my-12"
                    id="subject-filter"
                    value={fsubject}
                    options={props.subjects.map((subject)=>subject.name)}
                    onChange={handleChangeSubject}
                    renderTags={(value, getTagProps) =>
                      value && value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Subjects"
                        fullWidth
                    />
                    )}
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <h4>{t('hosting-landing:filter_grade')}</h4>
                  <Autocomplete
                    multiple
                    className="my-12"
                    id="grade-filter"
                    value={fgrade}
                    options={props.grades.map((grade)=>grade.name)}
                    onChange={handleChangeGrade}
                    renderTags={(value, getTagProps) =>
                      value && value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Grades"
                        fullWidth
                    />
                    )}
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <h4>{t('hosting-landing:filter_language')}</h4>
                  <Autocomplete
                    multiple
                    className="my-12"
                    id="language-filter"
                    value={flanguage}
                    options={props.languages.map((language)=>language.language)}
                    onChange={handleChangeLanguage}
                    renderTags={(value, getTagProps) =>
                      value && value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Languages"
                        fullWidth
                    />
                    )}
                  />

                </Grid>
              </Grid>
            </Paper>
        </div>
      </Container>
    </div>
  );
}

FilterContent.propTypes = {
  t: PropTypes.func.isRequired
};

function mapStateToProps({main})
{
    return {
        token         : main.auth.token,
        profile       : main.auth.profile,
        countries     : main.base.countries,
        languages     : main.base.languages,
        grades        : main.base.grades,
        subjects      : main.base.subjects
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      get_countries: actions.get_countries,
      get_languages: actions.get_languages,
      get_subjects: actions.get_subjects,
      get_grades: actions.get_grades
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['hosting-landing'])(FilterContent));
