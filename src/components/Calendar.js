import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import CalendarHeader from './CalendarItems/CalendarHeader';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const generateGrids = () => {
  let count = 0;
  const daysOfMonth = [];
  for (let day = 0; count <= 35; day++, count++) {
    daysOfMonth.push(day);
    if (day === 31) {
      day = -1;
    }
  }

  return daysOfMonth;
};

//number of days in the month -- month 1 is Jan here

const getFirstDayOfMonth = i => {
  const day = new Date(2020, 6, i).getDay();
  // console.log(`day is ${day}`);
  return day;
};
const getNumberOfDaysInAMonth = (date, month) => {
  const days = new Date(date, month, 0).getDate();
  let arr = [];
  for (let i = 1; i <= days; i++) {
    arr.push(i);
  }
  return arr;
};
//the name of the day -- 0 is sunday
const mapNumbersToDays = input => {
  let day = '';
  switch (input) {
    default:
      day = null;
      break;
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
  }
  console.log(day);
  return day;
};
const useStyles = makeStyles(theme => ({
  container: {
    // width: '100%',

    display: 'grid',
    gridTemplateColumns: 'repeat(7,1fr)',
    gridTemplateRows: '30px 80px 80px 80px 80px 80px',
    gridGap: 0,
  },
  daysOfWeek: {
    backgroundColor: '#f8f8ff',
    width: 'auto',
    // height: '15px',
    borderLeft: '1px solid #666',
  },

  day: {
    backgroundColor: '#f8f8ff',
    width: 'auto',
    height: 'auto',
    borderLeft: '1px solid #666',
  },
}));
export default function Calendar() {
  const [noOfDay, setNoOfDay] = useState(1);
  const classes = useStyles();
  let count = 0;
  let count2 = 0;
  const increment = count2 => {
    if (count2 === 0) {
      return;
    }
    count++;
  };
  return (
    <div style={{ padding: '20px' }}>
      <CalendarHeader />
      <div className={classes.container}>
        {daysOfWeek.map(day => (
          <div className={classes.daysOfWeek}>
            <Typography variant="subtitle2">{day}</Typography>
          </div>
        ))}
        {generateGrids().map((day, i) => {
          var result;

          console.log(`${i}st iteration`);
          if (day === getFirstDayOfMonth(count)) {
            console.log('worked');
            result = getNumberOfDaysInAMonth(2020, 7)[count];
            console.log(`count is ${count}`);
            increment(count2);
            count2++;
          }
          return (
            <div key={i} className={classes.day}>
              {day === getFirstDayOfMonth(count) ? result : ''}
            </div>
          );
        })}
        {/* <Grid className={classes.day} item>
          1
        </Grid>
        <Grid className={classes.day} item>
          2
        </Grid>
        <Grid className={classes.day} item>
          3
        </Grid>
        <Grid className={classes.day} item>
          4
        </Grid>
        <Grid className={classes.day} item>
          5
        </Grid>
        <Grid className={classes.day} item>
          6
        </Grid>
        <Grid className={classes.day} item>
          7
        </Grid> */}
      </div>
    </div>
  );
}
