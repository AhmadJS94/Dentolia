import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Toolbar, Fab, Button, CircularProgress } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    cursor: 'pointer',
    padding: 0,
  },
  rowCell: {
    fontSize: '1.2em',
    padding: '8px',
    textAlign: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  innerToolbar: {
    padding: '4px',
    minHeight: '24px',
    justifyContent: 'center',
  },
  innerHeadCell: {
    padding: '4px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2em',
    // borderBottom: '1px solid rgb(119, 110, 110)',
  },
  innerRowCell: {
    padding: '4px',
    textAlign: 'center',
    fontSize: '1.1em',
    // borderBottom: '1px solid rgb(119, 110, 110)',
  },
});

function createData(name, calories, procedure) {
  return {
    name,
    calories,
    procedure,
    history: [
      { date: '2020-01-05', customerId: 'ex #17' },
      { date: '2020-01-02', customerId: '#123 bridge' },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow onClick={() => setOpen(!open)} className={classes.root}>
        <TableCell className={classes.rowCell}>{row.name}</TableCell>
        <TableCell className={classes.rowCell}>{row.hour}</TableCell>
        <TableCell className={classes.rowCell}>{row.duration}</TableCell>
      </TableRow>
      <TableRow style={{ padding: 0 }}>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto">
            <Box className={classes.innerContainer} margin={0}>
              <div className={classes.buttonsContainer}>
                <Button
                  startIcon={<AccountCircleIcon />}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginBottom: '8px' }}
                >
                  Visit Profile
                </Button>
                <Button
                  startIcon={<CancelIcon />}
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ marginBottom: '8px' }}
                >
                  Cancel appoint
                </Button>
              </div>
              <Paper style={{ backgroundColor: '#ECD9BA' }}>
                <Toolbar className={classes.innerToolbar}>
                  <Typography
                    style={{ fontWeight: 'bold' }}
                    variant="h6"
                    component="p"
                    align="center"
                  >
                    Brief history
                  </Typography>
                </Toolbar>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.innerHeadCell}>
                        Date
                      </TableCell>
                      <TableCell className={classes.innerHeadCell}>
                        Procedure
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {row.history.map(historyRow => (
                      <TableRow key={historyRow.date}>
                        <TableCell className={classes.innerRowCell}>
                          {historyRow.date}
                        </TableCell>
                        <TableCell className={classes.innerRowCell}>
                          {historyRow.customerId}
                        </TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [
//   createData('Ahmad Zaaza', '14:00', 'exo'),
//   createData('Lilas Halboni', '18:00', 'restoration'),
//   createData('random name', '15:00', 'restoration'),
//   createData('hi there', '15:00', 'restoration'),
//   createData('test', '15:00', 'restoration'),
// ];
const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: '280px',
    minHeight: '280px',
    overflow: 'auto',
  },
  toolbar: {
    justifyContent: 'space-evenly',
    padding: '6px 6px',
  },
  gridHeadTitle: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    padding: '8px',
    textAlign: 'center',
  },
}));

export default function DashboardAppointmentsTable({
  appointments,
  setAppointmentsToFetch,
  appointmentsToFetch,
  isAppointmentsLoading,
}) {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          onClick={() => setAppointmentsToFetch(moment().subtract(1, 'day'))}
          size="small"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
          align="center"
          style={{ fontWeight: 'bolder' }}
        >
          Today's Appointments
        </Typography>
        <IconButton
          onClick={() => setAppointmentsToFetch(moment().add(1, 'day'))}
          size="small"
        >
          <ArrowForwardIcon />
        </IconButton>
      </Toolbar>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow style={{ padding: 0 }}>
              <TableCell className={classes.gridHeadTitle}>Pt's Name</TableCell>
              <TableCell className={classes.gridHeadTitle}>Time</TableCell>
              <TableCell className={classes.gridHeadTitle}>Procedure</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isAppointmentsLoading ? (
              <CircularProgress />
            ) : (
              appointments.map((row, i) => <Row key={i} row={row} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
