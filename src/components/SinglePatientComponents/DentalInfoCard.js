import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Redirect } from 'react-router-dom';
import {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  InputBase,
  Input,
  Tab,
  Tabs,
  AppBar,
  Container,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Vector from '../../pages/Vector';
import Treatments from './Treatments';
import DentalInfo from './DentalInfo/DentalInfo';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       {...other}
//     >
//       {value === index && <>{children}</>}
//     </div>
//   );
// }
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
}));
export default function DentalInfoCard({ page, history }) {
  const indexToRoute = {
    0: 'chart',
    1: 'treatments',
    // 2: 'dental',
  };
  const routeToIndex = {
    dental: 0,
    treatments: 1,
    // dental: 2,
  };
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState(routeToIndex[page]);
  const handleChange = (event, newValue) => {
    history.push(indexToRoute[newValue]);
    setSelectedValue(newValue);
  };
  return (
    <>
      <AppBar position="static" color="default">
        <Tabs variant="fullWidth" value={selectedValue} onChange={handleChange}>
          <Tab label="Dental Chart" />
          <Tab label="Treatments" />
          <Tab label="Dental Info" />
          <Tab label="Images" />
        </Tabs>
        {selectedValue === 0 && <DentalInfo />}
        {selectedValue === 1 && <Treatments />}
      </AppBar>
    </>
  );
}
