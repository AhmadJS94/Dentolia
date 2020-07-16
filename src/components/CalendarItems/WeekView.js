import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CalendarHeader from './CalendarHeader';
import moment from 'moment';
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
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8,1fr)',
    gridTemplateRows: 'repeat(25,60px)',
    gridGap: 0,
    maxHeight: '70vh',
    overflow: 'auto',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hours: {
    backgroundColor: '#167e56',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid grey',
    borderTop: '1px solid grey',
  },
  emptyCell: {
    backgroundColor: '#dbecf0',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '0',
    borderRight: '1px solid grey',
    borderBottom: '1px solid grey',
  },
  halfHour: {
    height: '50%',
    backgroundColor: '#58a',
  },
  fullHour: {
    height: '100%',
    backgroundColor: '#5da',
  },

  blank: {
    background: '#dbecf0',
  },
}));

export default function WeekView({
  date,
  setDate,
  isWeekView,
  isMonthView,
  setWeekView,
  setMonthView,
  isDayView,
  setDayView,
  firstDateInMonth,
  todayIndex,
  firstDateOfWeek,
  lastDateOfCurrentWeek,
  thisMonthDays,
}) {
  const classes = useStyles();
  const days = ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = [
    '12:00 AM',
    '01:00 AM',
    '02:00 AM',
    '03:00 AM',
    '04:00 AM',
    '05:00 AM',
    '06:00 AM',
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
    '10:00 PM',
    '11:00 PM',
  ];
  // console.log(date.date.isoWeek());
  // console.log(date.date.week());
  const datesOfWeek = () => {
    let arr = [firstDateOfWeek];
    let first = firstDateOfWeek + 1;
    let firstMonth = firstDateInMonth;
    for (let i = 5; i >= 0; i--, first++) {
      if (first > 0 && first <= thisMonthDays) arr.push(first);
      if (first > thisMonthDays) {
        arr.push(firstMonth);
        firstMonth++;
      }
    }
    // console.log(arr);
    return arr;
  };
  const generateDays = () => {
    let rows = [];
    let day = datesOfWeek();
    for (let i = 0; i < days.length; i++) {
      rows.push(
        <div key={i} className={i === 0 ? classes.blank : classes.daysOfWeek}>
          <div>{days[i]}</div>
          <div>{i === 0 ? '' : day[i - 1]}</div>
        </div>
      );
    }
    return rows;
  };
  let appointment = {
    name: 'Ahmad Zaaza',
    time: '05:00 AM',
    duration: '1 hour',
    date: '31/7/2020',
    day: 'Friday',
  };
  const condition = (appointment, i, j) => {
    let num = appointment.date.split('/')[0];
    let month = appointment.date.split('/')[1] - 1;
    let year = appointment.date.split('/')[2];
    let time = appointment.time;
    let day = appointment.day;
    let arr = datesOfWeek();
    // for (i = 0; i < arr.length; i++) {
    // console.log(month === date.date.month());
    // console.log(date.date.month().toString());
    // console.log(month);
    if (
      num === arr[j].toString() &&
      // num === date.date.date().toString() &&
      month.toString() === date.date.clone().month().toString() &&
      year === date.date.clone().year().toString() &&
      time === hours[i] &&
      day === days[j + 1]
    ) {
      return appointment.name;
    }
    // }
  };
  const generateRows = appointment => {
    let rows = [];
    for (let i = 0; i < 24; i++) {
      rows.push(
        <div className={classes.hours} key={i}>
          {hours[i]}
        </div>
      );
      for (let j = 0; j < 7; j++) {
        rows.push(
          <div key={`${i}${j}${i}`} className={classes.emptyCell}>
            <div
              className={
                appointment.duration === '1 hour'
                  ? classes.fullHour
                  : classes.halfHour
              }
            >
              {condition(appointment, i, j)}
            </div>
          </div>
        );
      }
    }
    return rows;
  };
  return (
    <>
      <CalendarHeader
        isWeekView={isWeekView}
        isMonthView={isMonthView}
        setMonthView={setMonthView}
        setWeekView={setWeekView}
        date={date}
        setDate={setDate}
        isDayView={isDayView}
        setDayView={setDayView}
        firstDateInMonth={firstDateInMonth}
        thisMonthDays={thisMonthDays}
      />
      <div className={classes.container}>
        {generateDays()}
        {generateRows(appointment)}
      </div>
    </>
  );
}
