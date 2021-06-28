import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, useMediaQuery, Button, Paper, TextField, Table, TableBody, TablePagination, TableRow } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import useStyles from './activity-style';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';
import FilterContent from './FilterContent';
import CardsContent from './CardsContent';

function ActivityContent(props) {
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
  const { t } = props;

  const [values, setValue] = useState({
    name: props.search === undefined ? '' : props.search,
    rowsPerPage: (props.rowsPerPage === undefined || props.rowsPerPage.length === 0) ? 12 : parseInt(props.rowsPerPage),
    page: (props.page === undefined || props.page.length === 0) ? 0 : parseInt(props.page),
    filter: false,
    filter_subject: (props.fsubjects === undefined || props.fsubjects.length === 0) ? [] : JSON.parse(props.fsubjects),
    filter_grade: (props.fgrades === undefined || props.fgrades.length === 0) ? [] : JSON.parse(props.fgrades),
    filter_language: (props.flanguages === undefined || props.flanguages.length === 0) ? [] : JSON.parse(props.flanguages),
  });

  const [hide, setHide] = useState(false);

  const handleScroll = () => {
    if (!elem.current) {
      return;
    }
    const doc = document.documentElement;
    const elTop = elem.current.offsetTop - 200;
    const elBottom = elTop + elem.current.getBoundingClientRect().height;
    if (doc.scrollTop > elTop && doc.scrollTop < elBottom) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  const loadActivities = (val) => {
    var subjects = [];
    val.filter_subject.map((cur) => {
      var idx = _.findIndex(props.subjects, {name: cur});
      subjects.push(props.subjects[idx]._id);
    })
  
    var grades = [];
    val.filter_grade.map((cur) => {
      var idx = _.findIndex(props.grades, {name: cur});
      grades.push(props.grades[idx]._id);
    })
  
    var languages = [];
    val.filter_language.map((cur) => {
      var idx = _.findIndex(props.languages, {language: cur});
      languages.push(props.languages[idx].code);
    })
  
    props.get_filtered_activities({search: val.name, rowsPerPage: val.rowsPerPage, page: val.page, filter_subject: subjects, filter_grade: grades, filter_language: languages});
  }

  useEffect(() => {  
    loadActivities(values);
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleChange = type => event => {
    setValue({ ...values, [type]: event.target.value });
  };

  const handleFilter = () => {
    setValue({ ...values, filter: !values.filter });
  }

  const handleSearch = (ev) => {
    ev.preventDefault();
    if (values.name.length > 0)
      Router.push('/activity?search=' + values.name + '&subjects=' + JSON.stringify(values.filter_subject) + '&grades=' + JSON.stringify(values.filter_grade) + '&languages=' + JSON.stringify(values.filter_language) + '&rows=' + values.rowsPerPage + '&page=' + values.page);
    else
      Router.push('/activity');
    loadActivities(values);
  }

  const handleFilterChange = (name, value) => {
    var newValue = { ...values, [name]: value };
    Router.push('/activity?search=' + newValue.name + '&subjects=' + JSON.stringify(newValue.filter_subject) + '&grades=' + JSON.stringify(newValue.filter_grade) + '&languages=' + JSON.stringify(newValue.filter_language) + '&rows=' + newValue.rowsPerPage + '&page=' + newValue.page);
    loadActivities(newValue);
    setValue(newValue);
  }

  const handleChangePage = (event, newPage) => {
    var newValue = { ...values, page: newPage };
    Router.push('/activity?search=' + newValue.name + '&subjects=' + JSON.stringify(newValue.filter_subject) + '&grades=' + JSON.stringify(newValue.filter_grade) + '&languages=' + JSON.stringify(newValue.filter_language) + '&rows=' + newValue.rowsPerPage + '&page=' + newValue.page);
    loadActivities(newValue);
    setValue(newValue)
  }

  const handleChangeRowsPerPage = (event) => {
    var newValue = { ...values, rowsPerPage: parseInt(event.target.value), page: 0 };
    Router.push('/activity?search=' + newValue.name + '&subjects=' + JSON.stringify(newValue.filter_subject) + '&grades=' + JSON.stringify(newValue.filter_grade) + '&languages=' + JSON.stringify(newValue.filter_language) + '&rows=' + newValue.rowsPerPage + '&page=' + newValue.page);
    loadActivities(newValue);
    setValue(newValue)
  }

  var pagedata = props.activities;

  return (
    <div>
      <Container maxWidth="lg">
        <div className={classes.text}>
            <form onSubmit={handleSearch}>
                <Paper className={classes.searchDomain}>
                    <Autocomplete
                      id="search-autocomplete"
                      options={props.activities ? props.activities.map(activity => activity.activity_name) : []}
                      value={values.name || ""}
                      onInputChange={(event, value) => {
                        setValue({...values, name: value });
                      }}
                      renderInput={params => (
                      <TextField {...params}
                          className={classes.search}
                          label={t('hosting-landing:banner_button')}
                          fullWidth
                      />
                      )}
                      freeSolo
                    />

                    <div className={classes.search_action}>
                      <Button className={classes.button} variant="contained" color="primary" onClick={handleSearch} type="submit">
                          <SearchIcon className={classes.icon} />
                          {isDesktop && t('hosting-landing:banner_button')}
                      </Button>
                    </div>
                    <div className={classes.action}>
                      <Button className={classes.button} variant="contained" color="primary" onClick={handleSearch} onClick={handleFilter}>
                          {values.filter === true && <ExpandLessIcon />}
                          {values.filter === false && <ExpandMoreIcon />}
                          {isDesktop && t('hosting-landing:banner_filter')}
                      </Button>
                    </div>
                </Paper>
            </form>
        </div>
        
        {values.filter === true &&
          <FilterContent 
            fsubject={values.filter_subject ? values.filter_subject : []}
            fgrade={values.filter_grade ? values.filter_grade : []}
            flanguage={values.filter_language ? values.filter_language : []}
            onChange={handleFilterChange}
          />
        }

        <CardsContent data={pagedata} />

        <Table>
          <TableBody><TableRow>
            <TablePagination
              className="w-full float-right"
              rowsPerPageOptions={[8, 12, 24, { label: 'All', value: -1 }]}
              colSpan={3}
              count={props.count ? props.count : 0}
              rowsPerPage={values.rowsPerPage}
              page={values.page}
              SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow></TableBody>
        </Table>

      </Container>
    </div>
  );
}

ActivityContent.propTypes = {
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
      subjects      : main.base.subjects,
      activities    : main.data.activities,
      count         : main.data.count
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      get_filtered_activities: actions.get_filtered_activities,
      get_languages: actions.get_languages,
      get_subjects: actions.get_subjects,
      get_grades: actions.get_grades
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['hosting-landing'])(ActivityContent));
