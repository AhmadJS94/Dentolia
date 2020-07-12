import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Tooltip, Typography } from '@material-ui/core';
import CalendarHeader from './CalendarHeader';

const useStyles = makeStyles(theme => ({
  container: {
    // width: '100%',

    display: 'grid',
    gridTemplateColumns: 'repeat(7,1fr)',
    gridTemplateRows: '30px 80px 80px 80px 80px 80px 80px',
    gridGap: 0,

    animation: '$anim 1000ms forwards',
  },
  daysOfWeek: {
    backgroundColor: '#167e56',
    // width: 'auto',
    // height: '15px',
    borderLeft: '1px solid #666',
    textAlign: 'center',
    fontFamily: 'Quicksand , sans-serif',
    fontWeight: 'bold',
    color: '#eee',
  },
  '@keyframes anim': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}));
const MonthView = ({
  generateNextCells,
  generateCells,
  generatePrevCells,
  date,
  setDate,
  isWeekView,
  isMonthView,
  setWeekView,
  isDayView,
  setDayView,
  setMonthView,
  generateDays,
}) => {
  const classes = useStyles();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <>
      <CalendarHeader
        isWeekView={isWeekView}
        isMonthView={isMonthView}
        setMonthView={setMonthView}
        setWeekView={setWeekView}
        isDayView={isDayView}
        setDayView={setDayView}
        date={date}
        setDate={setDate}
      />
      <div className={classes.container}>
        {days.map((day, index) => {
          return (
            <div className={classes.daysOfWeek} key={index}>
              <Typography
                style={{
                  fontFamily: 'Quicksand , sans-serif',
                  fontWeight: 'lighter',
                }}
                variant="h6"
              >
                {day}
              </Typography>
            </div>
          );
        })}
        {/* {generateDays()} */}
        {generatePrevCells()}
        {generateCells()}
        {generateNextCells()}
      </div>
    </>
  );
};

export default MonthView;
