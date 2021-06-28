import { makeStyles } from '@material-ui/core/styles';
import cloudBottomLight from '~/static/images/hosting/cloud_bottom_light.svg';
import cloudBottomDark from '~/static/images/hosting/cloud_bottom_dark.svg';
import activityback from '~/static/images/banner.jpg';

const bannerStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
  },
  activityroot: {
    background: `url(${activityback})`
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
  cardsContent: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3)
  },
  searchDomain: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 75,
    zIndex: 10,
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(6, 10, 4),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4),
    },
    '& label': {
      textTransform: 'capitalize'
    },
  },
  filterContent: {
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formContent: {
    marginLeft: theme.spacing(5),
  },
  focused: {},
  search: {
    fontSize: 18,
    width: '100%',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(37),
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(11),
    },
    '& input': {
      borderRadius: 10,
      height: 65,
    },
    '& label': {
      left: theme.spacing(3),
      top: theme.spacing(),
      fontWeight: theme.typography.fontWeightBold
    },
    '& label + div': {
      marginTop: 0,
      '&:after, &:before': {
        display: 'none'
      }
    }
  },
  search_action: {
    position: 'absolute',
    right: theme.spacing(17),
    [theme.breakpoints.down('sm')]: {
      right: theme.spacing(5),
    },
    top: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  action: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  selectDomain: {
    margin: theme.spacing(0, 2),
    borderLeft: `1px solid ${theme.palette.divider}`,
    '&:before, &:after': {
      display: 'none'
    },
    '& > div': {
      padding: theme.spacing(1, 3),
    }
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      minWidth: 0,
      width: 'auto',
      background: 'none',
      boxShadow: 'none',
      color: theme.palette.primary.main
    }
  },
  icon: {},
  decoInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  hide: {
    visibility: 'hidden'
  },
  cutText: {
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden !important',
    width: '100%',
    whiteSpace: 'nowrap',
  },
  descriptionText: {
    marginTop: theme.spacing(),
    height: theme.spacing(9)
  },
  tagContent: {
    marginTop: theme.spacing(),
    height: theme.spacing(7)
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: 700,
    fontSize: 24,
    marginLeft: theme.spacing(-2),
    paddingLeft: theme.spacing(2),
    width: '90%',
    overflow: 'hidden !important',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    textOverflow: 'ellipsis',
    borderRadius: '0 10px 10px 0'
  },
  bgimageContent: {
    width: '100%',
    height: theme.spacing(20),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    margin: '0.1px'
  },
  activityCardContent: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 4px 6px rgba(0,0,0,.13) ,2px 4px 4px rgba(0,0,0,.1) , -2px -4px 4px rgba(0,0,0,.05)'
    }
  },
  disableCardContent: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 4px 6px rgba(0,0,0,.13) ,2px 4px 4px rgba(0,0,0,.1) , -2px -4px 4px rgba(0,0,0,.05)'
    },
    filter: 'blur(3px)'
  },
  questionAnswer: {
    boxSizing: 'border-box',
    color: '#fff',
    minHeight: '42px',
    padding: '10px 5px 5px 5px',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 14
  },
  answers: {
    color: '#777368',
    background: '#f5f5f5',
    fontWeight: 800,
    fontSize: 20,
    textAlign: 'center',
    padding: '10px 0'
  },
  timerContent: {
    maxWidth: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  vertical: {
    writingMode: 'tb-rl',
    transform: 'rotate(90deg)',
    transformOrigin: 'right top 0',
    marginTop: 350,
    whiteSpace: 'nowrap',
    display: 'block',
    fontSize: 30,
    fontWeight: 600,
    color: '#fff',
    background: '#ec008c',
    padding: '8px 16px 8px 8px',
    borderRadius: 8,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 4px 6px rgba(0,0,0,.13) ,2px 4px 4px rgba(0,0,0,.1) , -2px -4px 4px rgba(0,0,0,.05)'
    }
  },
  rightPanel: {
    marginBottom: theme.spacing(3),
    position: 'relative'
  },
  absoluteRightPanel: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  paperSimilarContent: {
    padding: theme.spacing(2),
    maxWidth: theme.spacing(35),
    overflow: 'auto',
  },
}));

export default bannerStyles;
