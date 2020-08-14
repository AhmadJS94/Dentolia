import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography, TableSortLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
  headLabel: {
    fontWeight: 'bold',
    marginLeft: '25px',
    ['@media (max-width:420px)']: {
      marginLeft: '0',
    },
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    ['@media (max-width:420px)']: {
      flexWrap: 'wrap',
    },
  },
}));
const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Full Name' },
  { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone Number',
  },
  { id: 'visits', numeric: true, disablePadding: false, label: 'Visits' },
];

export default function EnhancedTableHead(props) {
  const headClasses = useStyles();
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={headClasses.tableCell}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className={headClasses.label}
            >
              <Typography className={headClasses.headLabel} variant="subtitle1">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <span className={classes}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
