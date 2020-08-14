import React from 'react';
import { Link } from 'react-router-dom';

export default function NotAuthorized() {
  return (
    <h1>
      You're not Authorized to view this page, please{' '}
      <Link to="/login">Log in </Link>
    </h1>
  );
}
