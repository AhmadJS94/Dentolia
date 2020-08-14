/* eslint-disable no-useless-computed-key */
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

import { Grid, Button, TextField } from '@material-ui/core';
// import photo from '../images/photo.jpg';
import { Link } from 'react-router-dom';
// import SortGridHead from './SortGridHead';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { Link as RouterLink } from 'react-router-dom';
import LabHistoryGridHead from './LabHistoryGridHead';
// import LabGridHead from './LabGridHead';

function createData(patientName, date, procedure, status) {
  return { patientName, date, procedure, status };
}
const data = [
  createData('Souheil Haddad', '12/5/1099', 'PFM', 'delivered'),
  createData('Zakaria', '12/5/1099', 'Zirconia', 'sent'),
];
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
    justifyContent: 'space-evenly',
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
}));

function Row(props) {
  const { row } = props;

  const [open, setOpen] = useState(false);

  const classes = useRowStyles();

  return (
    <>
      <TableRow
        onClick={() => setOpen(!open)}
        tabIndex={-1}
        hover
        className={classes.root}
      >
        <TableCell>
          <Typography variant="h6">{row.patientName}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h6">{row.date}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h6">{row.procedure}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h6">{row.status}</Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto">
            <Grid className={classes.grid} container spacing={4}>
              <Grid item xs={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    {/* <img
                      src={photo}
                      alt=""
                      style={{
                        width: '225px',
                        height: '150px',
                        objectFit: 'cover',
                      }}
                    /> */}
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
                      to="/lab/labname"
                    >
                      Go to Profile
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

export default function LabHistory() {
  const classes = useRowStyles();
  const [searchBar, setSearchBar] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patients, setPatients] = useState(data);
  const [responsiveSearchBar, setResponsiveSearchBar] = useState(false);
  const displayData = query => {
    setPatients(
      data.filter(
        patient => patient.patientName.toLowerCase().indexOf(query) !== -1
      )
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
          Lab's History
        </Typography>

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
          <LabHistoryGridHead
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
