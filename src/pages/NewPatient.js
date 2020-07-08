import React, { useState } from 'react';
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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DashboardNavbar from '../components/DashboardNavbar';
import { makeStyles } from '@material-ui/core/styles';
import PersonalForm from '../components/NewPatient/PersonalForm';
import MedicalForm from '../components/NewPatient/MedicalForm';

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
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function NewPatient() {
  const [gridFields, setGridFields] = useState({
    allergies: '',
    conditions: '',
    pastSurgeries: '',
  });
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    gender: 'female',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
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

  const values = {
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    dateOfBirth: personalInfo.dateOfBirth,
    address: personalInfo.address,
    gender: personalInfo.gender,
    medicalConditions: medicalInfo.medicalConditions,
    conditions: medicalInfo.conditions,
    pastMedications: medicalInfo.pastMedications,
    surgeries: medicalInfo.surgeries,
    pastSurgeries: medicalInfo.pastSurgeries,
    allergies: Boolean(medicalInfo.allergies),
    allergyFrom: medicalInfo.allergyFrom,
  };
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    'Patient Personal Info',
    'Patient Medical Info',
    'Create an ad',
  ];

  const handlePersonalChange = e => {
    console.log(e.target.name);
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
  const sendRequest = e => {
    e.preventDefault();
    axios.post(url).then(res => console.log(res));
  };
  const handleAddAllergy = () => {
    if (!gridFields.allergies) {
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
    if (!gridFields.conditions) {
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
    if (!gridFields.pastSurgeries) {
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
      surgeries: '',
    });
  };

  return (
    <div className={classes.root}>
      <DashboardNavbar />
      <form className={classes.form}>
        <Stepper
          className={classes.stepper}
          activeStep={activeStep}
          orientation="vertical"
        >
          <Step>
            <StepLabel>Patient's personal info</StepLabel>

            <StepContent>
              <PersonalForm
                handlePersonalChange={handlePersonalChange}
                personalInfo={personalInfo}
              />

              <div className={classes.actionsContainer}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel
              optional={<Typography variant="caption">Optional</Typography>}
            >
              Patient's Medical Info
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
                <Grid item>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>3</StepLabel>
            <StepContent>
              <TextField variant="outlined" label="First name" />
              <TextField variant="outlined" label="First name" />
              <TextField variant="outlined" label="First name" />
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </form>
    </div>
  );
}
