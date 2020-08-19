import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CalendarHeader from './CalendarHeader';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'minmax(60px,180px) 1fr',
    gridTemplateRows: ' 50px repeat(24,80px)',
    gridGap: 0,
    maxHeight: '82vh',
    overflow: 'auto',
    borderCollapse: 'collapse',
  },
  daysOfWeek: {
    backgroundColor: '#167e56',
    // width: 'auto',
    // height: '15px',
    // borderLeft: '1px solid #666',
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
    fontSize: '1.5em',
  },
  emptyCell: {
    backgroundColor: '#dbecf0',
    display: 'grid',
    gridTemplateColumns: '1fr',

    gridGap: '0',
    // borderRight: '1px solid grey',
    borderBottom: '1px solid grey',
  },
  blank: {
    background: '#dbecf0',
  },
}));

export default function DayView({ date }) {
  const classes = useStyles();
  const days = ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = [
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
  ];
  //   console.log(date.date.isoWeek());
  //   console.log(date.date.week());
  // const datesOfWeek = () => {
  //   let arr = [firstDateOfWeek];
  //   let first = firstDateOfWeek + 1;
  //   for (let i = 5; i >= 0; i--, first++) {
  //     if (first > 0 && first <= thisMonthDays) arr.push(first);
  //     if (first > thisMonthDays) {
  //       arr.push(firstDateInMonth);
  //       firstDateInMonth++;
  //     }
  //   }
  //   console.log(arr);
  //   return arr;
  // };
  // const generateDays = () => {
  //   let rows = [];
  //   let day = date.date.clone().format('ddd');
  //   for (let i = 0; i < days.length; i++) {
  //     rows.push(
  //       <div key={i} className={i === 0 ? classes.blank : classes.daysOfWeek}>
  //         {/* <div>{days[i]}</div> */}
  //         <div>
  //           {i === 0 && ''}
  //           {i === 1 && day}
  //         </div>
  //       </div>
  //     );
  //   }
  //   return rows;
  // };

  const generateRows = () => {
    let rows = [];
    for (let i = 0; i < 24; i++) {
      rows.push(
        <div className={classes.hours} key={i}>
          {hours[i]}
        </div>
      );

      rows.push(
        <div className={classes.emptyCell}>
          {/* <div style={{ borderBottom: '1px dotted #555' }}></div> */}
          <div></div>
        </div>
      );
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

        <div className={classes.blank}></div>
        <div className={classes.daysOfWeek}>
          {date.date.clone().format('ddd')}
        </div>

        {generateRows()}
      </div>
    </>
  );
}
