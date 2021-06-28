import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = makeStyles(theme => ({
  content: {
    textAlign: 'center',
  },
  paginate: {
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  formControl: {
    marginLeft: theme.spacing(3)
  },
  clearButton: {
    marginLeft: theme.spacing()
  },
  tickImage: {
    width: 30,
    height: 30,
    marginLeft: theme.spacing(2)
  }
}));

export default styles;
