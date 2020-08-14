import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CalendarHeader from './CalendarHeader';
import moment from 'moment';
// import { UserData } from '../../Contexts/UserDataContext';
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
    backgroundColor: '#eee',
    display: 'grid',
    gridTemplateColumns: 'repeat(8,1fr)',
    gridTemplateRows: ' 50px repeat(24,80px)',
    gridGap: 0,
    maxHeight: '82vh',
    overflow: 'auto',
    borderCollapse: 'collapse',
  },
  daysOfWeek: {
    backgroundColor: '#167e56',
    // width: 'auto',
    // height: '25px',
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
    fontSize: '1.5em',
  },
  emptyCell: {
    backgroundColor: 'rgba(110, 133, 212, 0.5)',
    display: 'grid',
    gridTemplateColumns: '1fr',
    // gridTemplateRows: 'repeat(4,25%)',
    gridGap: '0',
    borderRight: '1px solid grey',
    borderBottom: '1px solid grey',
    position: 'relative',
  },
  quarterHour: {
    height: '25%',
    backgroundColor: 'green',
  },
  halfHour: {
    height: '50%',
    backgroundColor: '#58a',
  },
  threeQuarters: {
    height: '75%',
    backgroundColor: 'purple',
  },
  fullHour: {
    height: '100%',
    backgroundColor: '#5da',
  },
  hourQuarter: {
    height: '125%',
    backgroundColor: 'pink',
  },
  hourHalf: {
    height: '150%',
    backgroundColor: 'blue',
    zIndex: '500',
  },
  appointment: {
    textAlign: 'center',
    width: '100%',
  },
  firstQ: { position: 'absolute', top: '0%' },
  secondQ: { position: 'absolute', top: '25%' },
  thirdQ: { position: 'absolute', top: '50%' },
  forthQ: { position: 'absolute', top: '75%' },

  blank: {
    background: '#dbecf0',
  },
}));

export default function WeekView({
  date,

  firstDateInMonth,
  todayIndex,
  firstDateOfWeek,
  lastDateOfCurrentWeek,
  thisMonthDays,
  appointments,
}) {
  const classes = useStyles();
  const [isAppointmentsLoading, setAppointmentsLoading] = useState(true);

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

  useEffect(() => {
    // if (appointments.length !== 0) {
    setAppointmentsLoading(false);
    // }
  }, [appointments]);
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

  const condition = (appointments, i, j) => {
    let matchedAppointments = [];

    appointments.forEach(appointment => {
      let number = appointment.date.split('-')[0];
      let month = appointment.date.split('-')[1] - 1;
      let year = appointment.date.split('-')[2];
      let time = appointment.hour;

      let day = appointment.day;
      let arr = datesOfWeek();
      let duration = appointment.duration;
      let patientName = appointment.name;
      function getQuarter() {
        let num = '';
        let splittedApp = time.split(':');

        if (splittedApp[1] >= 0 && splittedApp[1] < 15) {
          num = 1;
          return num;
        } else if (splittedApp[1] >= 15 && splittedApp[1] < 30) {
          num = 2;
          return num;
        } else if (splittedApp[1] >= 30 && splittedApp[1] < 45) {
          num = 3;
          return num;
        } else if (splittedApp[1] >= 45 && splittedApp[1] < 59) {
          num = 4;
          return num;
        }
      }

      if (
        number === arr[j].toString() &&
        month.toString() === date.date.clone().month().toString() &&
        year === date.date.clone().year().toString() &&
        time.split(':')[0] === hours[i].split(':')[0] &&
        day === days[j + 1]
      ) {
        const quarter = getQuarter();
        let name = patientName;

        matchedAppointments.push({ name, quarter, duration });
      }
    });
    return matchedAppointments;
  };

  const generateRows = appointments => {
    let rows = [];
    for (let i = 0; i < 24; i++) {
      rows.push(
        <div className={classes.hours} key={i}>
          {hours[i]}
        </div>
      );
      for (let j = 0; j < 7; j++) {
        let matchedAppointments = condition(appointments, i, j);
        let sortedAppointments = matchedAppointments.sort(
          (a, b) => a.quarter - b.quarter
        );

        rows.push(
          <div key={`${i}${j}${i}`} className={classes.emptyCell}>
            {sortedAppointments.map((appointment, i) => (
              <div
                key={i}
                className={`${
                  appointment.duration === '15' && classes.quarterHour
                } ${appointment.duration === '30' && classes.halfHour} ${
                  appointment.duration === '45' && classes.threeQuarters
                } ${appointment.duration === '60' && classes.fullHour} ${
                  appointment.duration === '75' && classes.hourQuarter
                } ${appointment.duration === '90' && classes.hourHalf} ${
                  classes.appointment
                } ${appointment.quarter === 1 && classes.firstQ} ${
                  appointment.quarter === 2 && classes.secondQ
                } ${appointment.quarter === 3 && classes.thirdQ} ${
                  appointment.quarter === 4 && classes.forthQ
                }`}
              >
                {appointment.name}
              </div>
            ))}
          </div>
        );
      }
    }
    return rows;
  };
  return (
    <>
      <div className={classes.container}>
        {generateDays()}
        {isAppointmentsLoading ? 'Loading...' : generateRows(appointments)}
      </div>
    </>
  );
}
