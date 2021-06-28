import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from '~/i18n';
import useStyles from './error-style';

function Error(props) {
  const classes = useStyles();
  const { errCode, text, t } = props;
  return (
    <div className={classes.errorWrap}>
      <Container maxWidth="md">
        <p>
          <a href="/">
            <img className={classes.logoImage} src="/static/images/logo.png" alt="logo" />
          </a>
        </p>
        <p>
          <img className={classes.errorImage} src="/static/images/error-page.png" alt="error-page" />
        </p>
      </Container>
    </div>
  );
}

Error.propTypes = {
  errCode: PropTypes.string,
  text: PropTypes.string,
  t: PropTypes.func.isRequired
};

Error.defaultProps = {
  errCode: '404',
  text: '',
};

export default withTranslation(['common'])(Error);
