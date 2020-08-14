import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timer from 'react-compound-timer';
import Calendar from '../components/Calendar';
import DashboardNavbar from '../components/DashboardNavbar';
import CalendarTest from '../components/CalendarTest';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
    background: 'linear-gradient(45deg,#07AFAF,#7037D2)',
    minHeight: '100vh',
    fontFamily: 'Quicksand , sans-serif',
  },
}));
export default function Appointments() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DashboardNavbar />
      <Calendar />
    </div>
  );
}

{
  /* <Timer initialTime={0} startImmediately={false}>
        {({ start, resume, pause, stop, reset, timerState }) => (
          <React.Fragment>
            <div>
              <Timer.Days /> days
              <Timer.Hours /> hours
              <Timer.Minutes /> minutes
              <Timer.Seconds /> seconds
              <Timer.Milliseconds /> milliseconds
            </div>
            <div>{timerState}</div>
            <br />
            <div>
              <button onClick={start}>Start</button>
              <button onClick={pause}>Pause</button>
              <button onClick={resume}>Resume</button>
              <button onClick={stop}>Stop</button>
              <button onClick={reset}>Reset</button>
            </div>
          </React.Fragment>
        )}
      </Timer> */
}
