import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import PatientListGrid from '../components/PatientListGrid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: 'linear-gradient(45deg,#07AFAF,#7037D2)',
    minHeight: '100vh',
  },
}));
export default function PatientsList() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DashboardNavbar />
      <PatientListGrid />
    </div>
  );
}
