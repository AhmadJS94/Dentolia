import React, { useState, useEffect } from 'react';
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
  Button,
} from '@material-ui/core';
import moment from 'moment';
import AppointmentsAccordion from '../components/AppointmentsAccordion';
import DashboardAppointmentsTable from '../components/DashboardAppointmentsTable';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,

    boxShadow: 'none',
    background: 'linear-gradient(45deg,#07AFAF,#7037D2)',
    minHeight: '100vh',
  },

  container: {
    // padding: '1em',
  },
  mainBoard: {
    // gridArea: 'Board',
  },
  panel: {
    // gridArea: 'panel',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    // margin: '1em',
  },
  appointmentContainer: {
    // margin: '1em',
  },
  paper: {
    padding: theme.spacing(1),
    height: 'auto',
    width: 'auto',
  },
  panelButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '1em',
  },
}));
export default function Dashboard({ history }) {
  const [today, setToday] = useState(moment().format('dddd'));
  const [date, setDate] = useState(moment().format('DD'));
  const [month, setMonth] = useState(moment().month() + 1);
  const [year, setYear] = useState(moment().year());
  const [hour, setHour] = useState(moment().hour());
  const [minute, setMinute] = useState(moment().format('mm'));
  const [second, setSecond] = useState(moment().format('ss'));
  const [officeName, setOfficeName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isAppointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsToFetch, setAppointmentsToFetch] = useState(moment());
  const resolveDay = hour => {
    let text = '';
    switch (hour) {
      default:
        text = 'Good Day';
        break;
      case hour >= 0 && hour <= 12:
        text = 'Good Morning';
        break;
      case hour > 12 && hour < 18:
        text = 'Good Day';
        break;
      case hour > 18:
        text = 'Good Evening';
        break;
    }
    return text;
  };

  useEffect(() => {
    setAppointmentsLoading(true);
    console.log(`iam triggered`);
    let config = {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    };
    console.log(appointmentsToFetch.format('DD-MM-YYYY'));
    // let date = ;
    // console.log(date);
    axios
      .get(
        `http://localhost:5000/api/appointments/${appointmentsToFetch.format(
          'DD-MM-YYYY'
        )}`,
        config
      )
      .then(res => {
        setAppointmentsLoading(false);
        setAppointments(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err.response));
  }, [appointmentsToFetch]);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(moment().format('ss'));
      setMinute(moment().format('mm'));
      setToday(moment().format('dddd'));
      setMonth(moment().month() + 1);
      setDate(moment().format('DD'));
      setHour(moment().hour());
      setYear(moment().year());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DashboardNavbar />
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} sm={6} className={classes.panel}>
          <div className={classes.welcome}>
            <Typography align="center" variant="h2">
              {resolveDay()} Dr.{`${officeName}`} !
            </Typography>
          </div>
          <div>
            <Typography
              align="center"
              variant="h6"
            >{`${today} ${date}/${month}/${year}`}</Typography>
            <Typography align="center" variant="h4">
              {`${hour}:${minute}:${second}`}
            </Typography>
          </div>
          <div className={classes.panelButtons}>
            <Button variant="contained" color="primary">
              Check In Patient
            </Button>
            <Button variant="contained" color="primary">
              Create new Patient
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} className={classes.appointmentContainer}>
          <DashboardAppointmentsTable
            appointments={appointments}
            appointmentsToFetch={appointmentsToFetch}
            setAppointmentsToFetch={setAppointmentsToFetch}
            isAppointmentsLoading={isAppointmentsLoading}
          />
        </Grid>
      </Grid>
    </div>
  );
}
