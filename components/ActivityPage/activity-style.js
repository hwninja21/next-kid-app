import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Utils from '~/utils/utils';

const activityStyles = makeStyles(theme => ({
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
  topDiv: {
    paddingTop: theme.spacing(12),
  },
  pageContent: {
    marginTop: theme.spacing(13),
    minHeight: '80vh'
  },
  headerText: {
    fontWeight: 700,
    fontSize: 30,
  },
  bgImageContent: {
    width: 'calc(100% - 6px)',
    objectFit: 'cover',
    borderRadius: '6px',
    margin: 3,
  },
  commentContent: {
    marginTop: theme.spacing(5)
  },
  commentPaper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  nameAvatar: {
    display: 'flex'
  },
  commentAccName: {
    marginLeft: theme.spacing()
  },
  flexContent: {
    marginTop: theme.spacing(),
    display: 'flex',
  },
  commentText: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(2),
    wordWrap: 'break-word'
  },
  thumbContent: {
    display: 'flex',
    marginLeft: theme.spacing(2)
  },
  likeText: {
    marginLeft: theme.spacing(0.5),
    fontSize: 18,
    fontWeight: 600
  },
  similarDiv: {
    paddingTop: theme.spacing(5)
  },
  descriptionContent: {
    paddingTop: theme.spacing(2)
  },
  butImage: {
    height: theme.spacing(3.5),
  },
  listContent: {
    maxHeight: 400,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  tagContent: {
    marginTop: theme.spacing(3)
  },
  carouselImage: {
    objectFit: 'contain',
    maxHeight: theme.spacing(40),
    [theme.breakpoints.down('xs')]: {
      height: 180
    }
  },
  carouselText: {
    color: '#fff'
  },
  dateText: {
    marginLeft: theme.spacing(),
    marginTop: theme.spacing(0.5),
    fontSize: 14,
    fontWeight: 600
  },
  postMessageField: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(2)
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  downloadBut: {
    background: '#ffe402',
    font: 'normal 20px/52px PORKYS_0',
    marginRight: 4,
  },
  socialBut: {
    fontSize: '25px',
    color: '#000',
    padding: '8px 10px',
  },
  shareImg: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  sliderWrap: {
    position: 'relative',
    background: '#000',
    textAlign: 'center',
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
      height: theme.spacing(50),
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
  activityResultBut: {
    background: '#fff',
    borderRadius: 0,
    fontSize: '1rem',
    padding: '12px 24px',
    cursor: 'pointer',
    marginTop: theme.spacing(2),
  },
  borderPage: {
    borderRight: '1px solid #ccc'
  }
}));

export default activityStyles;
