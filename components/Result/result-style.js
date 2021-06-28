import { makeStyles } from '@material-ui/core/styles';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';

const resultStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(27),
        marginBottom: theme.spacing(5),
        minHeight: 'calc(100vh - 272px)'
    }
}));

export default resultStyles;
