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
import LeftSurfaceComponent from '../../../vectors/LeftSurfaceComponent';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '300px',
    maxHeight: '250px',
    overflowY: 'auto',
  },
  typography: {
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
    padding: theme.spacing(1),
  },
}));
export default function ProceduresSurfacesCard() {
  const classes = useStyles();

  return <LeftSurfaceComponent />;
}
