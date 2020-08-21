import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  CardContent,
  Button,
  IconButton,
  Grid,
  Paper,
  Toolbar,
  Divider,
} from '@material-ui/core/';
import UpcomingAppointmentsCard from './PatientOverview/UpcomingAppointmentsCard';
import DuePaymentsCard from './PatientOverview/DuePaymentsCard';
import PatientFormsCard from './PatientOverview/PatientFormsCard';
import SpecialNotesCard from './PatientOverview/SpecialNotesCard';
import GeneralCard from './PatientOverview/GeneralCard';

const useStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.50)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.5)',
      outline: '1px solid slategrey',
    },
  },
  paper: {
    minHeight: '300px',
    overflowY: 'auto',
  },
  toolbar: {
    minHeight: '44px',
    display: 'flex',
    justifyContent: 'center',
  },
}));
export default function PatientOverview({ medicalForms }) {
  // console.log(medicalForms);
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={5}>
        <GeneralCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <UpcomingAppointmentsCard />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PatientFormsCard medicalForms={medicalForms} />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <SpecialNotesCard />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <DuePaymentsCard />
      </Grid>
    </Grid>
  );
}
