import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PatientsList from './pages/PatientsList';
import EnhancedTable from './pages/Table';
import SinglePatient from './pages/SinglePatient';
import NewPatient from './pages/NewPatient';
import Appointments from './pages/Appointments';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import './App.css';
import Lab from './pages/Lab';
import NewLab from './pages/NewLab';
import SingleLab from './pages/SingleLab';
import Vector from './pages/Vector';
import NewForm from './pages/NewForm';
import DentalInfoCard from './components/SinglePatientComponents/DentalInfoCard';
import Auth from './Auth';

import ProtectedRoute from './ProtectedRoute';
import SignRoute from './SignRoute';
import NotAuthorized from './pages/NotAuthorized';
import UserDataContext from './Contexts/UserDataContext';
import Test from './Test';
import MedicalForm from './components/SinglePatientComponents/Forms/MedicalForm';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        },
      },
    },
  },
  // overrides:{
  // '@global': {
  //   '*::-webkit-scrollbar': {
  //     width: '0.4em',
  //   },
  //   '*::-webkit-scrollbar-track': {
  //     '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
  //   },
  //   '*::-webkit-scrollbar-thumb': {
  //     backgroundColor: 'rgba(0,0,0,.1)',
  //     outline: '1px solid slategrey',
  //   },
  // }
  // },
  typography: {
    fontFamily: [
      'Montserrat',
      'Quicksand',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightBold: 'bold',
    fontWeightMedium: 'normal',
    fontWeightLight: 'lighter',
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <UserDataContext>
          <Switch>
            <Route exact path="/" component={Main} />
            {/* {localStorage.token && (
              <Redirect exact from="/login" to="/dashboard" />
            )} */}
            <SignRoute exact path="/login" component={Login} />
            <SignRoute exact path="/signup" component={Signup} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />

            <ProtectedRoute exact path="/patients" component={PatientsList} />
            <ProtectedRoute exact path="/patients/new" component={NewPatient} />
            <Redirect
              exact
              from="/patients/:_id/dental"
              to="/patients/:_id/dental/chart"
            />
            <ProtectedRoute
              exact
              path="/patients/:_id/medicalforms/new"
              component={MedicalForm}
            />
            <ProtectedRoute
              exact
              path="/patients/:_id/"
              // render={props => <SinglePatient {...props} />}
              component={SinglePatient}
            />
            {/* <Route exact path="/patients" component={PatientsList} /> */}
            <Redirect exact from="/patients/:_id" to="/patients/:_id/general" />
            {/* a simple hack */}
            {/* <Redirect
              exact
              from="/patients/:id/dental/medical"
              to="/patients/:id/medical"
            /> */}
            {/* <Redirect
              exact
              from="/patients/:name/info/dental/general"
              to="/patients/:name/info/general"
            />
            <Redirect
              exact
              from="/patients/:name/info/dental/dental"
              to="/patients/ahmadzaaza/info/dental"
            /> */}

            <Route exact path="/table" component={EnhancedTable} />
            <Route exact path="/appointments" component={Appointments} />
            <Route exact path="/lab" component={Lab} />
            <Route exact path="/lab/new" component={NewLab} />
            <Route exact path="/lab/labname" component={SingleLab} />
            <Route exact path="/vector" component={Vector} />
            <Route exact path="/test" component={Test} />
            <Route
              exact
              path="/patients/ahmadzaaza/sessions/new"
              component={NewForm}
            />
            {/* <Route path="/" render={() => <div>404</div>} /> */}
            <Route exact path="/unauthorized" component={NotAuthorized} />
          </Switch>
        </UserDataContext>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
