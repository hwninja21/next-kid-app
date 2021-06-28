import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Slide, Card, CardContent, Typography, Divider, Chip, IconButton, Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
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

function SimilarContent(props) {
  const classes = useStyles();
  const text = useText();

  // Media Query
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [values, setValue] = useState(props.value);

  // Translation Function
  const { t, current } = props;

  var data = [];

  props.activities.map((activity, idx) => {
    var diff = Utils.difference(activity, props.activities[current]);
    if (Object.keys(diff).length < 14 && idx !== current) {
      data.push(activity);
    }
  })

  return (
    <>
      {(isMobile === false && values === false) &&
        <div className={classes.absoluteRightPanel}>
          <Typography variant="body1" className={classes.vertical} onClick={()=>setValue(true)}>
            <IconButton>
              <ViewWeekIcon style={{color: '#fff', fontSize: 30}} />
            </IconButton>
            {t('hosting-landing:similar_activities')}
          </Typography>
        </div>
      }
      {(isMobile === true || values === true) &&
      <div className={classes.rightPanel}>
        <Slide direction="left" in={(isMobile === true || values === true)} mountOnEnter unmountOnExit>
          <Paper className={classes.paperSimilarContent}>
            <Typography variant="body1" style={{fontSize: 20, fontWeight: 600, color: '#555', cursor: 'pointer'}} onClick={() => setValue(false)}>
              <IconButton style={{fontSize: 30, color: '#555'}}>
                <ViewWeekIcon />
              </IconButton>
              {t('hosting-landing:similar_activities')}
            </Typography>
            <div style={{flexDirection: 'column', display: 'flex', width: '100%'}}>
            {data.length === 0 && 
              <Typography style={{fontSize: 20, fontWeight: 600, color: '#555', marginTop: theme.spacing()}}>None</Typography>
            }
            {data.slice(0, 3).map((entity) => {
              var bgcolor = Utils.randomMatColor();
              var fg_access = !(props.token === null && entity.activity_type !== "Public");
              var gradeIdx = _.findIndex(props.grades, {_id: parseInt(entity.gradeid)});
              var subjectIdx = _.findIndex(props.subjects, {_id: parseInt(entity.subjectid)});
              return (
                <div key={entity._id} style={{margin: theme.spacing()}} >
                  <Card 
                    variant="outlined"
                    style={{borderColor: bgcolor}}
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
                      <Typography className={classes.cardTitle} style={{backgroundColor: bgcolor}} gutterBottom>
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
                </div>
              )
            })}
            </div>
          </Paper>
        </Slide>
      </div>
      }
    </>
  );
}

SimilarContent.propTypes = {
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
      activities    : main.data.activities
    }
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({
    showMessage: actions.showMessage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['hosting-landing'])(SimilarContent));
