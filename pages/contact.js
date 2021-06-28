import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import brand from '../static/text/brand';
import ContactFrm from '../components/Forms/Contact';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../components/Footer';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import { makeStyles } from '@material-ui/core/styles';
import PageNav from '../components/PageNav';

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
    marginTop: 50,
    '& > section': {
      position: 'relative'
    }
  }
}));

function Contact(props) {
  const classes = useStyles();
  const { onToggleDark, onToggleDir } = props;

  return (
    <Fragment>
      <Head>
        <title>
          { brand.hosting.name }
          &nbsp; - Contact
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
            <ContactFrm />
          </section>
          <section id="footer" >
            <Footer toggleDir={onToggleDir} />
          </section>
        </main>
        <Hidden mdDown>
          <PageNav />
        </Hidden>
      </div>
    </Fragment>
  );
}

Contact.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};


export default Contact;
