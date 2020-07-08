import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './pages/Dashboard';
import PatientsList from './pages/PatientsList';
import EnhancedTable from './pages/Table';
import SinglePatient from './pages/SinglePatient';
import NewPatient from './pages/NewPatient';
import Appointments from './pages/Appointments';
function App() {
  return (
    <Router>
      <CssBaseline>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/patients" component={PatientsList} />
        <Route exact path="/patients/ahmadzaaza" component={SinglePatient} />
        <Route exact path="/patients/new" component={NewPatient} />
        <Route path="/table" component={EnhancedTable} />
        <Route path="/appointments" component={Appointments} />
      </CssBaseline>
    </Router>
  );
}

export default App;
