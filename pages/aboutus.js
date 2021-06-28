import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import AboutusBanner from '../components/Banner/AboutusBanner';
import Aboutus from '../components/AboutUs';
import Footer from '../components/Footer';
import PageNav from '../components/PageNav';
import brand from '../static/text/brand';

const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.type === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
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

function AboutUsPage(props) {
  const classes = useStyles();
  const { onToggleDark, onToggleDir } = props;
  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.hosting.name }
          &nbsp; - About Us
        </title>
      </Head>
      <CssBaseline />
      <section id="home" />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
        />
        <main className={classes.containerWrap}>
          <section>
            <AboutusBanner />
          </section>

          <section>
            <Aboutus />
          </section>

          <section id="footer">
            <Footer toggleDir={onToggleDir} />
          </section>
        </main>
        <Hidden mdDown>
          <PageNav />
        </Hidden>
        <script src="/static/scripts/vanta/three.r92.min.js" />
        <script src="/static/scripts/vanta/vanta.net.min.js" />
        <script src="/static/scripts/particles-data.js" />
      </div>
    </React.Fragment>
  );
}

AboutUsPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'hosting-landing'],
});

AboutUsPage.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};


export default AboutUsPage;
