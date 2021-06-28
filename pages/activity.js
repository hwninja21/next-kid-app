import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import ActivityBanner from '../components/Banner/ActivityBanner';
import ActivityContent from '../components/Activity/ActivityContent';
import Footer from '../components/Footer';
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

function Activity(props) {
  const classes = useStyles();
  const { onToggleDark, onToggleDir } = props;

  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.hosting.name }
          &nbsp; - Activity
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
            <ActivityBanner />
          </section>

          <section>
            <ActivityContent search={props.search} fsubjects={props.subjects} fgrades={props.grades} flanguages={props.languages} rowsPerPage={props.rows} page={props.page}/>
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

Activity.getInitialProps = async ({query}) => {
  return {
  ...query,
  namespacesRequired: ['common', 'hosting-landing']
};};

Activity.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};


export default Activity;
