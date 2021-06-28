import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { withTranslation } from '~/i18n';
import brand from '~/static/text/brand';
import routeLink from '~/static/text/link';
import logo from '~/static/images/logo.png';
import '~/vendors/hamburger-menu.css';
import Settings from './Settings';
import MobileMenu from './MobileMenu';
import useStyles from './header-style';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/main';

function Header(props) {
  //auto login with cookie

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickName = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseName = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [fixed, setFixed] = useState(false);
  let flagFixed = false;
  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixed = (scroll > 100);
    if (flagFixed !== newFlagFixed) {
      setFixed(newFlagFixed);
      flagFixed = newFlagFixed;
    }
  };
  useEffect(() => {
    if (props.token === null) {
      props.reauthenticate();
    }
    if (props.countries === null) {
      props.get_countries();
    }
    if (props.subjects === null) {
      props.get_subjects();
    }
    if (props.languages === null) {
      props.get_languages();
    }
    if (props.grades === null) {
      props.get_grades();
    }
    if (props.payment_config === null) {
      props.get_payment_configs();
    }
  
    window.addEventListener('scroll', handleScroll);
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const {
    onToggleDark,
    onToggleDir,
    invert,
    t
  } = props;
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleLogout = (event) => {
    event.preventDefault();
    props.deauthenticate();
  }

  const UserAvatar = () => {
    if (props.token.avatar === undefined || props.token.avatar === null || props.token.avatar.length === 0)
      return <Avatar style={{backgroundColor: deepOrange[500]}} >{props.profile.firstname[0] + props.profile.lastname[0]}</Avatar>
    return <Avatar alt="avatar" src={props.token.avatar} />
  }
  
  return (
    <Fragment>
      { isMobile && (<MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />) }
      <AppBar
        component="div"
        position="relative"
        id="header"
        className={clsx(
          classes.header,
          fixed && classes.fixed,
          openDrawer && classes.openDrawer
        )}
      >
        <div className={classes.headerTop}>
          <Container fixed={isDesktop}>
            <div className={classes.logo}>
              { isMobile && (
                <IconButton
                  onClick={handleOpenDrawer}
                  className={clsx('hamburger hamburger--spin', classes.mobileMenu, openDrawer && 'is-active')}
                >
                  <span className="hamburger-box">
                    <span className={clsx(classes.bar, 'hamburger-inner')} />
                  </span>
                </IconButton>
              )}
              {invert ? (
                <a href={routeLink.hosting.home}>
                  <img src={logo} alt="logo" />
                  <span className={classes.brandText}>{brand.hosting.name}</span>
                </a>
              ) : (
                <AnchorLink href="#home">
                  <img src={logo} alt="logo" />
                  <span className={classes.brandText}>{brand.hosting.name}</span>
                </AnchorLink>
              )}
            </div>
            <nav className={classes.userMenu}>
              <Hidden mdDown>
                <PhoneIcon />
                {brand.hosting.phone}
                <Divider className={classes.divider} />
                {props.token === null &&
                  <Button href={routeLink.hosting.login}>
                    {t('hosting-landing:header_login')}
                  </Button>
                }
                {props.token !== null &&
                  <div>
                    <Button onClick={handleClickName}>
                      <UserAvatar />&nbsp;
                      {props.profile.firstname + ' ' + props.profile.lastname}
                    </Button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleCloseName}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <List
                        component="nav"
                        className={classes.modeMenu}
                        aria-label="Mode-menu"
                      >
                        <ListItem>
                          <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={0}>
                              <Button href={routeLink.hosting.profile} fullWidth>
                                {t('hosting-landing:header_profile')}
                              </Button>
                            </Grid>
                            <Grid component="label" container alignItems="center" spacing={0}>
                              <Button href={routeLink.hosting.changepw} fullWidth>
                                {t('hosting-landing:header_changepw')}
                              </Button>
                            </Grid>
                            <Grid component="label" container alignItems="center" spacing={0}>
                              <Button href={routeLink.hosting.result} fullWidth>
                                {t('hosting-landing:activity_result')}
                              </Button>
                            </Grid>
                          </Typography>
                        </ListItem>
                      </List>
                      <Divider />
                      <List
                        component="nav"
                        className={classes.modeMenu}
                        aria-label="Mode-menu"
                      >
                        <ListItem>
                          <Typography component="div" style={{width: '100%'}}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                              <Button onClick={handleLogout} fullWidth>
                                {t('hosting-landing:header_logout')}
                              </Button>
                            </Grid>
                          </Typography>
                        </ListItem>
                      </List>
                    </Popover>
                  </div>
                }
              </Hidden>
              <Hidden xsDown>
                {props.token === null &&
                  <Button href={routeLink.hosting.register} size="small" variant="contained" color="secondary" className={classes.button}>
                    {t('hosting-landing:header_register')}
                  </Button>
                }
              </Hidden>
              <Settings toggleDark={onToggleDark} toggleDir={onToggleDir} invert={invert} />
            </nav>
          </Container>
        </div>
        <Hidden smDown>
          <div className={classes.navigation}>
            <Container fixed>
              <nav className={classes.navMenu}>
                {invert ? (
                  <IconButton className={classes.icon} href={routeLink.hosting.home}>
                    <HomeIcon />
                  </IconButton>
                ) : (
                  <IconButton className={classes.icon} href="#home">
                    <HomeIcon />
                  </IconButton>
                )}
                {isDesktop && (
                  <List>
                    <li>
                      <Button href={routeLink.hosting.home}>
                        {t('hosting-landing:header_home')}
                      </Button>
                    </li>
                    <li>
                      <Button href={routeLink.hosting.activity}>
                        {t('hosting-landing:header_activity')}
                      </Button>
                    </li>
                    <li>
                      <Button href={routeLink.hosting.aboutus}>
                        {t('hosting-landing:header_aboutus')}
                      </Button>
                    </li>
                    <li>
                      <Button href={routeLink.hosting.donateus}>
                        {t('hosting-landing:header_donateus')}
                      </Button>
                    </li>
                    <li>
                      <Button href={routeLink.hosting.contact}>
                        {t('hosting-landing:header_contact')}
                      </Button>
                    </li>
                  </List>
                )}
              </nav>
            </Container>
          </div>
        </Hidden>
      </AppBar>
    </Fragment>
  );
}

Header.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  invert: PropTypes.bool,
  t: PropTypes.func.isRequired
};

Header.defaultProps = {
  sticky: true,
  invert: true
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
        payment_config: main.base.payment_config
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      reauthenticate: actions.reauthenticate,
      deauthenticate: actions.deauthenticate,
      get_countries: actions.get_countries,
      get_languages: actions.get_languages,
      get_subjects: actions.get_subjects,
      get_grades: actions.get_grades,
      get_payment_configs: actions.get_payment_configs
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['hosting-landing'])(Header));
