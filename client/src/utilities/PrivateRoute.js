import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // You can change this logic based on your auth mechanism

  // If the user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the passed element (the protected page)
  return element;
};

export default PrivateRoute;
