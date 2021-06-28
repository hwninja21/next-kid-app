import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import useStyles from './aboutus-style';
import brand from '~/static/text/brand';
import Router from 'next/router';

function Aboutus(props) {
  const classes = useStyles();
  const text = useText();
  const elem = useRef(null);

  // Media Query
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Translation Function
  const { t } = props;

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={elem}>
      <section className={classes.container}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <h1 className={classes.ttU}>{t('hosting-landing:welcome_to')}<span className={classes.orngText}>{t('hosting-landing:maestrokids')}</span></h1>
              <h3>{t('hosting-landing:welcome_subtitle')}</h3>
              <p>{t('hosting-landing:welcome_description1')}</p>
              <p>{t('hosting-landing:welcome_description2')}</p>
            </Grid>
            <Grid item md={4} xs={12}>
              <img className={classes.childImage} src="/static/images/img22.jpg" alt="child"/>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={classes.needContainer}>
        <Container maxWidth="lg">
          <h1 className={classes.needMore}>{t('hosting-landing:need_more_info')}</h1>
          <p className={classes.needMoreDesc}>{t('hosting-landing:need_more_description')}</p>
          <Button className={classes.callBut} variant="contained" color="secondary"><img src="/static/images/call.png" alt="call" />{brand.hosting.phone}</Button>
        </Container>
      </section>

      <section className={classes.container}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item md={6} xs={12}>
              <h1 className={classes.meetHead}>{t('hosting-landing:meet_our_founder')}</h1>
              <div className={classes.commentText}>
                <p>{t('hosting-landing:founder_text')}</p>
              </div>
              <div className={classes.imageCont}>
                <img className={classes.avatarImg} src="/static/images/author.jpg" alt="author" />
                <div>
                  <Typography>Johne Doe</Typography>
                  <p>CEO & Founder - Dhoom Inc</p>
                  <Rating value={5} readOnly size="small" />
                </div>
              </div>
            </Grid>

            <Grid item md={6} xs={12}>
              <h1 className={classes.meetHead}>{t('hosting-landing:words_from_parents')}</h1>
              <div className={classes.commentText}>
                <p>{t('hosting-landing:parent_text')}</p>
              </div>
              <div className={classes.imageCont}>
                <img className={classes.avatarImg} src="/static/images/author.jpg" alt="author" />
                <div>
                  <Typography>Johne Doe</Typography>
                  <p>CEO & Founder - Dhoom Inc</p>
                  <Rating value={5} readOnly size="small" />
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={classes.contactContainer}>
        <Container maxWidth="lg">
          <h1 className={classes.needMore}>{t('hosting-landing:contact_us_head')}</h1>
          <Button className={classes.contactBut} variant="contained" color="secondary" onClick={(ev)=>{
            ev.preventDefault();
            Router.push('/contact');
          }} >{t('hosting-landing:contact_us_button')}</Button>
        </Container>
      </section>
    </div>
  );
}

Aboutus.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['hosting-landing'])(Aboutus);
