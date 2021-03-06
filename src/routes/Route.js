import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthLayout from '~/components/_layout/Auth';
import DefaultLayout from '~/components/_layout/Default';
import { useUserContext } from '~/context/UserContext';

const Route = ({ isPrivate, component: Component, location, ...rest }) => {
  const { token } = useUserContext();

  if (token && (location.pathname === '/login' || location.pathname === '/')) {
    return <Redirect to="/dashboard" />;
  }

  if (isPrivate || token) {
    if (!token) {
      return <Redirect to="/" />;
    }

    return (
      <AuthLayout>
        <Component location={location} {...rest} />
      </AuthLayout>
    );
  }

  return (
    <DefaultLayout
      hiddenFooter={location.pathname === '/' || location.pathname === '/doc'}
      hiddenHeader={location.pathname === '/doc'}
    >
      <Component />
    </DefaultLayout>
  );
};

export default Route;
