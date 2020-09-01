import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import clsx from 'clsx';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import //   MenuIcon,
//   InboxIcon,
//   MailIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
'@material-ui/icons/';
import {
  useMediaQuery,
  Drawer,
  Toolbar,
  IconButton,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@material-ui/core/';
// import DentalInfoCard from './components/SinglePatientComponents/DentalInfoCard';
import PatientOverview from '../components/SinglePatientComponents/PatientOverview';
import GeneralInfoCard from '../components/SinglePatientComponents/GeneralInfoCard';
import MedicalRecordCard from '../components/SinglePatientComponents/MedicalRecordCard';
import DentalInfoCard from '../components/SinglePatientComponents/DentalInfoCard';
const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  root: {
    flexGrow: 1,

    background: 'linear-gradient(45deg,#07AFAF,#7037D2)',

    maxHeight: '100vh',
    minHeight: '100vh',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.enteringScreen,
      duration: '100ms',
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen,
      duration: '50ms',
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1,
    // },
  },
  drawer: {
    // marginTop: theme.spacing(10),

    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minHeight: '628px',
    overflow: 'auto',

    paddingLeft: theme.spacing(10),
  },
  menuButton: {
    marginRight: 36,
  },
  listItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
}));
export default function SinglePatient({
  match: {
    params: { page, section, _id },
  },
}) {
  const history = useHistory();
  let config = {
    headers: {
      authorization: `Bearer ${localStorage.token}`,
    },
  };
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(3);
  const indexToRoute = {
    0: 'general',
    1: 'medical',
    2: 'dental',
  };
  const routeToIndex = {
    general: 0,
    medical: 1,
    dental: 2,
  };
  const [personalInfo, setPersonalInfo] = useState(null);
  const [medicalInfo, setMedicalInfo] = useState(null);
  const [medicalForms, setMedicalForms] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [selectedValue, setSelectedValue] = useState(routeToIndex[page]);
  const [dataToEdit, setDataToEdit] = useState({});
  const min480 = useMediaQuery('(min-width:485px)');
  const handleChange = (event, newValue) => {
    history.push(`${indexToRoute[newValue]}`);
    setSelectedValue(newValue);
  };
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleOpen = () => {
    setConfirmationOpen(true);
  };

  const handleClose = () => {
    setConfirmationOpen(false);
  };
  const deletePatient = async () => {
    try {
      let response = await axios.delete(
        `http://localhost:5000/api/patients/delete/${_id}`,
        config
      );
      console.log(response);
      if (response) {
        console.log(response.message);
        console.log(`deleted`);
        history.push('/patients');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const updateData = type => {
    let data;
    if (type === 'personalInfo') {
      data = { ...personalInfo };
    } else if (type === 'medicalInfo') {
      data = { ...medicalInfo };
    }
    axios
      .post(
        `http://localhost:5000/api/patients/${_id}/edit/${type}`,
        data,
        config
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err.response));
  };
  useEffect(() => {
    // setLoading(true);
    axios
      .get(`http://localhost:5000/api/patients/${_id}`, config)
      .then(res => {
        console.log(res.data);
        setPersonalInfo(res.data.personalInfo);
        setMedicalInfo(res.data.medicalInfo);
        setMedicalForms(res.data.medicalForms);

        setLoading(false);
      })
      .catch(err => console.log(err.response));
  }, []);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <div className={classes.root}>
      <DashboardNavbar />
      <Drawer
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        PaperProps={{ style: { top: '64px' } }}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
      >
        <List>
          <ListItem
            className={selectedValue === 0 && classes.listItem}
            onClick={() => setSelectedValue(0)}
            button
          >
            <ListItemIcon style={{ marginLeft: '7px' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'Overview'} />
          </ListItem>
          <ListItem
            className={selectedValue === 1 && classes.listItem}
            onClick={() => setSelectedValue(1)}
            button
          >
            <ListItemIcon style={{ marginLeft: '7px' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'Personal Info'} />
          </ListItem>
          <ListItem
            className={selectedValue === 2 && classes.listItem}
            onClick={() => setSelectedValue(2)}
            button
          >
            <ListItemIcon style={{ marginLeft: '7px' }}>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary={'Health Info'} />
          </ListItem>
          <ListItem
            className={selectedValue === 3 && classes.listItem}
            onClick={() => setSelectedValue(3)}
            button
          >
            <ListItemIcon style={{ marginLeft: '7px' }}>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary={'Dental Info'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem onClick={() => setSelectedValue(4)} button>
            <ListItemIcon style={{ marginLeft: '7px' }}>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={'text'} />
          </ListItem>
          <ListItem onClick={() => setSelectedValue(5)} button>
            <ListItemIcon style={{ marginLeft: '7px' }}>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={'text'} />
          </ListItem>
          <ListItem onClick={() => setSelectedValue(6)} button>
            <ListItemIcon style={{ marginLeft: '7px' }}>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={'text'} />
          </ListItem>
        </List>
      </Drawer>
      <Paper className={classes.content}>
        {selectedValue === 0 && !loading && (
          <PatientOverview
            medicalForms={medicalForms}
            deletePatient={deletePatient}
          />
        )}
        {selectedValue === 1 && !loading && (
          <GeneralInfoCard
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            updateData={updateData}
          />
        )}
        {selectedValue === 2 && !loading && (
          <MedicalRecordCard
            medicalForms={medicalForms}
            // setMedicalInfo={setMedicalInfo}
            // updateData={updateData}
            _id={_id}
          />
        )}
        {selectedValue === 3 && !loading && (
          <DentalInfoCard
            medicalForms={medicalForms}
            // setMedicalInfo={setMedicalInfo}
            // updateData={updateData}
            _id={_id}
          />
        )}
      </Paper>
    </div>
  );
}
