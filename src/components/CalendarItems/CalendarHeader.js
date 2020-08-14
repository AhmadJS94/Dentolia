import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Typography,
  Grid,
  TextField,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '5px 0',
    border: '1px solid #666',
    fontFamily: 'Quicksand',
    background: '#167e56',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftSide: {
    flexGrow: 1,
  },
  leftArrow: {
    padding: '3px',
  },
  rightArrow: { padding: '3px' },
  targets: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttons: {
    fontSize: '0.9em',
    color: '#eee',
  },

  menu: {
    padding: '0',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  monthHidden: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  todayHidden: {
    ['@media (max-width:440px)']: {
      display: 'none',
    },
  },
  dayHidden: {
    ['@media (max-width:500px)']: {
      display: 'none',
    },
  },
  weekHidden: {
    ['@media (max-width:560px)']: {
      display: 'none',
    },
  },
  todayHiddenMenu: {
    ['@media (min-width:440px)']: {
      display: 'none',
      textAlign: 'center',
    },
  },
  dayHiddenMenu: {
    ['@media (min-width:500px)']: {
      display: 'none',
      textAlign: 'center',
    },
  },
  weekHiddenMenu: {
    ['@media (min-width:560px)']: {
      display: 'none',
      textAlign: 'center',
    },
  },
  monthHiddenMenu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      textAlign: 'center',
    },
  },
}));
export default function CalendarHeader({
  date: { date },
  setDate,
  isWeekView,
  isMonthView,
  setWeekView,
  setMonthView,
  firstDateInMonth,
  thisMonthDays,
  isDayView,
  setDayView,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const firstDateOfCurrentWeek = date
    .clone()
    .year(date.year())
    .month(date.month())
    .week(date.week())
    .startOf('week')
    .date();
  const lastDateOfCurrentWeek = date
    .clone()
    .year(date.year())
    .month(date.month())
    .week(date.week())
    .endOf('week')
    .date();
  const classes = useStyles();
  const condition = lastDateOfCurrentWeek > 0 && lastDateOfCurrentWeek < 7;
  const yearCondition =
    date.month() === 11 &&
    lastDateOfCurrentWeek > 0 &&
    lastDateOfCurrentWeek < 7;

  return (
    <div className={classes.container}>
      <div item className={classes.leftSide}>
        {/* <div className={classes.leftArrow}> */}
        <IconButton
          onClick={() => {
            isDayView && setDate({ date: date.subtract(1, 'd') });
            isMonthView && setDate({ date: date.subtract(1, 'M') });
            isWeekView && setDate({ date: date.subtract(1, 'week') });
          }}
          size="small"
        >
          <ArrowBackIosIcon size="small" />
        </IconButton>
        {/* </div> */}
        {/* <div className={classes.rightArrow}> */}
        <IconButton
          onClick={() => {
            isDayView && setDate({ date: date.add(1, 'd') });
            isMonthView && setDate({ date: date.add(1, 'M') });
            isWeekView && setDate({ date: date.add(1, 'week') });
          }}
          size="small"
        >
          <ArrowForwardIosIcon size="small" />
        </IconButton>
        {/* </div> */}
        {/* <div> */}
        {isMonthView && (
          <Button>
            {date.clone().year(date.year()).format('MMMM YYYY').toString()}
          </Button>
        )}
        {isWeekView && (
          <Button>{`${
            condition
              ? date
                  .clone()
                  .year(date.year())
                  .month(date.month())
                  .format('MMMM')
              : date.format('MMMM')
          } ${firstDateOfCurrentWeek}${
            yearCondition ? `, ${date.clone().year()}` : ''
          } - ${
            condition
              ? date.clone().year(date.year()).add(1, 'month').format('MMMM')
              : lastDateOfCurrentWeek
          } ${condition ? lastDateOfCurrentWeek : ''}, ${
            yearCondition ? date.clone().year() + 1 : date.clone().year()
          }`}</Button>
        )}
        {isDayView && <Button>{`${date.format('MMMM D, YYYY')}`}</Button>}
        {/* </div> */}
        {/* <div>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </div> */}
      </div>
      {/* <div item xs={6} className={classes.targets}> */}
      <Button
        className={classes.todayHidden}
        style={{
          borderRight: '1px solid #777',
          borderRadius: '0px',
          fontSize: '0.9em',
          color: '#eee',
        }}
        onClick={() => {
          setDate({ date: moment() });
        }}
      >
        TODAY
      </Button>
      <Button
        onClick={() => {
          if (isDayView) return;
          else {
            setDayView(true);
            setMonthView(false);
            setWeekView(false);
          }
        }}
        className={`${classes.buttons} ${classes.dayHidden}`}
      >
        DAY
      </Button>
      <Button
        onClick={() => {
          if (isWeekView) return;
          else {
            setWeekView(true);
            setMonthView(false);
            setDayView(false);
            // setDate({ date: moment().month(date.month()) });
          }
        }}
        className={`${classes.buttons} ${classes.weekHidden}`}
      >
        WEEK
      </Button>
      {/* <Button className={classes.buttons}>WORKWEEK</Button> */}
      <Button
        onClick={() => {
          if (isMonthView) return;
          else {
            setMonthView(true);
            setWeekView(false);
            setDayView(false);
          }
        }}
        className={`${classes.buttons} ${classes.monthHidden}`}
      >
        MONTH
      </Button>
      {/* </div> */}
      <IconButton className={classes.menu} onClick={handleClick}>
        <MoreVertIcon size="small" />
      </IconButton>
      <Menu
        variant="selectedMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setDate({ date: moment() });
            handleClose();
          }}
          className={classes.todayHiddenMenu}
        >
          Today
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (isDayView) return;
            else {
              setDayView(true);
              setMonthView(false);
              setWeekView(false);
            }
          }}
          className={classes.dayHiddenMenu}
        >
          Day
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (isWeekView) return;
            else {
              setWeekView(true);
              setMonthView(false);
              setDayView(false);
              // setDate({ date: moment().month(date.month()) });
            }
          }}
          className={classes.weekHiddenMenu}
        >
          Week
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (isMonthView) return;
            else {
              setMonthView(true);
              setWeekView(false);
              setDayView(false);
            }
          }}
          className={classes.monthHiddenMenu}
        >
          Month
        </MenuItem>
      </Menu>
    </div>
  );
}
