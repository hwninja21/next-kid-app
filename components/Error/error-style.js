import { makeStyles } from '@material-ui/core/styles';
import errorDeco from '~/static/images/hosting/error-deco.png';

const useStyles = makeStyles(theme => ({
  errorWrap: {
    background: 'url("/static/images/top-bg.jpg") no-repeat 50% 0,  url("/static/images/top-bg.jpg") no-repeat 50% 100%, url("/static/images/contact-bg.jpg") repeat 50% 0',
    minHeight: '50vh',
    marginTop: theme.spacing(18),
    textAlign: 'center'
  },
  logoImage: {
    marginTop: theme.spacing(5)
  },
  errorImage: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10)
  }
}));

export default useStyles;
