import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Grid,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DashboardNavbar from '../components/DashboardNavbar';
import Tooth from '../vectors/Tooth';
import GeneralInfoCard from '../components/SinglePatientComponents/GeneralInfoCard';
import MedicalRecordCard from '../components/SinglePatientComponents/MedicalRecordCard';
import DentalInfoCard from '../components/SinglePatientComponents/DentalInfoCard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  root: {
    flexGrow: 1,

    background: 'linear-gradient(45deg,#07AFAF,#7037D2)',

    minHeight: '100vh',
  },
  mainContainer: {
    padding: theme.spacing(3),
  },
  listStyle: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 250,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: '#bce6d5',
    padding: 0,
  },
  patientName: {
    color: '#fff',
  },
  patientNameBox: {
    marginBottom: '2em',
  },
  id: {
    fontSize: '20px',
    color: '#555',
    fontWeight: '200',
  },
}));

export default function SinglePatient() {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <DashboardNavbar />
      <div className={classes.mainContainer}>
        <div className={classes.patientNameBox}>
          <Typography className={classes.patientName} variant="h2">
            Ahmad Zaaza <span className={classes.id}>#26658975</span>
          </Typography>
        </div>
        <AppBar position="static">
          <Tabs variant="fullWidth" value={value} onChange={handleChange}>
            <Tab label="General Info" />
            <Tab label="Medical Info" />
            <Tab label="Dental Info" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <GeneralInfoCard />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MedicalRecordCard />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Button>hi</Button>
        </TabPanel>

        {/* <Grid container spacing={1}>
         <GeneralInfoCard />
          <MedicalRecordCard style={classes} />
          <DentalInfoCard />
          <Grid item xs="12" sm="3">
            <Paper>
              <Typography variant="h6">General Info</Typography>
              <Divider />
              <List dense={true}>
                <ListItem>
                  <ListItemText primary="Age" secondary="27"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last prodecure"
                    secondary="extraction"
                  ></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last visit"
                    secondary="27/8/2019"
                  ></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="first visit"
                    secondary="21/10/2018"
                  ></ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation="1" style={{ background: '#178c97' }}>
          <Tooth />
        </Paper> */}
      </div>
    </div>
  );
}
