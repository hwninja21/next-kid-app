import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withTranslation } from '~/i18n';
import routeLink from '~/static/text/link';
import useStyles from './header-style';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';

function MobileMenu(props) {
  const classes = useStyles();
  const { toggleDrawer, open, t } = props;

  const handleLogout = (event) => {
    props.deauthenticate();
  }

  const SideList = () => (
    <div
      className={classes.mobileNav}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <div className={clsx(classes.menu, open && classes.menuOpen)}>
        <List component="nav">
          <ListItem
            button
            component="a"
            href={routeLink.hosting.home}
            style={{ animationDuration: 0.75 + 's' }}
          >
            <ListItemText primary={t('hosting-landing:header_home')} className={classes.menuList} />
          </ListItem>
          <ListItem
            button
            component="a"
            href={routeLink.hosting.activity}
            style={{ animationDuration: 0.75 + 's' }}
          >
            <ListItemText primary={t('hosting-landing:header_activity')} className={classes.menuList} />
          </ListItem>
          <ListItem
            button
            component="a"
            href={routeLink.hosting.aboutus}
            style={{ animationDuration: 0.75 + 's' }}
          >
            <ListItemText primary={t('hosting-landing:header_aboutus')} className={classes.menuList} />
          </ListItem>
          <ListItem
            button
            component="a"
            href={routeLink.hosting.donateus}
            style={{ animationDuration: 0.75 + 's' }}
          >
            <ListItemText primary={t('hosting-landing:header_donateus')} className={classes.menuList} />
          </ListItem>
          <ListItem
            button
            component="a"
            href={routeLink.hosting.contact}
            style={{ animationDuration: 0.75 + 's' }}
          >
            <ListItemText primary={t('hosting-landing:header_contact')} className={classes.menuList} />
          </ListItem>
          <Divider className={classes.dividerSidebar} />
          {props.token === null && ['login', 'register'].map((item, index) => (
            <ListItem
              button
              component="a"
              href={routeLink.hosting[item]}
              key={index.toString()}
              style={{ animationDuration: 0.75 + 's' }}
            >
              <ListItemText primary={t('hosting-landing:header_' + item)} className={classes.menuList} />
            </ListItem>
          ))}
          {props.token !== null && 
            <ListItem
              button
              component="a"
              style={{ animationDuration: 0.75 + 's' }}
              onClick={ handleLogout }
            >
              <ListItemText primary={t('hosting-landing:header_logout')} className={classes.menuList} />
            </ListItem>
          }
        </List>
      </div>
    </div>
  );

  return (
    <SwipeableDrawer
      open={open}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
      classes={{
        paper: classes.paperNav
      }}
    >
      <SideList />
    </SwipeableDrawer>
  );
}


MobileMenu.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps({main})
{
    return {
        token         : main.auth.token,
        profile       : main.auth.profile,
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      reauthenticate: actions.reauthenticate,
      deauthenticate: actions.deauthenticate,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['hosting-landing'])(MobileMenu));
