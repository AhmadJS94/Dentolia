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
export default function MedicalConditionsCard({ medicalForm }) {
  const classes = useStyles();
  const getMedicalConditions = () => {
    const arr = [];

    if (medicalForm) {
      for (let item in medicalForm.medicalConditions) {
        if (medicalForm.medicalConditions[item]) {
          arr.push(
            <TableRow>
              <TableCell className={classes.gridHeadTitle}>{item}</TableCell>
            </TableRow>
          );
        }
      }
      if (arr.length === 0) {
        return (
          <TableRow>
            <TableCell className={classes.gridHeadTitle}>
              No Medical conditions were mentioned
            </TableCell>
          </TableRow>
        );
      } else {
        return arr;
      }
    } else {
      return (
        <TableRow>
          <TableCell className={classes.gridHeadTitle}>
            No Medical forms were filled
          </TableCell>
        </TableRow>
      );
    }
  };
  return (
    <Paper className={classes.paper}>
      <Toolbar disableGutters="true" className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ fontSize: '1.2em', fontWeight: 'bold' }}
        >
          Medical Conditions
        </Typography>
      </Toolbar>
      <Divider />
      <TableContainer style={{ maxHeight: '248px' }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableCell className={classes.gridHeadTitle}>Name</TableCell>
          </TableHead>
          <TableBody>{getMedicalConditions()}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
