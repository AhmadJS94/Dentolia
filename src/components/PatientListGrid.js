/* eslint-disable no-useless-computed-key */
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
import axios from 'axios';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  CircularProgress,
  FormControl,
  Snackbar,
} from '@material-ui/core';
import photo from '../images/photo.jpg';
import { Link } from 'react-router-dom';
import SortGridHead from './SortGridHead';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import { Link as RouterLink } from 'react-router-dom';
import { UserData } from '../Contexts/UserDataContext';
import Skeleton from '@material-ui/lab/Skeleton';
import Alert from '@material-ui/lab/Alert';
let config = {
  headers: {
    authorization: `Bearer ${localStorage.token}`,
  },
};
function createData(_id, name, age, phone, visits) {
  return { _id, name, age, phone, visits };
}

const useRowStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
      cursor: 'pointer',
    },
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  grid: {
    padding: theme.spacing(2),
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tableCell: {
    paddingLeft: '3px',
    paddingRight: '3px',
    // ['@media (max-width:450px)']: {
    //   padding: '0.5em',
    // },
    // ['@media (max-width:400px)']: {
    //   padding: '0.2em',
    // },
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  header: {
    background: 'rgba(228, 224, 246, 0.87)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '0px',
  },
  headingTitle: {
    fontFamily: 'Quicksand',
    fontWeight: '300',
  },
  addButton: {
    minWidth: '32px',
  },
  addHidden: {
    ['@media (max-width:360px)']: {
      display: 'none',
    },
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchField: {
    width: '150px',

    ['@media (max-width:520px)']: {
      display: 'none',
    },
  },
  responsiveSearchBar: { width: '150px' },
  dialogContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
}));
let data = [];
function Row(props) {
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [appointment, setAppointment] = useState('');
  const openAppointmentDialog = () => {
    setAppointmentDialogOpen(true);
  };
  const closeAppointmentDialog = () => {
    setAppointmentDialogOpen(false);
    setAppointmentError('');
    setAppointmentSet(false);
    setAppDuration('');
  };
  const { row } = props;
  // const userData = useContext(UserData);
  const [selectedDate, setSelectedDate] = useState(moment());
  // const [selectedDay,setSelectedDay ] = useState(new Date());
  const [open, setOpen] = useState(false);
  // const [isLoading, setLoading] = useState(false);
  const [appDuration, setAppDuration] = useState('');
  const [durationEmpty, setDurationEmpty] = useState(false);
  const [appointmentError, setAppointmentError] = useState('');
  const [appointmentSet, setAppointmentSet] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const classes = useRowStyles();
  const toggleSnackBar = () => {
    setSnackBarOpen(!snackBarOpen);
  };
  const checkAppointmentAvailability = () => {
    let day = selectedDate.clone().format('ddd');
    let date = selectedDate.clone().format('DD-MM-yyyy');
    let hour = selectedDate.clone().format('HH:mm');
    const appointment = {
      day,
      date,
      hour: `${hour}`,
      duration: appDuration,
    };
    axios
      .post('http://localhost:5000/appointments/check', appointment, config)
      .then(res => {
        console.log(res);
        console.log(`i rechedked`);
        if (res.data.message === 'All set') {
          console.log(res.data);
          setAppointmentError('');
          setAppointmentSet(true);
        } else if (res.data.message.includes('Error')) {
          console.log(res.data);
          console.log(`error`);
          const { conflictedAppointments } = res.data;
          const { name, hour } = conflictedAppointments[0];
          setAppointmentError(`Conflicts with ${name} at ${hour}`);
          setAppointmentSet(false);
        }
      })
      .catch(err => console.log(err.response));
  };
  const handleDurationChange = e => {
    console.log(e.target.value);
    console.log(appDuration, 'its duration');
    if (e.target.value === '') {
      setDurationEmpty(true);
      setAppDuration(e.target.value);
    } else {
      setDurationEmpty(false);
      setAppDuration(e.target.value);
    }
  };
  const handleDateChange = date => {
    console.log(date);
    setSelectedDate(date);
  };
  const submitAppointment = () => {
    if (durationEmpty) {
      return;
    }
    if (!appointmentSet) {
      return;
    }
    let day = selectedDate.clone().format('ddd');
    let date = selectedDate.clone().format('DD-MM-yyyy');
    let hour = selectedDate.clone().format('HH:mm');

    const appointment = {
      day,
      date,
      hour: `${hour}`,
      duration: appDuration,
    };
    console.log(appointment);
    console.log(selectedDate);
    axios
      .post(
        `http://localhost:5000/api/patients/${row._id}/appointments`,

        appointment,

        config
      )
      .then(res => {
        if (res.data.message.includes('successfully')) {
          closeAppointmentDialog();
          toggleSnackBar();
        }
      })
      .catch(err => setAppointmentError(`Something went Wrong`));
  };
  useEffect(() => {
    if (appDuration !== '') {
      console.log(`i am rechecking`);
      checkAppointmentAvailability();
    }
  }, [selectedDate, appDuration]);
  return (
    <>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={4500}
        onClose={toggleSnackBar}
      >
        <Alert onClose={toggleSnackBar} severity="success">
          {`Appointment Created for ${
            row.name
          } on ${selectedDate
            .clone()
            .format('DD-MM-yyyy')} at ${selectedDate.clone().format('HH:mm')}`}
        </Alert>
      </Snackbar>
      <Dialog
        maxWidth={'lg'}
        onClose={closeAppointmentDialog}
        open={appointmentDialogOpen}
        style={{ width: '500' }}
      >
        <DialogTitle style={{ textAlign: 'center', fontSize: '2em' }}>
          Set a new Appointment for {row.name}
        </DialogTitle>
        <DialogContent className={classes.dialogContent} dividers={true}>
          <div>
            <DialogContentText style={{ fontSize: '1.2em' }}>
              Select the Date
            </DialogContentText>
            <DateTimePicker
              value={selectedDate}
              disablePast
              onChange={handleDateChange}
              showTodayButton
              minutesStep={5}
              ampm={false}
            />
          </div>
          <div>
            <DialogContentText style={{ fontSize: '1.2em' }}>
              Set the duration
            </DialogContentText>
            <FormControl>
              <Select
                error={durationEmpty}
                value={appDuration}
                onChange={handleDurationChange}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={15}>15 Minutes</MenuItem>
                <MenuItem value={30}>30 Minutes</MenuItem>
                <MenuItem value={45}>45 Minutes</MenuItem>
                <MenuItem value={60}>1 Hour</MenuItem>
                <MenuItem value={75}>1 Hour, 15 minutes</MenuItem>
                <MenuItem value={90}>1 Hour, 30 minutes</MenuItem>
              </Select>
            </FormControl>
            {durationEmpty && (
              <FormHelperText style={{ color: 'red' }}>
                Cannot be Empty
              </FormHelperText>
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ flexWrap: 'wrap' }}>
          {appointmentError && (
            <Chip
              label={appointmentError}
              variant="outlined"
              color="secondary"
            />
          )}
          {appointmentSet && !durationEmpty && (
            <Chip
              label="Appointment Available"
              variant="outlined"
              color="primary"
            />
          )}
          <Button
            disabled={appointmentSet && appDuration !== '' ? false : true}
            onClick={submitAppointment}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <TableRow
        onClick={() => setOpen(!open)}
        tabIndex={-1}
        hover
        className={classes.root}
      >
        <TableCell className={classes.tableCell} align="center">
          <Typography variant="subtitle1">{`${row.name}`}</Typography>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <Typography variant="subtitle1">{row.age}</Typography>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <Typography variant="subtitle1">{row.phone}</Typography>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <Typography variant="subtitle1">8</Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid className={classes.grid} container spacing={4}>
              <Grid item xs={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <img
                      src={photo}
                      alt=""
                      style={{
                        width: '225px',
                        height: '150px',
                        objectFit: 'cover',
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={6}>
                    <Typography variant="h6" gutterBottom component="div">
                      {row.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      {row.phone}
                    </Typography>
                    <Button
                      style={{ marginBottom: '5px' }}
                      color="primary"
                      size="small"
                      variant="contained"
                      component={Link}
                      to={`/patients/${row._id}`}
                    >
                      Go to Profile
                    </Button>
                    <Button
                      style={{ marginBottom: '3px' }}
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={openAppointmentDialog}
                    >
                      Set appointment
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Table component={Paper} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>last Visit</TableCell>
                      <TableCell>Last procedure</TableCell>
                      <TableCell>Last Payment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow component="th" scope="row">
                      <TableCell>The Date</TableCell>
                      <TableCell>Example : endo</TableCell>
                      <TableCell>5000$</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

export default function PatientListGrid() {
  const classes = useRowStyles();
  const [searchBar, setSearchBar] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patients, setPatients] = useState(data);
  const [responsiveSearchBar, setResponsiveSearchBar] = useState(false);
  const [isPatientsLoading, setPatientsLoading] = useState(false);
  const api_url = 'http://localhost:5000/api/patients/all';

  const displayData = query => {
    setPatients(
      data.filter(patient => patient.name.toLowerCase().indexOf(query) !== -1)
    );
  };

  useEffect(() => {
    data = [];
    setPatientsLoading(true);
    axios
      .get(api_url, config)
      .then(res => {
        if (res.data) {
          res.data.forEach(patient => {
            const { personalInfo, _id } = patient;
            const { firstName, lastName, phoneNumber, age } = personalInfo;
            data.push(
              createData(_id, `${firstName} ${lastName}`, age, phoneNumber, 8)
            );
          });

          setPatients(data);
          setPatientsLoading(false);
        }
      })
      .catch(err => console.log(err.response.message));
  }, []);
  useEffect(() => {
    displayData(searchBar);
  }, [searchBar]);
  const handleSearchBar = e => {
    setSearchBar(e.target.value);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <>
      <Box component={Paper} className={classes.header}>
        <Typography className={classes.headingTitle} variant="h5">
          Patient List
        </Typography>
        {!responsiveSearchBar && (
          <Button
            size="small"
            color="primary"
            variant="contained"
            component={RouterLink}
            to="/patients/new"
            className={classes.addButton}
          >
            <AddIcon size="small" />
            <span className={classes.addHidden}>Add new patient</span>
          </Button>
        )}
        <div className={classes.searchContainer}>
          <IconButton
            onClick={() =>
              window.innerWidth < 520 &&
              setResponsiveSearchBar(!responsiveSearchBar)
            }
          >
            <SearchIcon size="small" />
          </IconButton>

          <TextField
            autoFocus
            value={searchBar}
            onChange={handleSearchBar}
            placeholder="Search..."
            className={
              responsiveSearchBar
                ? classes.responsiveSearchBar
                : classes.searchField
            }
          ></TextField>
        </div>
      </Box>
      <TableContainer style={{ borderRadius: '0px' }} component={Paper}>
        <Table>
          <SortGridHead
            classes={classes.visuallyHidden}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {isPatientsLoading ? (
              <CircularProgress />
            ) : (
              stableSort(patients, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return <Row key={index} row={row} />;
                })
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            {!patients && (
              <Skeleton
                variant="rect"
                width={200}
                height={200}
                animation="wave"
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
