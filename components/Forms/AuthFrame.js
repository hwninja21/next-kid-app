import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import routerLink from '~/static/text/link';
import logo from '~/static/images/logo.png';
import { useText } from '~/theme/common';
import useStyles from './form-style';

function AuthFrame(props) {
  const classes = useStyles();
  const text = useText();
  const { children, title, subtitle } = props;
  return (
    <div className={classes.pageWrap}>
      <Hidden mdUp>
        <div className={clsx(classes.logo, classes.logoHeader)}>
          <a href={routerLink.hosting.home}>
            <img style={{width: '120px'}} src={logo} alt="logo" />
          </a>
        </div>
      </Hidden>
      <Container maxWidth="lg" className={classes.innerWrap}>
        <Paper className={clsx(classes.formBox, 'fragment-fadeUp')}>
          {props.isverification === undefined &&
          <IconButton href={routerLink.hosting.home} className={classes.backtohome}>
            <i className="ion-ios-home-outline" />
            <i className="ion-ios-arrow-thin-left" />
          </IconButton>
          }
          <div className={classes.authFrame}>
            <Grid container spacing={0}>
              <Grid item md={5} xs={12}>
                <Hidden smDown>
                  <div className={classes.greeting}>
                    <div className={classes.logo}>
                      <img style={{width: '120px'}} src={logo} alt="logo" />
                    </div>
                    <Typography gutterBottom variant="h4" className={classes.titleFont}>
                      { title }
                    </Typography>
                    <Typography variant="h6" className={text.paragraph}>
                      { subtitle }
                    </Typography>
                  </div>
                </Hidden>
              </Grid>
              <Grid item md={7} xs={12}>
                <div className={classes.formWrap}>
                  {children}
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

AuthFrame.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

AuthFrame.defaultProps = {
  subtitle: '',
};

export default AuthFrame;
