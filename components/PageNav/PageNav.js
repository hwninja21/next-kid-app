import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Fab from '@material-ui/core/Fab';
import ArrowIcon from '@material-ui/icons/ArrowUpward';
import Tooltip from '@material-ui/core/Tooltip';
import { withTranslation } from '~/i18n';
import useStyles from './pagenav-style';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <AnchorLink to={props.to} {...props} />; // eslint-disable-line
});

function PageNav(props) {
  const { t } = props;
  const [show, setShow] = useState(false);
  let flagShow = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagShow = (scroll > 500);
    if (flagShow !== newFlagShow) {
      setShow(newFlagShow);
      flagShow = newFlagShow;
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  const classes = useStyles();
  return (
    <div className={clsx(classes.pageNav, show && classes.show)}>
      <Tooltip
        title="To Top"
        placement="left"
        classes={{
          tooltip: classes.tooltip
        }}
      >
        <Fab
          color="primary"
          aria-label="To top"
          component={LinkBtn}
          href="#home"
          className={classes.fab}
        >
          <ArrowIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

PageNav.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation(['hosting-landing'])(PageNav);
