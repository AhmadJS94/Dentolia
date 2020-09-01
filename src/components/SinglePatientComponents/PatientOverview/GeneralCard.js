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
export default function GeneralCard({ deletePatient }) {
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
          <Button onClick={deletePatient} color="secondary">
            Delete this Patient
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
