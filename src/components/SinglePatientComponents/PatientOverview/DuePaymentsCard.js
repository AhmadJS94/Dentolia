import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  CardContent,
  Button,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Grid,
  Paper,
  Toolbar,
  CircularProgress,
  Divider,
} from '@material-ui/core/';
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
function Row(props) {
  const { row } = props;
  // const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell className={classes.rowCell}>{row.name}</TableCell>
      <TableCell className={classes.rowCell}>{row.hour}</TableCell>
      <TableCell className={classes.rowCell}>{row.duration}</TableCell>
    </TableRow>
  );
}
const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '300px',
    overflowY: 'auto',
  },
  gridHeadTitle: {
    fontSize: '1em',
    fontWeight: 'bold',
    padding: '8px 0px',
    textAlign: 'center',
  },
  toolbar: {
    minHeight: '47px',
    justifyContent: 'center',
  },
}));
export default function DuePaymentsCard() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Toolbar disableGutters="true" className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ fontSize: '1.2em', fontWeight: 'bold' }}
        >
          Due payments
        </Typography>
      </Toolbar>
      <Divider />
      <TableContainer style={{ maxHeight: '248px' }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow style={{ padding: 0 }}>
              <TableCell className={classes.gridHeadTitle}>Procedure</TableCell>
              <TableCell className={classes.gridHeadTitle}>Time</TableCell>
              <TableCell className={classes.gridHeadTitle}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // isAppointmentsLoading ? (
              //   <CircularProgress />
              // ) : (
              //   appointments.map((row, i) => <Row key={i} row={row} />)
              // )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
