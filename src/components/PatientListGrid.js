import React from 'react';
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
import { Grid, Button } from '@material-ui/core';
import photo from '../images/photo.jpg';
import { Link } from 'react-router-dom';
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
}));
const createData = (name, age, phone, visits) => {
  return {
    name,
    age,
    phone,
    visits,
    lastVisit: '',
  };
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
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
                  <Grid item xs={6} justify="flex-end">
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
                  <Grid
                    className={classes.gridItem}
                    item
                    xs={6}
                    justify="space-around"
                  >
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
                      to="/patients/Ahmad_Zaaza"
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

const rows = [
  createData('Ahmad zaaza', 26, '00368472', 4),
  createData('Ahmad zaaza', 26, '00368472', 4),
  createData('Ahmad zaaza', 26, '00368472', 4),
];

export default function PatientListGrid() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell size="small" padding="checkbox" />
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Visits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
