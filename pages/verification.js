import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../static/text/brand';
import VerificationForm from '../components/Forms/Verification';

function Verification(props) {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.hosting.name }
          &nbsp; - Verification
        </title>
      </Head>
      <div>
        <VerificationForm access_token={props.token} />
      </div>
    </Fragment>
  );
}

Verification.getInitialProps = async ({query: { token }}) => ({
  namespacesRequired: ['common', 'hosting-landing'],
  token: token
});

export default Verification;
