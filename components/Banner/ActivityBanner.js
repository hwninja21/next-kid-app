import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { useTheme } from '@material-ui/core/styles';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import useStyles from './banner-style';

function ActivityBanner(props) {
  const classes = useStyles();
  const text = useText();
  const elem = useRef(null);

  // Media Query
  const theme = useTheme();

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
    <div className={classes.activityroot} ref={elem}>
      <Container maxWidth="md">
        <div className={classes.bannerWrap}>
          <div className={classes.text}>
          </div>
        </div>
      </Container>
    </div>
  );
}

ActivityBanner.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['hosting-landing'])(ActivityBanner);
