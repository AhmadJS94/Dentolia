import React, { useState, useContext } from 'react';
//PROBLEM : DISABLED TEXT FIELD IS ADDING WHEN FILLED THEN PRESSED
import axios from 'axios';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  Grid,
  TextField,
  Stepper,
  Button,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
  List,
  ListItemText,
  ListItem,
  Fab,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DashboardNavbar from '../components/DashboardNavbar';
import { makeStyles } from '@material-ui/core/styles';
import PersonalForm from '../components/NewPatient/PersonalForm';
import MedicalForm from '../components/NewPatient/MedicalForm';
import Overview from '../components/NewPatient/Overview';
import { UserData } from '../Contexts/UserDataContext';
import Joi from '@hapi/joi';
import { TrafficOutlined, TramOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const url = 'http://localhost:5000/patients/new';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
    backgroundColor: '#3a5ad9',
    minHeight: '100vh',
  },
  form: { width: '100%', padding: theme.spacing(2) },
  stepper: {
    // background: '#999',
    borderRadius: '10px',
  },

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    // marginLeft: theme.spacing(2),
    textAlign: 'center',
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function NewPatient() {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const history = useHistory();

  const [gridFields, setGridFields] = useState({
    allergies: '',
    conditions: '',
    pastSurgeries: '',
  });
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    address: '',
    phoneNumber: '',
    occupation: '',
  });
  const [medicalInfo, setMedicalInfo] = useState({
    medicalConditions: 'no',
    conditions: [],
    pastMedications: [],
    surgeries: 'no',
    pastSurgeries: [],
    allergies: 'no',
    allergyFrom: [],
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    occuption: null,
    phoneNumber: null,
    address: null,
    age: null,
  });

  const nameReg = /^[a-zA-Z ]*$/;
  const addressReg = /^[a-zA-Z0-9 ]*$/;
  const numReg = /^[0-9]+$/;
  const schema = Joi.object({
    firstName: Joi.string().regex(nameReg).min(2).max(15),
    lastName: Joi.string().regex(nameReg).min(2).max(10),
    address: Joi.string().regex(addressReg).min(3),
    occupation: Joi.string().regex(nameReg).min(3).max(20),
    // age: Joi.string().regex(numReg),
    age: Joi.string().regex(numReg).min(1),
    phoneNumber: Joi.string().regex(numReg).min(5),
  });
  const openConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };
  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };
  const validateData = type => {
    if (personalInfo[type] === '') {
      setErrors({
        ...errors,
        [type]: null,
      });
      return true;
    }
    const value = personalInfo[type];
    const { error } = schema.validate({ [type]: value });
    if (!error) {
      setErrors({
        ...errors,
        [type]: null,
      });
      return true;
    } else {
      setErrors({
        ...errors,
        [type]: 'Invalid Entry',
      });
      return false;
    }
  };

  const proceed = type => {
    let empty = [];
    if (personalInfo.firstName === '') {
      setErrors({
        ...errors,
        firstName: 'Please enter a name',
      });
      return false;
    }
    if (personalInfo.lastName === '') {
      setErrors({
        ...errors,
        lastName: 'Please enter a name',
      });
      return false;
    }
    for (let key in personalInfo) {
      if (personalInfo[key] === '') {
        empty.push(key);
      }
    }
    for (let key in errors) {
      if (errors[key] !== null) {
        return false;
      }
    }
    if (empty.length !== 0) {
      console.log('there are empty inputs');

      setConfirmationDialogOpen(true);
      return false;
    }

    return true;
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Patient Personal Info', 'Patient Medical Info', 'Overview'];
  const newPatientUrl = 'http://localhost:5000/api/patients/new';

  let config = {
    headers: {
      authorization: `Bearer ${localStorage.token}`,
    },
  };
  const createNewPatient = newPatientData => {
    console.log('patient data is ' + { newPatientData });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newPatientData = {
      personalInfo: {
        ...personalInfo,
        // firstName: personalInfo.firstName,
        // lastName: personalInfo.lastName,
        // gender: personalInfo.gender,
        // age: personalInfo.age,
        // address: personalInfo.address,
        // phoneNumber: personalInfo.phoneNumber,
        // occupation: personalInfo.occupation,
      },
      medicalInfo: {
        medicalConditions: medicalInfo.conditions,
        pastSurgeries: medicalInfo.pastSurgeries,
        allergies: medicalInfo.allergyFrom,
      },
    };

    // createNewPatient(newPatientData);
    axios
      .post(newPatientUrl, newPatientData, config)
      .then(res => {
        if (res.data.message === 'Success') {
          console.log(res);
          history.push('/patients');
        }
      })
      .catch(err => console.log(err.response));
  };
  const handlePersonalChange = e => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleMedicalChange = e => {
    setMedicalInfo({
      ...medicalInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const classes = useStyles();

  const handleAddAllergy = () => {
    if (!gridFields.allergies || gridFields.allergies.startsWith(' ')) {
      return;
    }
    let allergyArr = [...medicalInfo.allergyFrom];
    allergyArr.push(gridFields.allergies);
    setMedicalInfo({
      ...medicalInfo,
      allergyFrom: allergyArr,
    });
    setGridFields({
      ...gridFields,
      allergies: '',
    });
  };
  const handleAddCondition = () => {
    if (!gridFields.conditions || gridFields.conditions.startsWith(' ')) {
      return;
    }
    let conditionsArr = [...medicalInfo.conditions];
    conditionsArr.push(gridFields.conditions);
    setMedicalInfo({
      ...medicalInfo,
      conditions: conditionsArr,
    });
    setGridFields({
      ...gridFields,
      conditions: '',
    });
  };
  const handleAddSurgery = () => {
    if (!gridFields.pastSurgeries || gridFields.pastSurgeries.startsWith(' ')) {
      return;
    }
    let pastSurgeriesArr = [...medicalInfo.pastSurgeries];
    pastSurgeriesArr.push(gridFields.pastSurgeries);
    setMedicalInfo({
      ...medicalInfo,
      pastSurgeries: pastSurgeriesArr,
    });
    setGridFields({
      ...gridFields,
      pastSurgeries: '',
    });
  };

  return (
    <div className={classes.root}>
      <DashboardNavbar />
      <Dialog onClose={closeConfirmationDialog} open={confirmationDialogOpen}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContentText>are you sure ?</DialogContentText>
        <DialogActions>
          <Button
            onClick={() => {
              handleNext();
              closeConfirmationDialog();
            }}
          >
            Yes
          </Button>
          <Button onClick={closeConfirmationDialog}>No</Button>
        </DialogActions>
      </Dialog>
      <form className={classes.form}>
        <Stepper
          className={classes.stepper}
          activeStep={activeStep}
          orientation="vertical"
        >
          <Step>
            <StepLabel>
              <Typography variant="h6" style={{ fontWeight: 'unset' }}>
                Patient's Personal Info
              </Typography>
            </StepLabel>

            <StepContent>
              <PersonalForm
                handlePersonalChange={handlePersonalChange}
                personalInfo={personalInfo}
                validateData={validateData}
                errors={errors}
              />

              <div className={classes.actionsContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    proceed() && handleNext();
                  }}
                  className={classes.button}
                >
                  Next
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel
              optional={<Typography variant="caption">Optional</Typography>}
            >
              <Typography variant="h6" style={{ fontWeight: 'unset' }}>
                Patient's Medical Info
              </Typography>
            </StepLabel>
            <StepContent>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={5}>
                  <MedicalForm
                    medicalInfo={medicalInfo}
                    handleMedicalChange={handleMedicalChange}
                  />
                </Grid>
                <Grid item style={{ marginBottom: '8px' }} xs={12} sm={7}>
                  <Grid
                    container
                    component={Paper}
                    spacing={1}
                    alignContent="flex-start"
                  >
                    <Grid
                      // hide if allergies is "no"
                      // style={{
                      //   display:
                      //     medicalInfo.allergies === 'no' ? 'none' : 'block',
                      // }}
                      item
                      xs={12}
                      md={4}
                    >
                      <Typography variant="subtitle1" align="center">
                        Allergies
                      </Typography>
                      <List dense={true} disablePadding={true}>
                        {medicalInfo.allergyFrom.map((item, i) => (
                          <ListItem key={i} disableGutters={true}>
                            <ListItemText
                              style={{ textAlign: 'center' }}
                              primary={item}
                            />
                          </ListItem>
                        ))}

                        <ListItem
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          disableGutters={true}
                        >
                          <TextField
                            disabled={
                              medicalInfo.allergies === 'no' ? true : false
                            }
                            id="allergies"
                            size="small"
                            placeholder="Add.."
                            style={{ width: '8em' }}
                            value={gridFields.allergies}
                            name="allergies"
                            onChange={e =>
                              setGridFields({
                                ...gridFields,
                                [e.target.name]: e.target.value,
                              })
                            }
                          ></TextField>
                          <IconButton onClick={handleAddAllergy} size="small">
                            <AddIcon size="small" />
                          </IconButton>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" align="center">
                        Conditions
                      </Typography>
                      <List dense={true} disablePadding={true}>
                        {medicalInfo.conditions.map((item, i) => (
                          <ListItem key={i} disableGutters={true}>
                            <ListItemText
                              style={{ textAlign: 'center' }}
                              primary={item}
                            />
                          </ListItem>
                        ))}
                        <ListItem
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          disableGutters={true}
                        >
                          <TextField
                            disabled={
                              medicalInfo.medicalConditions === 'no'
                                ? true
                                : false
                            }
                            size="small"
                            placeholder="Add.."
                            style={{ width: '8em' }}
                            value={gridFields.conditions}
                            name="conditions"
                            onChange={e =>
                              setGridFields({
                                ...gridFields,
                                [e.target.name]: e.target.value,
                              })
                            }
                          ></TextField>
                          <IconButton onClick={handleAddCondition} size="small">
                            <AddIcon size="small" />
                          </IconButton>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" align="center">
                        Surgeries
                      </Typography>
                      <List dense={true} disablePadding={true}>
                        {medicalInfo.pastSurgeries.map((item, i) => (
                          <ListItem key={i} disableGutters={true}>
                            <ListItemText
                              style={{ textAlign: 'center' }}
                              primary={item}
                            />
                          </ListItem>
                        ))}
                        <ListItem
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          disableGutters={true}
                        >
                          <TextField
                            disabled={
                              medicalInfo.surgeries === 'no' ? true : false
                            }
                            variant="standard"
                            size="small"
                            placeholder="Add.."
                            style={{ width: '8em' }}
                            value={gridFields.pastSurgeries}
                            name="pastSurgeries"
                            onChange={e =>
                              setGridFields({
                                ...gridFields,
                                [e.target.name]: e.target.value,
                              })
                            }
                          ></TextField>
                          <IconButton onClick={handleAddSurgery} size="small">
                            <AddIcon size="small" />
                          </IconButton>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} item>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step>
            <StepLabel style={{ fontSize: '1.1rem' }}>Overview</StepLabel>
            <StepContent>
              <Overview personalInfo={personalInfo} medicalInfo={medicalInfo} />
              <div className={classes.actionsContainer}>
                <div>
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Finish
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
          {activeStep === steps.length && (
            <Paper elevation={0} className={classes.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
              <Button
                type="submit"
                className={classes.button}
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button className={classes.button}>Save and go to profile</Button>
            </Paper>
          )}
        </Stepper>
      </form>
    </div>
  );
}
