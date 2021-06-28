import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Card, CardContent, Typography, Divider, Chip } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import useStyles from './activity-style';
import _ from '~/@lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';
import Utils from '~/utils/utils';
import Router from 'next/router';

function CardsContent(props) {
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

  // Media Query
  const theme = useTheme();

  // Translation Function
  const { t, data } = props;

  const [values, setValue] = useState({
  });

  const renderCards = () => {
    return (
      <Grid container spacing={3}>
      {data && data.map((entity) => {
        var bgcolor = Utils.randomMatColor();
        var fg_access = !(props.token === null && entity.activity_type !== "Public");
        var gradeIdx = _.findIndex(props.grades, {_id: parseInt(entity.gradeid)});
        var subjectIdx = _.findIndex(props.subjects, {_id: parseInt(entity.subjectid)});
        return (
          <Grid key={entity._id} item md={3} xs={12}>
            <Card 
              variant="outlined"
              style={{borderColor: props.subjects[subjectIdx].color}}
              className={fg_access ? classes.activityCardContent : classes.disableCardContent}
              onClick={(ev) => {
                ev.preventDefault();
                if (!fg_access) {
                  props.showMessage({message: t('hosting-landing:disabled_card_alert')});
                }
                else {
                  var url = '/activity/' + props.subjects[subjectIdx].name + '/' + props.grades[gradeIdx].name + '/' + entity.activity_name;
                  Router.push(url);
                }
              }}
            >
              <div className={classes.bgimageContent} style={{backgroundImage: `url(${entity.bgimage_url ? entity.bgimage_url : '/static/images/samplebg.jpg'})`}}></div>
              <CardContent>
                <Typography className={classes.cardTitle} style={{backgroundColor: props.grades[gradeIdx].color}} gutterBottom>
                  {entity.activity_name}
                </Typography>
                <Typography className={classes.descriptionText} variant="body2" component="p" style={{wordWrap: 'break-word'}}>
                  {entity.description.slice(0, 80) + ' ...'}
                </Typography>

                <Divider />

                <div className={classes.tagContent}>
                {entity.tags && entity.tags.map((tag) => 
                  <Chip style={{margin: 2}} variant="outlined" label={tag} key={tag}/>
                )}
                </div>

              </CardContent>
            </Card>
          </Grid>
        )
      })}
      </Grid>
    )
  }

  return (
    <div>
      <Container maxWidth="lg" className={classes.cardsContent}>
        {renderCards()}
      </Container>
    </div>
  );
}

CardsContent.propTypes = {
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
      get_grades: actions.get_grades,
      showMessage: actions.showMessage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['hosting-landing'])(CardsContent));
