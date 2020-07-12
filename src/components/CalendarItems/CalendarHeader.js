import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
  Typography,
  Grid,
  TextField,
  IconButton,
  Button,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { addMonths } from 'date-fns';
const useStyles = makeStyles(theme => ({
  container: {
    padding: '5px 0',
    border: '1px solid #666',
    fontFamily: 'Quicksand',
    background: '#167e56',
  },
  arrows: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSide: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  const firstDateOfCurrentWeek = date
    .clone()
    .week(date.week())
    .startOf('week')
    .date();
  const lastDateOfCurrentWeek = date
    .clone()
    .week(date.week())
    .endOf('week')
    .date();
  const classes = useStyles();
  const condition = lastDateOfCurrentWeek > 0 && lastDateOfCurrentWeek < 7;
  console.log('month view ' + isMonthView);
  console.log(' weekview' + isWeekView);
  console.log('day view' + isDayView);
  console.log(date.toString());
  return (
    <Grid className={classes.container} container>
      <Grid item className={classes.leftSide} xs={6}>
        <div className={classes.leftArrow}>
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
        </div>
        <div className={classes.rightArrow}>
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
        </div>
        <div>
          {isMonthView && (
            <Button>{date.format('MMMM YYYY').toString()}</Button>
          )}
          {isWeekView && (
            <Button>{`${
              condition
                ? date.clone().subtract(1, 'month').format('MMMM')
                : date.format('MMMM')
            } ${firstDateOfCurrentWeek}-${
              condition ? date.clone().format('MMMM') : lastDateOfCurrentWeek
            } ${
              condition ? lastDateOfCurrentWeek : ''
            }, ${date.year()}`}</Button>
          )}
          {isDayView && <Button>{`${date.format('MMMM D, YYYY')}`}</Button>}
        </div>
      </Grid>
      <Grid item xs={6} className={classes.targets}>
        <Button
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
          className={classes.buttons}
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
            }
          }}
          className={classes.buttons}
        >
          WEEK
        </Button>
        <Button className={classes.buttons}>WORKWEEK</Button>
        <Button
          onClick={() => {
            if (isMonthView) return;
            else {
              setMonthView(true);
              setWeekView(false);
              setDayView(false);
            }
          }}
          className={classes.buttons}
        >
          MONTH
        </Button>
      </Grid>
    </Grid>
  );
}
