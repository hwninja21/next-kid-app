import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../static/text/brand';
import ChangepasswordForm from '../components/Forms/Changepassword';

function Changepassword(props) {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.hosting.name }
          &nbsp; - Change-Password
        </title>
      </Head>
      <div>
        <ChangepasswordForm/>
      </div>
    </Fragment>
  );  
}

Changepassword.getInitialProps = async () => ({
  namespacesRequired: ['common', 'hosting-landing'],
});

export default Changepassword;
