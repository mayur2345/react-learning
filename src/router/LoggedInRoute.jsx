/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import history from './history';
import PATH from '../properties/paths';

const LoggedInRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}) => {
  const storageAuthString = localStorage.getItem('isAuthenticated');
  const storageAuthBool = storageAuthString === 'true';
  // eslint-disable-next-line no-param-reassign
  isAuthenticated = storageAuthString ? storageAuthBool : isAuthenticated;

  if (isAuthenticated === false) {
    history.push(PATH.login);
  }

  return (
    <Route
      render={otherProps => (
        <>
          <Component {...otherProps} />
        </>
      )}
    />
  );
};

LoggedInRoute.propTypes = {
  component: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  otherProps: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.loginState.user.isAuthenticated
});

export default connect(mapStateToProps)(LoggedInRoute);
