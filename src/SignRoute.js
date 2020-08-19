import React, { useContext } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import { UserData } from './Contexts/UserDataContext';
import { useQuery } from 'react-query';
import { Dashboard } from '@material-ui/icons';
const authCheck = async () => {
  let config = {
    headers: {
      authorization: `Bearer ${localStorage.token}`,
    },
  };
  console.log(config);
  const response = await fetch('http://localhost:5000/auth/check', config);
  const json = await response.json();
  if (json.message === 'Verified') return json.message;
  else {
    localStorage.removeItem('token');
    return json.message;
  }
};
export default function SignRoute({ component: Component, ...rest }) {
  const { data, status } = useQuery('auth', authCheck);
  // const { isAuthed } = useContext(UserData);
  console.log(status);
  console.log(data);
  return (
    <Route
      {...rest}
      render={props =>
        status === 'success' && data === 'Verified' ? (
          //   <Dashboard {...props} />
          <Redirect
            to={{ pathname: '/dashboard', state: { from: props.location } }}
          />
        ) : status === 'success' && data !== 'Verified' ? (
          <Component {...props} />
        ) : (
          <div>Loading</div>
        )
      }
    />
  );
}
