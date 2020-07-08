import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DashboardNavbar from '../components/DashboardNavbar';
import EditIcon from '@material-ui/icons/Edit';
import Tooth from '../vectors/Tooth';
import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@material-ui/core';
import AppointmentsAccordion from '../components/AppointmentsAccordion';
import CollapsibleTable from '../components/CollapsibleTable';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,

    boxShadow: 'none',
    backgroundColor: '#3a5ad9',
    minHeight: '100vh',
  },
  mainGrid: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    height: 'auto',
    width: 'auto',
  },
}));
export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DashboardNavbar />
      <Grid className={classes.mainGrid} container spacing={5}>
        {/* <Grid item>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h4">Upcoming Appoinments</Typography>
            <br />
            <Divider />
            <Typography variant="h6">Today</Typography>

            <AppointmentsAccordion />
          </Paper>
        </Grid> */}
        <Grid item>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h4">Upcoming Appoinments</Typography>
            <br />
            <Divider />

            <CollapsibleTable />
          </Paper>
        </Grid>
      </Grid>
      {/* <img src={svg} alt="" /> */}
      <Tooth />
    </div>
  );
}
