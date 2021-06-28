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
  calcContent: {
    maxWidth: theme.spacing(50),
    textAlign: 'right',
    marginBottom: theme.spacing(2)
  },
  numberFont: {
    font: 'bold 50px/56px Courier',
  },
  border: {
    height: 4,
    marginTop: theme.spacing(),
    backgroundColor: 'rgba(0, 0, 0, 0.87)'
  },
  numberInput: {
    font: 'bold 50px/56px Courier',
    textAlign: 'right',
    direction: "rtl",
    marginTop: theme.spacing()
  },
  clearButton: {
    marginLeft: theme.spacing()
  },
  tickImage: {
    width: 75,
    height: 75,
    position: 'absolute',
    right: -90,
    top: 20
  }
}));

export default styles;
