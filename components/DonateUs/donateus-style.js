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
  donateGrid: {
    paddingBottom: theme.spacing(3)
  }
}));

export default aboutusStyles;
