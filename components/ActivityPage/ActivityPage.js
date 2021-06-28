import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import _ from '~/@lodash';
import { Container, useMediaQuery, Chip, Paper, Grid, IconButton, Typography, Avatar, Divider, List, ListItem, ListItemText, Dialog, 
  DialogTitle, DialogContent, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useTheme } from '@material-ui/core/styles';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import useStyles from './activity-style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';
import SimilarContent from '../Activity/SimilarContent';
import Rating from '@material-ui/lab/Rating';
import ComponentContainer from '~/dynamic/ComponentContainer';
import { Carousel } from 'react-responsive-carousel';
import Utils from '~/utils/utils';
import Slider from 'react-animated-slider';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';
import Axios from 'axios';
import ActivityTimer from '../Activity/ActivityTimer';

function ActivityPage(props) {
  if (props.countries === null) {
    props.get_countries();
    return null;
  }
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Translation Function
  const { t } = props;

  const [values, setValue] = useState({
    isFull: false,
    rating: 0,
    message: '',
    questions: 0,
    correct: 0,
    startTime: new Date()
  });

  const [hide, setHide] = useState(false);

  const handleClose = () => {
    setValue({...values, isFull: false});
  }

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

  useEffect(() => {
    props.get_filtered_activities({search: "", rowsPerPage: -1, page: 0, filter_subject: [], filter_grade: [], filter_language: []});
    window.addEventListener('scroll', handleScroll);
  }, []);

  var gradeIdx = _.findIndex(props.grades, {name: props.grade});
  var subjectIdx = _.findIndex(props.subjects, {name: props.subject});
  var idx = _.findIndex(props.activities, {subjectid: props.subjects[subjectIdx]._id, gradeid: props.grades[gradeIdx]._id, activity_name: props.activity});
  if (idx === -1) {
    return null;
  }
  var data = props.activities[idx];
  var fg_access = !(props.token === null && data.activity_type !== "Public");

  if (!fg_access) {
    props.showMessage({message: t('hosting-landing:disabled_card_alert')});
    return null;
  }

  if (props.activity_files === null) {
    props.get_activity_files_by_id(data._id);
    return null;
  }

  if (props.activity_comments === null) {
    props.get_activity_comments_by_id(data._id);
    return null;
  }

  if (props.activity_results === null && props.token !== null) {
    props.get_activity_result({studentid: props.token._id, activityid: data._id});
    return null;
  }

  const handleDownload = (ev) => {
    ev.preventDefault();
    var zip = new JSZip();
    var count = 0;
    var zipFileName = data.activity_name + '.zip';
    var urls = props.activity_files ? props.activity_files.map((act) => act.url_json_file) : [];

    urls.forEach(url => {
      var filename = url.slice(42);
      Axios
        .get(url, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials":true,
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
          },
          responseType: "blob"
        }).then(response => {
          zip.file(filename, response.data, {binary:true});
          count ++;
          if (count == urls.length) {
            zip.generateAsync({type:'blob'}).then(function(content) {
              saveAs(content, zipFilename);
           });
          }
        }).catch(error => {
          console.log(error);
        });
    })
  }

  const renderSocialButtons = () => {
    const url = window.location.href
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    const twitterUrl = `https://twitter.com/home?status=${url}`
    const googleUrl = `https://plus.google.com/share?url=${url}`

    return (
        <div className={classes.flexContent}>
          <a href={facebookUrl} target="_blank" className={classes.socialBut}>
            <i className="ion-social-facebook" aria-hidden="true" />
          </a>
          <a href={twitterUrl} target="_blank" className={classes.socialBut}>
            <i className="ion-social-twitter" aria-hidden="true" />
          </a>
          <a href={googleUrl} target="_blank"className={classes.socialBut}>
            <i className="ion-social-google" aria-hidden="true" />
          </a>
          <IconButton style={{marginTop: theme.spacing(-1)}} onClick={()=>{
            setValue({...values, isFull: true})
            props.showMessage({message: t('hosting-landing:press_esc_to_escape')})
          }}>
            <FullscreenIcon fontSize="large" />
          </IconButton>
        </div>
    )
  }

  const handlePostComment = (ev) => {
    ev.preventDefault();
    if (props.token === null) {
      props.showMessage({message: 'You should login to post comment.'});
    }
    else {
      if (values.message.length > 0) {
          props.add_activity_comment({activityid: data._id, accountid: props.token._id, comments: values.message, rating: values.rating, like: 0, dislike: 0});
      }
    }
  }

  const renderPostComment = () => {
    return (
      <div style={{paddingBottom: theme.spacing(5)}}>
        <Rating id="post-rating" name="post-rating" value={values.rating} onChange={(ev) => {
          ev.preventDefault();
          setValue({...values, rating: parseInt(ev.target.value)});
        }} />
        <TextField
          id="post-message"
          name="post-message"
          className={classes.postMessageField}
          variant="outlined"
          placeholder={t('hosting-landing:your_message')}
          rows={3}
          value={values.message}
          onChange={(ev) => {
            ev.preventDefault();
            setValue({...values, message: ev.target.value});
          }}
          fullWidth
          multiline
        />
        <Button variant="contained" color="primary" onClick={handlePostComment}>{t('hosting-landing:post')}</Button>
      </div>
    )
  }

  const renderComments = () => {
    return (
      <div className={classes.commentContent}>
        {props.activity_comments && props.activity_comments.map((comment) => {
          var created_at = new Date(comment.created_at);
          return (
            <div className={classes.commentPaper} key={comment._id}>
              <div className={classes.nameAvatar}>
                <div>
                {comment.avatar && comment.avatar.length > 0 &&
                  <Avatar src={comment.avatar} />
                }
                {(!comment.avatar || comment.avatar.length === 0) &&
                  <Avatar>{comment.firstname[0]}</Avatar>
                }
                </div>
                <h3 className={classes.commentAccName}>{comment.firstname + ' ' + comment.lastname}</h3>
              </div>

              <Typography variant="body2" component="h3" className={classes.commentText}>
                {comment.comments}
              </Typography>

              <div className={classes.flexContent}>
                <Rating value={comment.rating} readOnly/>
                <div>
                  <Typography className={classes.dateText}>{created_at.toUTCString()}</Typography>
                </div>
                <div className={classes.thumbContent}>
                  <ThumbUpIcon color="primary" />
                  <Typography className={classes.likeText}>+{comment.like}</Typography>
                </div>
                <div className={classes.thumbContent}>
                  <ThumbDownIcon color="action" />
                  <Typography className={classes.likeText}>+{comment.dislike}</Typography>
                </div>
              </div>

              <Divider style={{marginTop: theme.spacing(2)}} />
            </div>
          )
        })}

        {renderPostComment()}
      </div>
    )
  }

  const renderStatic = () => {
    var imageArr = [];
    {props.activity_files && props.activity_files.forEach((file, index) => {
      if (Utils.isImage(file.url_json_file)) {
        imageArr.push(file.url_json_file);
      }
    })}
    
    return (
      <div>
        <Paper elevation={3}>
          <List className={classes.listContent}>
          {props.activity_files && props.activity_files.length === 0 &&
            <ListItem disabled>
              <ListItemText>{t('hosting-landing:no_upload_data')}</ListItemText>
            </ListItem>
          }
          {props.activity_files && props.activity_files.map((file, index) => (
            <ListItem key={index} button onClick={() => {
              window.open(file.url_json_file, "_blank");
            }}>
              <ListItemText>{file.url_json_file}</ListItemText>
            </ListItem>
          ))
          }
          </List>
        </Paper>
        {imageArr.length > 0 && 
          <div className={classes.sliderWrap}>
            <Slider
              autoplay={5000}
              infinite={true}
              previousButton={
                <div></div>
              }
              nextButton={
                <div></div>
              }
            >
            {imageArr.map((file, index) => (
              <div key={index}>
                <img className={classes.carouselImage} src={file} alt="carousel-image" />
                <p className={classes.carouselText}>{file}</p>
              </div>
            ))}
            </Slider>
          </div>
        }
        <div className={classes.buttonContent}>
          <Button className={classes.downloadBut} onClick={handleDownload}>{t('hosting-landing:download')}</Button>
          <img className={classes.shareImg} src="/static/images/share-btn.png" alt="share-btn" />
          {renderSocialButtons()}
        </div>
        <div className={classes.descriptionContent}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={9} className={classes.borderPage}>
              <h3>{t('hosting-landing:description')}</h3>
              <Typography variant="body2" component="h3" style={{wordWrap: 'break-word'}}>
                {data.description}
              </Typography>
              <div className={classes.tagContent}>
              {data.tags && data.tags.map((tag) => 
                <Chip style={{margin: 2}} variant="outlined" label={tag} key={tag}/>
              )}
              </div>
              {renderComments()}
            </Grid>
            <Grid item xs={12} md={3} style={{position: 'relative'}}>
              <SimilarContent current={idx} value={false}/>
            </Grid>
          </Grid>

        </div>
      </div>
    )
  }

  const handeSubmitAnswer = (questionCnt, correctCnt) => {
    if (props.token === null) {
      props.showMessage({message: 'You should login to store result.'});
    }
    else {
      if (data.store_result === true) {
        props.update_activity_result({
          studentid: props.token._id,
          activityid: data._id,
          questions: values.questions + questionCnt,
          correct_answers: values.correct + correctCnt,
          start_time: values.startTime
        });
      }
    }
    setValue({...values, questions: values.questions + questionCnt, correct: values.correct + correctCnt});
  }

  const renderDynamic = () => {
    var params = JSON.parse(data.activity_params);

    if (params === null || params.component === undefined || params.component === null) {
      return (<div></div>)
    }

    let Component = ComponentContainer[params.component];
    return Component && (
      <div>
        <Grid container spacing={6}>
          <Grid item xs={12} md={9} className={classes.borderPage}>
            <Component params={params} handeSubmitAnswer={handeSubmitAnswer}/>
            {renderSocialButtons()}
            <div style={{marginTop: theme.spacing(2)}}>
              <Typography variant="body2" component="h3" style={{wordWrap: 'break-word', marginLeft: theme.spacing()}}>
                {data.description}
              </Typography>
              <div className={classes.tagContent}>
              {data.tags && data.tags.map((tag) => 
                <Chip style={{margin: 2}} variant="outlined" label={tag} key={tag}/>
              )}
              </div>
            </div>
            {isMobile && data.store_result === true && 
              <ActivityTimer questions={values.questions} correct={values.correct} startTime={values.startTime} />}
            {isMobile === true && 
              <SimilarContent current={idx} value={!data.store_result}/> }
            {renderComments()}
          </Grid>
          <Grid item xs={12} md={3} style={{position: 'relative'}}>
            {isMobile === false && 
              <SimilarContent current={idx} value={!data.store_result}/> }
            {isMobile === false && data.store_result === true && 
              <ActivityTimer questions={values.questions} correct={values.correct} startTime={values.startTime} /> }
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div className={classes.topDiv}>
      <Container maxWidth="lg" className={classes.pageContent}>
        <h1 className={classes.headerText}>{data.activity_name}</h1>

      {data.type === 'Dynamic' && values.isFull === false &&
        renderDynamic()
      }
      {data.type === 'Static' && values.isFull === false &&
        renderStatic()
      }

      {values.isFull === true &&
        <Dialog open={values.isFull} onClose={handleClose} fullScreen>
          <DialogContent>
            <Container maxWidth="md">
            {data.type === 'Dynamic' && 
              renderDynamic()
            }
            {data.type === 'Static' && 
              renderStatic()
            }
            </Container>
        </DialogContent>
        </Dialog>
      }
      </Container>
    </div>
  );
}

ActivityPage.propTypes = {
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
      activity_results : main.data.activity_results,
      activity_files    : main.data.activity_files,
      activity_comments    : main.data.activity_comments
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      get_filtered_activities: actions.get_filtered_activities,
      get_activity_files_by_id: actions.get_activity_files_by_id,
      add_activity_comment: actions.add_activity_comment,
      get_activity_comments_by_id: actions.get_activity_comments_by_id,
      get_countries: actions.get_countries,
      get_languages: actions.get_languages,
      get_subjects: actions.get_subjects,
      get_grades: actions.get_grades,
      update_activity_result: actions.update_activity_result,
      get_activity_result: actions.get_activity_result,
      showMessage: actions.showMessage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['hosting-landing'])(ActivityPage));
