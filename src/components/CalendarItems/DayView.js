import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CalendarHeader from './CalendarHeader';

const useStyles = makeStyles(theme => ({
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
  blank: {
    background: '#dbecf0',
  },
}));

export default function DayView() {
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
  //   console.log(date.date.isoWeek());
  //   console.log(date.date.week());
  //   const datesOfWeek = () => {
  //     let arr = [firstDateOfWeek];
  //     let first = firstDateOfWeek + 1;
  //     for (let i = 5; i >= 0; i--, first++) {
  //       if (first > 0 && first <= thisMonthDays) arr.push(first);
  //       if (first > thisMonthDays) {
  //         arr.push(firstDateInMonth);
  //         firstDateInMonth++;
  //       }
  //     }
  //     console.log(arr);
  //     return arr;
  //   };
  //   const generateDays = () => {
  //     let rows = [];
  //     let day = datesOfWeek();
  //     for (let i = 0; i < days.length; i++) {
  //       rows.push(
  //         <div key={i} className={i === 0 ? classes.blank : classes.daysOfWeek}>
  //           <div>{days[i]}</div>
  //           <div>{i === 0 ? '' : day[i - 1]}</div>
  //         </div>
  //       );
  //     }
  //     return rows;
  //   };

  const generateRows = () => {
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
            <div style={{ borderBottom: '1px dotted #555' }}></div>
            <div></div>
          </div>
        );
      }
    }
    return rows;
  };
  return (
    <>
      {/* <CalendarHeader
        isWeekView={isWeekView}
        isMonthView={isMonthView}
        setMonthView={setMonthView}
        setWeekView={setWeekView}
        date={date}
        setDate={setDate}
        isDayView={isDayView}
        setDayView={setDayView}
      /> */}
      <div className={classes.container}>
        {/* {generateDays()} */}
        {generateRows()}
      </div>
    </>
  );
}
