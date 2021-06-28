import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import useStyles from './activity-style';
import _ from '~/@lodash';

function ActivityTimer(props) {
  const classes = useStyles();
  const text = useText();

  // Media Query
  const theme = useTheme();

  // Translation Function
  const { t } = props;
  const [values, setValue] = useState({
    elapsed: 0
  });

  var timer = null;

  useEffect(() => {
    timer = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])

  const tick = () => {
    setValue({...values, elapsed: Math.round((new Date().getTime() - props.startTime.getTime()) / 1000)});
  }

  return (
    <div className={classes.timerContent}>
      <Typography className={classes.questionAnswer} style={{backgroundColor: '#8cc713'}}>{t('hosting-landing:question_answered')}</Typography>
      <Typography className={classes.answers}>{props.questions}</Typography>
      <Typography className={classes.questionAnswer} style={{backgroundColor: '#1fb2e4'}}>{t('hosting-landing:time_elapsed')}</Typography>
      <Typography className={classes.answers}>{Math.round(values.elapsed / 60)} : {(values.elapsed % 60)}</Typography>
      <Typography className={classes.questionAnswer} style={{backgroundColor: '#e76836'}}>{t('hosting-landing:correct_answers')}</Typography>
      <Typography className={classes.answers}>{props.correct}</Typography>
    </div>
  );
}

ActivityTimer.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['hosting-landing'])(ActivityTimer);
