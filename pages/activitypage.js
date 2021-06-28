import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import ActivityPageContent from '../components/ActivityPage';
import Footer from '../components/Footer/Footer';
import PageNav from '../components/PageNav';
import brand from '../static/text/brand';

const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: 'url("/static/images/contact-bg.jpg")',
  },
  spaceBottom: {
    marginBottom: sectionMargin(theme.spacing()),
    [theme.breakpoints.down('sm')]: {
      marginBottom: sectionMargin(6),
    }
  },
  spaceTop: {
    marginTop: sectionMargin(theme.spacing())
  },
  spaceTopShort: {
    marginTop: sectionMargin(theme.spacing() / 2),
  },
  spaceBottomShort: {
    marginBottom: sectionMargin(theme.spacing() / 2),
  },
  containerWrap: {
    marginTop: -40,
    '& > section': {
      position: 'relative'
    }
  }
}));

function ActivityPage(props) {
  const classes = useStyles();
  const { onToggleDark, onToggleDir } = props;
  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.hosting.name }
          &nbsp; - Activity Page
        </title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
        />
        <section id="home" />
        <main className={classes.containerWrap}>

          <section>
            <ActivityPageContent activity={props.activityid} subject={props.subjectid} grade={props.gradeid} />
          </section>

          <section id="footer" >
            <Footer toggleDir={onToggleDir} />
          </section>
        </main>
        <Hidden mdDown>
          <PageNav />
        </Hidden>
      </div>
    </React.Fragment>
  );
}

ActivityPage.getInitialProps = async ({query: { subjectid, gradeid, activityid }}) => ({
  namespacesRequired: ['common', 'hosting-landing'],
  subjectid: subjectid,
  gradeid: gradeid,
  activityid: activityid
});

ActivityPage.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};


export default ActivityPage;
