import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tableCell: {
    paddingLeft: '3px',
    paddingRight: '3px',
  },
}));
export default function NewSessionPrevProcedures() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6">Complete Prev treatments</Typography>
      <TableContainer>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} align="center">
                <Typography style={{ fontWeight: 'bold' }} variant="subtitle1">
                  Session Date
                </Typography>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <Typography style={{ fontWeight: 'bold' }} variant="subtitle1">
                  Tooth No#
                </Typography>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <Typography style={{ fontWeight: 'bold' }} variant="subtitle1">
                  Procedure
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
