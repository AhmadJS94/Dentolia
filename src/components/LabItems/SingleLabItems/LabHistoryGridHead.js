import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography, TableSortLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tableCell: {
    padding: '1em',
    ['@media (max-width:450px)']: {
      padding: '0.5em',
    },
  },
  headLabel: {
    fontWeight: 'bold',
    // ['@media (max-width:450px)']: {
    //   fontSize: 'small',
    // },
  },
  label: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ['@media (max-width:470px)']: {
      flexDirection: 'column',
    },
  },
}));
const headCells = [
  {
    id: 'patientName',
    numeric: false,
    disablePadding: false,
    label: `Patient's Name`,
  },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Procedure',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
];

export default function LabHistoryGridHead(props) {
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
            align="left"
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
