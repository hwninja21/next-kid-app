import { makeStyles } from '@material-ui/core/styles';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';

const contactStyles = makeStyles(theme => ({
  title: {
    color: '#fff',
    fontFamily: 'PORKYS_0'
  },
  pageWrap: {
    padding: theme.spacing(11, 5),
    position: 'relative',
    textAlign: 'center',
    background: 'url("/static/images/contact-bg.jpg") repeat 50% 0',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 0),
    },
    '& $title': {
      fontWeight: theme.typography.fontWeightBold,
      [theme.breakpoints.down('xs')]: {
        fontSize: 32
      }
    },
    '& a': {
      color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
      textTransform: 'none',
      fontSize: 16,
      textDecoration: 'none',
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  innerWrap: {
    textAlign: 'left',
  },
  fullFromWrap: {
    background: '#ec008c',
    padding: theme.spacing(9, 0),
  },
  formBox: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    background: fade(theme.palette.background.paper, 0.7),
    boxShadow: '0 0 12px 2px rgba(0, 0, 0, 0.05)',
  },
  desc: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    padding: theme.spacing(0, 10),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 5)
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2),
      fontSize: 16
    }
  },
  light: {},
  input: {
    width: '100%',
    background: theme.palette.background.paper,
    borderRadius: 4,
    '& label': {
      left: theme.spacing(0.5),
      top: theme.spacing(0.2),
    },
    '& > div': {
      overflow: 'hidden',
      '&:hover': {
        background: theme.palette.background.paper,
      },
      '& input, textarea': {
        paddingLeft: theme.spacing(2),
        '&:focus': {
          background: theme.palette.background.default
        },
      }
    },
    '&$light': {
      '& label': {
        color: theme.palette.common.white,
      },
      '& > div': {
        border: `1px solid ${fade(theme.palette.primary.light, 0.5)}`,
        '& input': {
          color: theme.palette.common.white,
          '&:focus': {
            background: fade(theme.palette.text.hint, 0.2)
          },
          '&:hover': {
            background: fade(theme.palette.text.hint, 0.2)
          }
        },
      }
    }
  },
  form: {
    textAlign: 'left',
    position: 'relative',
    padding: theme.spacing(0, 15, 10),
    marginTop: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 6, 10),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2, 10),
    },
  },
  formHelper: {
    display: 'flex',
    marginTop: theme.spacing(),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
  },
  flex: {},
  btnArea: {
    marginTop: theme.spacing(5),
    '& button': {
      marginTop: theme.spacing(2)
    },
    color: '#fff',
    '& span': {
      '& a': {
        textDecoration: 'none !important',
        color: theme.palette.primary.light,
      }
    },
    '&$flex': {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        display: 'block'
      }
    },
  },
  rightIcon: {
    marginLeft: theme.spacing()
  },
  backtohome: {
    width: 80,
    height: 80,
    position: 'absolute',
    marginTop: 20,
    marginLeft: 20,
    zIndex: 20,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    '& i': {
      fontSize: 32,
    },
    '& > span i:first-child': {
      opacity: 1,
      transition: 'opacity 0.3s ease'
    },
    '& > span i:last-child': {
      position: 'absolute',
      right: 0,
      opacity: 0,
      transition: 'all 0.3s ease'
    },
    '&:hover': {
      '& > span i:first-child': {
        opacity: 0,
      },
      '& > span i:last-child': {
        right: 30,
        opacity: 1,
      },
    }
  },
  check: {
    '& svg': {
      fill: theme.palette.primary.main
    }
  },
  authFrame: {
    display: 'block',
    position: 'relative',
  },
  greeting: {
    padding: theme.spacing(15, 6),
    height: '100%',
    '& h4': {
      fontWeight: theme.typography.fontWeightBold,
    },
    '& h6': {
      fontWeight: theme.typography.fontWeightMedium,
    }
  },
  logoHeader: {},
  logo: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(5),
    '&$logoHeader': {
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    },
    '& img': {
      width: 64,
      marginRight: theme.spacing()
    },
    '& p, span': {
      display: 'block',
      textTransform: 'lowercase',
      fontSize: 24,
      paddingBottom: 4,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    color: '#fff',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      justifyContent: 'center',
      '& a': {
        display: 'none'
      }
    }
  },
  signArrow: {
    color: '#fff'
  },
  formWrap: {
    minHeight: 760,
    background: '#ec008c',
    position: 'relative',
    paddingBottom: theme.spacing(10),
    overflow: 'hidden',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5)
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(8)
    },
    '& $frmDeco': {
      left: '58.333333%',
      transform: 'translateX(-72%)',
      bottom: '-75px'
    }
  },
  socmedSideLogin: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      display: 'block'
    },
    '& > *': {
      color: theme.palette.common.white,
      width: 160,
      padding: theme.spacing(),
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(0, 0.5)
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(2),
        width: '100%',
      }
    },
    '& i': {
      color: theme.palette.common.white,
      marginRight: theme.spacing()
    }
  },
  blueBtn: {
    background: '#28aae1',
    '&:hover': {
      background: darken('#28aae1', 0.2),
    }
  },
  naviBtn: {
    background: '#3b579d',
    '&:hover': {
      background: darken('#3b579d', 0.2),
    }
  },
  redBtn: {
    background: '#dd493c',
    '&:hover': {
      background: darken('#dd493c', 0.2),
    }
  },
  separator: {
    margin: `${theme.spacing(5)}px auto`,
    maxWidth: 340,
    minWidth: 256,
    textAlign: 'center',
    position: 'relative',
    '& p': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12
      },
    },
    '&:before, &:after': {
      content: '""',
      borderTop: `1px solid #fff`,
      top: '50%',
      position: 'absolute',
      width: '20%'
    },
    '&:before': {
      left: 0,
    },
    '&:after': {
      right: 0,
    }
  },
  frmDeco: {
    bottom: -104,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 1280,
    '& svg': {
      width: 1280,
      height: 190,
      stroke: theme.palette.primary.main,
      fill: 'none'
    }
  },
  cloudDeco: {
    position: 'absolute',
    top: '-10%',
    left: 0,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    '& svg': {
      fill: theme.palette.background.paper
    }
  },
  titleText: {
    color: '#fff',
    font: 'normal 45px/48px PORKYS_0',
  },
  buttonLink: {
    color: '#fff'
  },
  formControl: {
    background: '#fff'
  },
  formSelectControl: {
    background: '#fff',
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: 4,
    '& label': {
      paddingTop: theme.spacing(),
      paddingLeft: theme.spacing(),
    }
  },
  titleFont: {
    color: '#555555',
    font: 'normal 50px/56px PORKYS_0',
  }
}));

export default contactStyles;
