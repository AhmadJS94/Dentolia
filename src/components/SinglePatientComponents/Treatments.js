import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { IconButton, Menu, MenuItem, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
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
});
function createData(
  sessionDate,
  toothNo,
  procedure,
  sessionLength,
  treatmentCompleted
) {
  return { sessionDate, toothNo, procedure, sessionLength, treatmentCompleted };
}
const rows = [
  createData('22/1/92', 11, 'RCT', 24, 'Yes'),
  createData('22/1/92', 12, 'RCT', 37, 'No'),
  createData('22/1/92', 13, 'RCT', 24, 'No'),
  createData('22/1/92', 48, 'RCT', 67, 'Yes'),
  createData('22/1/92', 37, 'RCT', 49, 'Yes'),
];
export default function Treatments() {
  const isSmall = useMediaQuery('(max-width: 500px)');
  const [mouse, setMouse] = useState({ mouseX: null, mouseY: null });

  const handleClick = event => {
    event.preventDefault();
    // setAnchorEl(event.currentTarget);
    setMouse({ mouseX: event.clientX, mouseY: event.clientY });
  };
  const handleClose = () => {
    setMouse({ mouseX: null, mouseY: null });
  };
  const classes = useStyles();
  return (
    <TableContainer>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} align="center">
              <Typography
                style={{ fontWeight: 'bold', fontSize: isSmall && '1.1em' }}
                variant="h6"
              >
                Date
              </Typography>
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              <Typography
                style={{ fontWeight: 'bold', fontSize: isSmall && '1.1em' }}
                variant="h6"
              >
                No#
              </Typography>
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              <Typography
                style={{ fontWeight: 'bold', fontSize: isSmall && '1.1em' }}
                variant="h6"
              >
                Procedure
              </Typography>
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              <Typography
                style={{ fontWeight: 'bold', fontSize: isSmall && '1.1em' }}
                variant="h6"
              >
                Length
              </Typography>
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              <Typography
                style={{ fontWeight: 'bold', fontSize: isSmall && '1.1em' }}
                variant="h6"
              >
                Completed
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
              key={i}
            >
              <TableCell className={classes.tableCell} align="center">
                <Typography
                  style={{ fontSize: isSmall && '1.1em' }}
                  variant="h6"
                >
                  {row.sessionDate}
                </Typography>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <Typography
                  style={{ fontSize: isSmall && '1.1em' }}
                  variant="h6"
                >
                  {row.toothNo}
                </Typography>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <Typography
                  style={{ fontSize: isSmall && '1.1em' }}
                  variant="h6"
                >
                  {row.procedure}
                </Typography>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <Typography
                  style={{ fontSize: isSmall && '1.1em' }}
                  variant="h6"
                >
                  {row.sessionLength}
                </Typography>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <Typography
                  style={{ fontSize: isSmall && '1.1em' }}
                  variant="h6"
                >
                  {row.treatmentCompleted}
                </Typography>
              </TableCell>
              {/* <TableCell className={classes.tableCell} align="center">
                <IconButton size="small">
                  <ArrowDropDownIcon />
                </IconButton>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu
        keepMounted
        open={mouse.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mouse.mouseY !== null && mouse.mouseX !== null
            ? { top: mouse.mouseY, left: mouse.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Session Details</MenuItem>
      </Menu>
    </TableContainer>
  );
}
