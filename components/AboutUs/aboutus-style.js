import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const aboutusStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  childImage: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: theme.spacing(3),
    borderRadius: '5px'
  },
  ttU: {
    font: "normal 35px/38px 'PORKYS_0'",
    color: '#5d5d5d'
  },
  orngText: {
    color: '#f26b49'
  },
  needContainer: {
    background: 'url("/static/images/information-sec.jpg") no-repeat 50% 0',
    backgroundSize: 'cover',
    textAlign: 'center'
  },
  contactContainer: {
    background: 'url("/static/images/child-infrm.jpg") no-repeat 50% 0',
    backgroundSize: 'cover',
    textAlign: 'center'
  },
  needMore: {
    fontFamily: "PORKYS_0",
    paddingTop: theme.spacing(5),
    fontSize: 36,
    maxWidth: '800px',
    margin: 'auto',
    color: '#fff'
  },
  needMoreDesc: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 18,
    marginTop: theme.spacing(2),
    color: '#fff'
  },
  callBut: {
    backgroundColor: '#ffe402',
    color: '#000',
    margin: theme.spacing(2)
  },
  contactBut: {
    fontFamily: "PORKYS_0",
    fontSize: 18,
    backgroundColor: '#ffe402',
    color: '#000',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  meetHead: {
    fontFamily: "PORKYS_0",
    fontSize: 36,
    color: '#5d5d5d'
  },
  commentText: {
    background: '#fcb315',
    position: 'relative',
    padding: '15px 15px 25px',
    color: '#fff',
    borderRadius: '5px',
    '&:before': {
      position: 'absolute',
      left: '37px',
      bottom: '-17px',
      background: 'url("/static/images/arrw-angel.png") no-repeat 0 100%',
      width: '27px',
      height: '23px',
      content: "''"
    },
    '&:after': {
      clear: 'both',
      lineHeight: 0,
      content: "''",
      visibility: 'hidden',
      display: 'block'
    }
  },
  imageCont: {
    padding: '35px 0 0'
  },
  avatarImg: {
    border: 'solid 4px #fff',
    boxShadow: '0 0 4px #000',
    float: 'left',
    margin: '0 15px 0 0'
  }
}));

export default aboutusStyles;
