import { makeStyles } from '@material-ui/core/styles';

const footerStyles = makeStyles(theme => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
  footer: {
    position: 'relative',
    paddingTop: theme.spacing(2),
    background: theme.palette.primary.dark,
    '& p': {
      color: theme.palette.common.white,
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center'
      }
    },
    '& ul': {
      margin: 0,
      padding: 0,
    },
    '& li': {
      listStyle: 'none',
      display: 'inline-block',
      width: '30%',
      marginRight: '3%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: theme.palette.common.white,
      [theme.breakpoints.down('xs')]: {
        width: '47%'
      },
      '& a': {
        fontSize: 14,
        textTransform: 'capitalize',
        textDecoration: 'none !important',
        color: theme.palette.common.white,
        '&:hover': {
          color: theme.palette.primary.light
        }
      }
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      '& + p': {
        textAlign: 'center'
      },
    },
    '& img': {
      width: 64,
      marginRight: theme.spacing(),
    },
    '& h6': {
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: 28,
      textTransform: 'lowercase',
      color: theme.palette.common.white,
    }
  },
  socmed: {
    display: 'flex',
    justifyContent: 'space-around',
    '& button': {
      marginTop: theme.spacing(-0.5),
      marginBottom: theme.spacing(),
      color: theme.palette.primary.dark,
      background: theme.palette.primary.main,
      width: 36,
      height: 36,
      '& i': {
        color: theme.palette.common.white,
      }
    },
    '& i': {
      fontSize: 24
    }
  },
  footerContent: {
    position: 'relative',
    background: theme.palette.primary.dark,
  },
}));

export default footerStyles;
