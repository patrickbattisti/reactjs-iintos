import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import Dashboard from '~/pages/admin/Dashboard';
import Calendar from '~/pages/admin/Calendar';

import Home from '~/pages/public/Home';
import Login from '~/pages/public/Login';
import SignUp from '~/pages/public/SignUp';
import SchoolInformation from '~/pages/public/SignUp/SchoolInformation';
import AwaitVerification from '~/pages/public/AwaitVerification';

import Route from './Route';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} exact />
        <Route
          path="/signup/school_information"
          component={SchoolInformation}
        />
        <Route path="/await_verification" component={AwaitVerification} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/calendar" component={Calendar} isPrivate />
        <Route component={() => <Redirect to="/dashboard" />} isPrivate />
      </Switch>
    </Router>
  );
};
