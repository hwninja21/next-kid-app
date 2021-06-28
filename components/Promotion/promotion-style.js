import { makeStyles } from '@material-ui/core/styles';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';

const promotionStyles = makeStyles(theme => ({
  sliderWrap: {
    position: 'relative',
    marginTop: theme.spacing(-8),
    '& a[class="previousButton"]': {
      left: 15,
      background: 'url("/static/images/slider-left.png")',
      width: '55px',
      height: '35px',
      zIndex: 999,
      '&:hover': {
        left: 0
      }
    },
    '& a[class="nextButton"]': {
      right: 15,
      width: '55px',
      height: '35px',
      background: 'url("/static/images/slider-right.png")',
      zIndex: 999,
      '&:hover': {
        right: 0
      }
    },
    '& > div': {
      height: theme.spacing(58),
      [theme.breakpoints.down('xs')]: {
        height: 200
      },
      '& > a': {
        zIndex: 0,
        position: 'absolute',
        content: '""',
        transition: 'all 0.3s ease',
        top: '40%',
      }
    },
    '& [class="slider-wrapper"]': {
      '& a': {
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        }
      }
    }
  },
  content: {
    position: 'relative',
    textAlign: 'center',
  },
  contentImage: {
    height: 'auto',
    [theme.breakpoints.down('md')]: {
      height: '100px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '70px',
    },
    verticalAlign: 'middle'
  },
  text: {
    fontFamily: 'PORKYS_0',
    fontSize: 64,
    [theme.breakpoints.down('md')]: {
      fontSize: 40,
    },
    color: '#fff'
  },
  viewmoreBut: {
    fontFamily: 'PORKYS_0',
    fontSize: 20,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  promoImage: {
    color: '#fff',
    maxWidth: '600px',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  item: {
    height: theme.spacing(60),
    zIndex: 10,
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(-1, 2, 0),
      paddingTop: theme.spacing(12),
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    },
    '& figure': {
      opacity: 0,
      margin: '20px auto',
      transform: 'scale(0.7)',
      background: theme.palette.secondary.light,
      borderRadius: '50%',
      width: 200,
      height: 200,
      lineHeight: '200px',
      textAlign: 'center',
      '& img': {
        verticalAlign: 'middle',
        maxWidth: 200,
        maxHeight: 200,
      }
    },
    '& $text': {
      padding: theme.spacing(2, 8, 1, 2),
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1)
      }
    },
    '& h1': {
      color: theme.palette.secondary.main,
      lineHeight: '36px',
      marginBottom: theme.spacing(3),
      '& button': {
        fontSize: 28,
        lineHeight: '36px',
        fontFamily: 'Montserrat',
        fontWeight: theme.typography.fontWeightBold,
        textAlign: 'left',
        [theme.breakpoints.down('xs')]: {
          textAlign: 'center',
          fontSize: 20,
          lineHeight: '28px',
        }
      },
      [theme.breakpoints.down('xs')]: {
        whiteSpace: 'normal',
        lineHeight: '32px'
      },
    },
    '& p': {
      marginBottom: theme.spacing(2)
    },
    '&:before': {
      display: 'none'
    }
  },
  landingContent: {
    width: '100%',
  },
  subjectHeader: {
    fontFamily: 'PORKYS_0',
    fontSize: 40,
    [theme.breakpoints.down('md')]: {
      fontSize: 24,
    },
  },
  imageCont: {
    width: '100%',
    height: theme.spacing(25),
    objectFit: 'cover',
    borderRadius: 8,
    '&:hover': {
      boxShadow: '0px 4px 6px rgba(0,0,0,.13) ,2px 4px 4px rgba(0,0,0,.1) , -2px -4px 4px rgba(0,0,0,.05)'
    }
  },
  gridCont: {
    cursor: 'pointer'
  },
  nameText: {
    font: '400 16px/18px Roboto, sans-serif',
    paddingTop: 5,
    textAlign: 'center'
  },
  copyrightText: {
    font: '400 12px/16px Roboto, sans-serif',
    paddingTop: 5,
    textAlign: 'center'
  }
}));

export default promotionStyles;
