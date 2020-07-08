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
    backgroundColor: '#3a5ad9',
    minHeight: '100vh',
  },
}));
export default function Appointments() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DashboardNavbar />
      <Calendar />
      {/* <CalendarTest /> */}
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
