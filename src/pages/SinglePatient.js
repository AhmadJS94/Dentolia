import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Redirect } from 'react-router-dom';
import {
  AppBar,
  Box,
  Tab,
  Tabs,
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
  Modal,
  useMediaQuery,
  CircularProgress,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DashboardNavbar from '../components/DashboardNavbar';
import Tooth from '../vectors/Tooth';
import GeneralInfoCard from '../components/SinglePatientComponents/GeneralInfoCard';
import MedicalRecordCard from '../components/SinglePatientComponents/MedicalRecordCard';
import DentalInfoCard from '../components/SinglePatientComponents/DentalInfoCard';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

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

    minHeight: '100vh',
  },
  mainContainer: {
    padding: theme.spacing(3),
  },
  listStyle: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 250,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: '#bce6d5',
    padding: 0,
  },
  patientName: {
    color: '#fff',
  },
  patientNameBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.5em',
    marginLeft: '1em',
    flexWrap: 'wrap',
  },
  id: {
    fontSize: '20px',
    color: '#FFF',
    fontWeight: '200',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
  confirmationButtonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.5em',
  },
}));
let config = {
  headers: {
    authorization: `Bearer ${localStorage.token}`,
  },
};
export default function SinglePatient({
  match: {
    params: { page, section, _id },
  },
  history,
}) {
  const classes = useStyles();
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
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState(routeToIndex[page]);
  const [dataToEdit, setDataToEdit] = useState({});
  const min480 = useMediaQuery('(min-width:485px)');
  const handleChange = (event, newValue) => {
    history.push(`${indexToRoute[newValue]}`);
    setSelectedValue(newValue);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateData = type => {
    let data;
    if (type === 'personalInfo') {
      data = { ...personalInfo };
      console.log(data);
    } else if (type === 'medicalInfo') {
      data = { ...medicalInfo };
      console.log(data);
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
        // console.log(patientData);
        setLoading(false);
      })
      .catch(err => console.log(err.response));
  }, []);
  return (
    <div className={classes.root}>
      <DashboardNavbar />
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          <Typography align="center" variant="h3">
            Confirmation
          </Typography>
          <Typography
            style={{ marginBottom: '8px' }}
            align="center"
            variant="h5"
          >
            Delete patient Ahmad Zaaza "Add password Confirmation" ?
          </Typography>
          <div className={classes.confirmationButtonContainer}>
            <Button variant="contained" color="primary">
              Yes
            </Button>
            <Button variant="contained" color="primary">
              No
            </Button>
          </div>
        </div>
      </Modal>
      <div className={classes.mainContainer}>
        <div className={classes.headerContainer}>
          <div className={classes.patientNameBox}>
            <Typography
              align="center"
              className={classes.patientName}
              variant="h2"
            >
              {!loading && `${personalInfo.firstName} ${personalInfo.lastName}`}
            </Typography>
            <Typography className={classes.id} variant="subtitle2">
              #26658973
            </Typography>
          </div>
          <div className={classes.buttonsContainer}>
            <Button
              component={Link}
              to="/patients/ahmadzaaza/sessions/new"
              size={min480 ? 'default' : 'small'}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Fill a dental form
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={handleOpen}
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              size={min480 ? 'default' : 'small'}
            >
              Delete this Patient
            </Button>
          </div>
        </div>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={selectedValue}
            onChange={handleChange}
          >
            <Tab label="General Info" />
            <Tab label="Medical Info" />
            <Tab label="Dental Info" />
          </Tabs>
        </AppBar>
        {loading && <CircularProgress />}
        {selectedValue === 0 && !loading && (
          <GeneralInfoCard
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            updateData={updateData}
          />
        )}
        {selectedValue === 1 && !loading && (
          <MedicalRecordCard
            medicalInfo={medicalInfo}
            setMedicalInfo={setMedicalInfo}
            updateData={updateData}
          />
        )}
        {/* {selectedValue === 2 && (
          <DentalInfoCard page={page} history={history} />
        )} */}
        {/* <TabPanel value={value} index={0}>
          <GeneralInfoCard />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MedicalRecordCard />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DentalInfoCard />
        </TabPanel> */}
      </div>
    </div>
  );
}
