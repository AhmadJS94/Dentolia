import React, { useContext } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import { UserData } from './Contexts/UserDataContext';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthed } = useContext(UserData);
  // const authCheck = async () => {
  //   const response = await axios.get(
  //     'http://localhost:5000/auth/check',
  //     config
  //   );
  //   const json = await response.data;
  //   console.log(json);
  //   if (json === 'Verified') {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // };

  return (
    <Route
      {...rest}
      // render={props => {
      //   let config = {
      //     headers: {
      //       authorization: `Bearer ${localStorage.token}`,
      //     },
      //   };
      //   axios.get('http://localhost:5000/auth/check', config).then(res => {
      //     if (res.data === 'Verified') {
      //       return <Component {...props} />;
      //     } else {
      //       return (
      //         <Redirect
      //           to={{ pathname: '/login', state: { from: props.location } }}
      //         />
      //       );
      //     }
      //   });
      // }}
      render={props =>
        localStorage.token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}
