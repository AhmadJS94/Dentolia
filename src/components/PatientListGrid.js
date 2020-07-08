import React, { useState, useEffect } from 'react';
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Grid, Button, TextField, InputAdornment } from '@material-ui/core';
import photo from '../images/photo.jpg';
import { Link } from 'react-router-dom';
import SortGridHead from './SortGridHead';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { Link as RouterLink } from 'react-router-dom';

function createData(name, age, phone, visits) {
  return { name, age, phone, visits };
}
const data = [
  createData('zzaaza', 28, 12878921, 8),
  createData('bitch', 26, 873875423, 4),
  createData('Bla', 20, 873875423, 5),
  createData('Souhier', 20, 873875423, 5),
  createData('Bashar', 20, 873875423, 5),
  createData('Roukia', 20, 873875423, 5),
  createData('Hi', 20, 873875423, 5),
  createData('Lolo', 20, 873875423, 5),
];
const useRowStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  box: {
    display: 'flex',
    justifyContent: 'space-around',
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
    justifyContent: 'space-around',
    padding: '20px',
    borderRadius: '0px',
  },
  headingTitle: {
    fontFamily: 'Raleway',
    fontWeight: '300',
  },
}));

function Row(props) {
  const { row } = props;

  const [open, setOpen] = useState(false);

  const classes = useRowStyles();

  return (
    <>
      <TableRow tabIndex={-1} hover className={classes.root}>
        <TableCell size="small">
          <IconButton size="medium" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.age}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.visits}</TableCell>
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
                      to="/patients/ahmadzaaza"
                    >
                      Go to Profile
                    </Button>
                    <Button
                      style={{ marginBottom: '3px' }}
                      size="small"
                      color="secondary"
                      variant="contained"
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
                      {/* <TableCell>Last payment</TableCell> */}
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

  const displayData = query => {
    setPatients(
      data.filter(patient => patient.name.toLowerCase().indexOf(query) !== -1)
    );
  };
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
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/patients/new"
        >
          Add new Patient
        </Button>
        <TextField
          value={searchBar}
          onChange={handleSearchBar}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search for a patient..."
        ></TextField>
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
            {stableSort(patients, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return <Row key={index} row={row} />;
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
