import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Container, Grid, Divider, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import useStyles from './donateus-style';
import Router from 'next/router';
import StripeCheckout from 'react-stripe-checkout';
import { STRIPE_PUBLIC_KEY } from '~/config/ServerUrl';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';

function DonateUs(props) {
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
    // window.VANTA.NET({
    //   el: '#net_art',
    //   color: theme.palette.primary.main,
    //   backgroundColor: theme.palette.primary.light,
    //   backgroundAlpha: 0,
    //   points: 4.00,
    //   maxDistance: 18.00,
    //   spacing: 12.00
    // });
    window.addEventListener('scroll', handleScroll);
  }, []);

  const onToken = amount => token => {
    props.add_new_payment({
      profileid: props.profile === null ? -1 : props.profile._id,
      amount: amount,
      isdonation: true
    })
  }

  return (
    <div ref={elem}>
      <section className={classes.container}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <h1 className={classes.ttU}>{t('hosting-landing:make_donation_today')}</h1>

              <Grid container spacing={3} className={classes.donateGrid}>
                {props.payment_config && props.payment_config.map((config, idx) => 
                  <Grid item xs={12} sm={6} md={3} key={idx}>
                    <StripeCheckout
                      token={onToken(config.amount)}
                      amount={config.amount * 100}
                      currency={config.currency}
                      stripeKey={STRIPE_PUBLIC_KEY}
                    >
                      <Button variant="contained" color={!(idx % 2) ? "primary" : "secondary"} size="large" fullWidth>{config.amount} {config.currency}</Button>
                    </StripeCheckout>
                  </Grid>
                )}
              </Grid>
              <Divider />
            </Grid>
            <Grid item md={4} xs={12}>
              <img className={classes.childImage} src="/static/images/donate.jpg" alt="child"/>
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

DonateUs.propTypes = {
  t: PropTypes.func.isRequired
};

function mapStateToProps({main})
{
    return {
        token         : main.auth.token,
        profile       : main.auth.profile,
        payment_config: main.base.payment_config
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      add_new_payment: actions.add_new_payment,
      get_payment_configs: actions.get_payment_configs
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['hosting-landing'])(DonateUs));
