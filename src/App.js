import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import './Styles/App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
function App() {
  return (
    <Router>
      <CssBaseline>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </CssBaseline>
    </Router>
  );
}

export default App;
