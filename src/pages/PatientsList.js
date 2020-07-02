import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import PatientListGrid from '../components/PatientListGrid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#3a5ad9',
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
