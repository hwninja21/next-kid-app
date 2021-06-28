import { makeStyles } from '@material-ui/core/styles';
import activityback from '~/static/images/banner.jpg';
import aboutusback from '~/static/images/inner-slider.jpg';
import donateusback from '~/static/images/inner-slider2.jpg';

const bannerStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
  },
  activityroot: {
    background: `url(${activityback})`
  },
  aboutusroot: {
    background: `url(${aboutusback})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
  },
  donateusroot: {
    background: `url(${donateusback})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
  },
  bannerWrap: {
    position: 'relative',
    marginTop: theme.spacing(13),
    height: '250px',
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(20),
      height: '350px',
    }
  },
  text: {
    textAlign: 'center',
    '& h4': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
      marginBottom: theme.spacing(3),
    },
    '& p': {
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  hide: {
    visibility: 'hidden'
  },
  aboutUsBanner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999,
    width: '1200px',
    [theme.breakpoints.down('md')]: {
      width: '800px',
      top: '40%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      top: '30%',
    }
  },
  aboutUsText: {
    width: '47%',
    float: 'left',
    textAlign: 'center'
  },
  aboutUsImage: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: theme.spacing(-4),
    [theme.breakpoints.down('md')]: {
      height: '60px',
      marginBottom: theme.spacing(-2),
    },
    verticalAlign: 'middle'
  },
  textAboutus: {
    fontFamily: 'PORKYS_0',
    fontSize: 64,
    [theme.breakpoints.down('md')]: {
      fontSize: 40,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
    color: '#fff'
  }
}));

export default bannerStyles;
