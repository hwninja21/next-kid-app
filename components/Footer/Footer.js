import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import logo from '~/static/images/logo.png';
import brand from '~/static/text/brand';
import { i18n, withTranslation } from '~/i18n';
import useStyles from './footer-style';

function Copyright() {
  return (
    <Typography variant="body2" display="block" color="textSecondary">
      &copy;&nbsp;
      {brand.hosting.footerText}
    </Typography>
  );
}

function Footer(props) {
  const classes = useStyles();
  const { t } = props;
  const [values, setValues] = useState({
    lang: 'en',
  });

  useEffect(() => {
    setValues({ lang: i18n.language });
  }, []);

  return (
    <div className={classes.footerContent}>
      <Container fixed component="footer" className={classes.footer}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={10}>
            <div className={classes.logo}>
              <img src={logo} alt="logo" />
              <Copyright />
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={classes.socmed}>
              <IconButton aria-label="FB" className={classes.margin} size="small">
                <i className="ion-social-twitter" />
              </IconButton>
              <IconButton aria-label="TW" className={classes.margin} size="small">
                <i className="ion-social-facebook" />
              </IconButton>
              <IconButton aria-label="IG" className={classes.margin} size="small">
                <i className="ion-social-google" />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Footer.propTypes = {
  t: PropTypes.func.isRequired,
  toggleDir: PropTypes.func,
};

Footer.defaultProps = {
  toggleDir: () => {},
};

export default withTranslation(['hosting-landing'])(Footer);
