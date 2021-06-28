import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../static/text/brand';
import WaitForm from '../components/Forms/Wait';

function Wait(props) {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.hosting.name }
          &nbsp; - Verification
        </title>
      </Head>
      <div>
        <WaitForm  />
      </div>
    </Fragment>
  );
}

Wait.getInitialProps = async ({query: { token }}) => ({
  namespacesRequired: ['common', 'hosting-landing'],
});

export default Wait;
