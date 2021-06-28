import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../static/text/brand';
import ForgotpasswordForm from '../components/Forms/Forgotpassword';
import SetpasswordForm from '../components/Forms/Setpassword';

function Forgotpassword(props) {
  if (props.access_token) {
    return (
      <Fragment>
        <Head>
          <title>
            { brand.hosting.name }
            &nbsp; - Forgot-Password
          </title>
        </Head>
        <div>
          <SetpasswordForm access_token={props.access_token}/>
        </div>
      </Fragment>
    );  
  }
  return (
    <Fragment>
      <Head>
        <title>
          { brand.hosting.name }
          &nbsp; - Forgot-Password
        </title>
      </Head>
      <div>
        <ForgotpasswordForm />
      </div>
    </Fragment>
  );
}

Forgotpassword.getInitialProps = async ({query: { access_token }}) => ({
  namespacesRequired: ['common', 'hosting-landing'],
  access_token: access_token
});

export default Forgotpassword;
