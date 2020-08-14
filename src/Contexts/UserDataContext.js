import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
export const UserData = createContext();
const api_url = 'http://localhost:5000/api/patients/all';
const newPatientUrl = 'http://localhost:5000/api/patients/new';
export default function UserDataContext({ children }) {
  const [data, setData] = useState({});
  const [isAuthed, setAuthed] = useState(false);
  const [newPatientData, setNewPatientData] = useState({});

  let config = {
    headers: {
      authorization: `Bearer ${localStorage.token}`,
    },
  };
  const createNewPatient = () => {
    console.log('patient data is ' + { newPatientData });
    axios
      .post(newPatientUrl, newPatientData, config)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  };

  // useEffect(() => {
  //   axios.get('http://localhost:5000/auth/check', config).then(res => {
  //     console.log(res.data === 'Verified');
  //     if (res.data === 'Verified') {
  //       setAuthed(true);
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   if (localStorage.token) {
  //     axios
  //       .get(api_url, config)
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(err => console.log(err.response));
  //   }
  // }, []);

  return <UserData.Provider value={{}}>{children}</UserData.Provider>;
}
