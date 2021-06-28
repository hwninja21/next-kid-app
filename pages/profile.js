import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../static/text/brand';
import ProfileForm from '../components/Forms/Profile';

function Profile() {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.hosting.name }
          &nbsp; - Profile
        </title>
      </Head>
      <div>
        <ProfileForm />
      </div>
    </Fragment>
  );
}

Profile.getInitialProps = async () => ({
  namespacesRequired: ['common', 'hosting-landing'],
});

export default Profile;
