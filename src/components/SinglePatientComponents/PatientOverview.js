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
  paper: {
    minHeight: '300px',
    overflowY: 'auto',
  },
  toolbar: {
    minHeight: '44px',
    display: 'flex',
    justifyContent: 'center',
  },
  innerGrid: {
    padding: theme.spacing(2),
  },
}));
export default function PatientOverview() {
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
        <PatientFormsCard />
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
