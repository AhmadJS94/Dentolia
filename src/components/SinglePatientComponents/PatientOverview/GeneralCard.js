import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  CardContent,
  Button,
  IconButton,
  Grid,
  Paper,
  Toolbar,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  CircularProgress,
  Divider,
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
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
    display: 'flex',
    justifyContent: 'space-around',
    // padding: '16px',
  },
  innerGrid: {
    padding: theme.spacing(2),
  },
}));
export default function GeneralCard() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ fontSize: '1.5em', fontWeight: 'bold' }}
        >
          Ahmad Zaaza
        </Typography>
      </Toolbar>
      <Divider />
      <Grid className={classes.innerGrid} container>
        <Grid item md={6}>
          <Typography variant="subtitle1">Number of Visits : 3 </Typography>
          <Typography variant="subtitle1">Last Visit : 12/8/2020</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
