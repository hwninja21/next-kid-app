import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import _ from '~/@lodash';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import useStyles from './promotion-style';
import img from '~static/images/imgAPI';
import Router from 'next/router';
import api from '~/config/ApiConfig.js'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';

function LandingContent(props) {
    if (props.subjects === null) {
        props.get_subjects();
        return null;
    }
    if (props.grades === null) {
        props.get_grades();
        return null;
    }

    const classes = useStyles();
    const text = useText();
    const { t } = props;

    const [values, setValue] = useState({
        activities: []
    });

    useEffect(() => {
        props.subjects && props.subjects.map((subject) =>{
        api.post('data/get-filtered-activities', {search: "", rowsPerPage: 4, page: 0, filter_subject: [subject._id], filter_grade: [], filter_language: []})
            .then((res) => {
                var activities = values.activities;
                activities.push(res.data.doc);
                setValue({...values, activities});
            })
        })
    }, []);

    const handleSearch = val => {
        Router.push('/activity?search=&subjects=' + JSON.stringify([val]) + '&grades=[]&languages=[]&rows=12&page=0');
    }

    const handleClick = act => ev => {
        ev.preventDefault();
        var fg_access = !(props.token === null && act.activity_type !== "Public");
        var gradeIdx = _.findIndex(props.grades, {_id: parseInt(act.gradeid)});
        var subjectIdx = _.findIndex(props.subjects, {_id: parseInt(act.subjectid)});
        if (!fg_access) {
            props.showMessage({message: t('hosting-landing:disabled_card_alert')});
          }
          else {
            var url = '/activity/' + props.subjects[subjectIdx].name + '/' + props.grades[gradeIdx].name + '/' + act.activity_name;
            Router.push(url);
          }
    }

    const renderActivityContent = idx => {
        var acts = values.activities[idx];
        return (
            <Grid container spacing={6}>
                {acts && acts.map((act) => {
                    return (
                        <Grid item xs={12} md={3} sm={6} key={act._id} className={classes.gridCont} onClick={handleClick(act)}>
                            <img className={classes.imageCont} src={act.bgimage_url ? act.bgimage_url : '/static/images/samplebg.jpg'} alt="bgimage" />
                            <Typography className={classes.nameText} style={{color: img.textColor[idx]}}>{act.activity_name}</Typography>
                            <Typography className={classes.copyrightText} style={{color: img.textColor[idx]}}>Copyright @ Maestrokids</Typography>
                        </Grid>
                    )
                })}
            </Grid>
        )
    }

    return (
        <div className={classes.landingContent}>
        {
            props.subjects && props.subjects.map((subject, idx) => {
                return values.activities[idx] && values.activities[idx].length > 0 && (
                    <div key={idx} style={{background: `url(${img.landing[idx]}) no-repeat 50% 0`, backgroundSize: 'cover'}}>
                        <Container maxWidth="lg">
                            <Typography className={classes.subjectHeader} style={{color: img.landingColor[idx]}}>{subject.name}</Typography>
                            {renderActivityContent(idx)}
                            <div style={{textAlign: 'center', paddingTop: 10, paddingBottom: 20}}>
                                <Button variant="contained" size="large" color="secondary" onClick={(ev) => {
                                    ev.preventDefault();
                                    handleSearch(subject.name)
                                }}><img src="/static/images/icon2.png" alt="icon2" />{t('hosting-landing:search')}</Button>
                            </div>
                        </Container>
                    </div>
                )
            })
        }
        </div>
    );
}

LandingContent.propTypes = {
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
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        get_subjects: actions.get_subjects,
        get_grades: actions.get_grades,
        showMessage: actions.showMessage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['hosting-landing'])(LandingContent));
