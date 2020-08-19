import React, { useState, useEffect, useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import MonthView from './CalendarItems/MonthView';
import WeekView from './CalendarItems/WeekView';
import DayView from './CalendarItems/DayView';
import { Tooltip, Typography } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import CalendarHeader from './CalendarItems/CalendarHeader';
import axios from 'axios';
// import { UserData } from '../Contexts/UserDataContext';

moment.updateLocale('en', {
  week: {
    dow: 0, // First day of week is Sunday
    doy: 0, // First week of year must contain 7 January (7 + 0 - 1)
  },
});
const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.8)',
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}))(Tooltip);
const useStyles = makeStyles(theme => ({
  calendarContainer: {
    padding: '0 35px',
    borderRadius: '20px',
  },
  cells: {
    paddingLeft: '5px',
    background: ' #222227',
    color: '#eee',
    fontSize: '1.5em',
    cursor: 'pointer',
    '&:hover': {
      background: '#51515d',
    },
    transition: 'background ease 0.2s',
  },
  prevCells: {
    background: ' #222227',
    color: 'rgba(241, 245, 254, 0.5)',
  },
  nextCells: {
    background: ' #222227',
    color: 'rgba(241, 245, 254, 0.5)',
  },
  today: {
    background: '#167e56',
    // width: '15px',
    // height: '15px',
    // borderRadius: '50%',
    // textAlign: 'center',
    // padding: '3px 10px',
  },
  tooltip: { background: '#f5f5f9' },
}));
export default function Calendar() {
  const classes = useStyles();

  const [isMonthView, setMonthView] = useState(false);

  const [isWeekView, setWeekView] = useState(true);

  const [isDayView, setDayView] = useState(false);

  const [date, setDate] = useState({ date: moment() });
  const [appointments, setAppointments] = useState([]);

  const api_url = 'http://localhost:5000/api/appointments/all';
  useEffect(() => {
    axios(api_url, config).then(res => {
      setAppointments(res.data);
    });
  }, []);
  let config = {
    headers: {
      authorization: `Bearer ${localStorage.token}`,
    },
  };

  const lastDateOfCurrentMonth = moment()
    .year(date.date.year())
    .month(date.date.month())
    .endOf('month')
    .date();

  const firstDateOfWeek = moment()
    .year(date.date.year())
    .month(date.date.month())
    .week(date.date.week())
    .startOf('week')
    .date();

  const todayIndex = moment().date();
  const lastDateOfCurrentWeek = moment()
    .year(date.date.year())
    .month(date.date.month())
    .week(date.date.week())
    .endOf('week')
    .date();

  let firstDateInMonth = moment()
    .year(date.date.year())
    .month(date.date.month())
    .startOf('month')
    .date();
  const firstDateNextMonth = moment()
    .year(date.date.year())
    .month(date.date.month() + 1)
    .startOf('month')
    .date();
  const lastDateOfPrevMonth = moment()
    .year(date.date.year())
    .month(date.date.month() - 1)
    .endOf('month')
    .date();

  const firstDayIndex = moment()
    .year(date.date.year())
    .month(date.date.month())
    .startOf('month')
    .day();

  const lastDayIndex = moment()
    .year(date.date.year())
    .month(date.date.month())
    .endOf('month')
    .day();

  const thisMonthDays = moment()
    .year(date.date.year())
    .month(date.date.month())
    .endOf('month')
    .date();

  const nextDays = 7 - lastDayIndex - 1;

  const generatePrevCells = () => {
    let days = [];
    for (let x = firstDayIndex; x > 0; x--) {
      days.push(
        <LightTooltip
          title={'No Appointments Today'}
          TransitionComponent={Zoom}
          enterDelay={500}
          key={x}
        >
          <div
            onClick={handleClickInMonthView}
            className={`${classes.prevCells} ${classes.cells}`}
          >
            {lastDateOfPrevMonth - x + 1}
          </div>
        </LightTooltip>
      );
    }
    return days;
  };
  // handling Clicks on days in Month View
  // HINT : DOESN'T WORK ON PREVIOUS AND NEXT YEARS
  //try adding SELECTED state
  const handleClickInMonthView = e => {
    let selectedDate = e.target.textContent;
    let className = e.target.classList;
    console.log(selectedDate);
    setDayView(true);
    setMonthView(false);
    console.log(className);
    if (className[0] === 'makeStyles-prevCells-16') {
      console.log(true);
      setDate({
        date: moment()
          .clone()
          .year(date.date.year())
          .subtract(1, 'month')
          .date(selectedDate),
      });
    } else if (className[0] === 'makeStyles-cells-15') {
      setDate({
        date: moment().clone().year(date.date.year()).date(selectedDate),
      });
    } else if (className[0] === 'makeStyles-nextCells-17') {
      setDate({
        date: moment()
          .clone()
          .year(date.date.year())
          .add(1, 'month')
          .date(selectedDate),
      });
    }
  };
  const generateCells = () => {
    let days = [];
    for (let i = 1; i <= lastDateOfCurrentMonth; i++) {
      const today =
        i === todayIndex &&
        moment().month() === date.date.month() &&
        moment().year() === date.date.year();
      days.push(
        <LightTooltip
          title={'No Appointments Today'}
          TransitionComponent={Zoom}
          enterDelay={500}
          key={i}
        >
          <div
            onClick={handleClickInMonthView}
            className={
              today ? `${classes.cells} ${classes.today}` : classes.cells
            }
          >
            {i}
          </div>
        </LightTooltip>
      );
    }
    return days;
  };

  const generateNextCells = () => {
    let days = [];
    for (let j = 1; j <= nextDays; j++) {
      days.push(
        <LightTooltip
          title={'No Appointments'}
          TransitionComponent={Zoom}
          enterDelay={500}
          key={j}
        >
          <div
            onClick={handleClickInMonthView}
            className={`${classes.nextCells} ${classes.cells}`}
          >
            {j}
          </div>
        </LightTooltip>
      );
    }
    return days;
  };
  /////////////////
  const datesOfMonth = () => {
    let arr = [];
    let first = firstDateInMonth;
    let lastPrev = lastDateOfPrevMonth;
    let firstNext = firstDateNextMonth;
    for (let i = 0; i < 35; i++) {
      if (i < firstDayIndex) {
        arr.unshift(lastPrev);
        lastPrev--;
      } else if (i >= firstDayIndex && i <= thisMonthDays) {
        arr.push(first);
        first++;
      } else if (i > thisMonthDays) {
        arr.push(firstNext);
        firstNext++;
      }
    }
    return arr;
  };
  const generateDays = () => {
    let rows = [];
    let days = datesOfMonth();
    for (let i = 0; i < 35; i++) {
      const today =
        i === todayIndex &&
        moment().month() === date.date.month() &&
        moment().year() === date.date.year();
      rows.push(
        <div key={i} className={classes.cells}>
          <span className={`${today && classes.today}`}>{days[i]}</span>
        </div>
      );
    }
    return rows;
  };

  return (
    <div className={classes.calendarContainer}>
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
      {isWeekView && (
        <WeekView
          todayIndex={todayIndex}
          firstDateOfWeek={firstDateOfWeek}
          firstDateInMonth={firstDateInMonth}
          thisMonthDays={thisMonthDays}
          lastDateOfCurrentWeek={lastDateOfCurrentWeek}
          date={date}
          appointments={appointments}
        />
      )}
      {isMonthView && (
        <MonthView
          generateCells={generateCells}
          generateNextCells={generateNextCells}
          generatePrevCells={generatePrevCells}
          generateDays={generateDays}
        />
      )}
      {isDayView && <DayView date={date} />}
    </div>
  );
}
