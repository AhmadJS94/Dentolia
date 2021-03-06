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
    // maxHeight: '300px',
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
  addButton: {
    minWidth: '0',
    padding: '0px',
  },
}));
export default function PatientFormsCard({ medicalForms }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Toolbar disableGutters="true" className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ fontSize: '1.2em', fontWeight: 'bold' }}
        >
          Patient Forms
        </Typography>
        <Button
          color="primary"
          size="small"
          className={classes.addButton}
          variant="contained"
        >
          <AddIcon size="small" />
        </Button>
      </Toolbar>
      <Divider />
      <TableContainer style={{ maxHeight: '248px' }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            {/* <TableRow style={{ padding: 0 }}> */}
            <TableCell className={classes.gridHeadTitle}>Form</TableCell>
            <TableCell className={classes.gridHeadTitle}>Date</TableCell>
            {/* </TableRow> */}
          </TableHead>
          <TableBody>
            {medicalForms.map((form, i) => (
              <TableRow>
                <TableCell className={classes.gridHeadTitle}>
                  {form.type}
                </TableCell>
                <TableCell className={classes.gridHeadTitle}>
                  {form.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
