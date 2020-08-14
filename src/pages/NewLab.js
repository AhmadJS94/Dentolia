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
} from '@material-ui/core';

import DashboardNavbar from '../components/DashboardNavbar';
import { makeStyles } from '@material-ui/core/styles';

import LabPersonalInfo from '../components/NewLab/LabPersonalInfo';
import LabBusinessInfo from '../components/NewLab/LabBusinessInfo';

const url = 'http://localhost:5000/patients/new';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
    background: 'linear-gradient(45deg,#07AFAF,#7037D2)',
    minHeight: '100vh',
  },
  form: { width: '100%', padding: theme.spacing(2) },
  stepper: {
    borderRadius: '10px',
  },

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    textAlign: 'center',
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function NewLab() {
  const [personalInfo, setPersonalInfo] = useState({
    labName: '',
    technicianName: '',
    address: '',
    phoneNumber: '',
    speciality: {
      all: true,
      pfm: false,
      zirconia: false,
      orthodontics: false,
      removableProsthodontics: false,
      veneers: false,
    },
  });
  const [businessInfo, setBusinessInfo] = useState({
    ceramicType: '',
    metalType: '',
    pfmPrice: '',
    zirconiaPrice: '',
    veneersPrice: '',
    fullRPDPrice: '',
    partialRPDPrice: '',
    orthoPrice: '',
    vacuumPlatePrice: '',
    metalCrownPrice: '',
  });

  //   const values = {
  //     firstName: personalInfo.firstName,
  //     lastName: personalInfo.lastName,
  //     dateOfBirth: personalInfo.dateOfBirth,
  //     address: personalInfo.address,
  //     gender: personalInfo.gender,
  //     medicalConditions: medicalInfo.medicalConditions,
  //     conditions: medicalInfo.conditions,
  //     pastMedications: medicalInfo.pastMedications,
  //     surgeries: medicalInfo.surgeries,
  //     pastSurgeries: medicalInfo.pastSurgeries,
  //     allergies: Boolean(medicalInfo.allergies),
  //     allergyFrom: medicalInfo.allergyFrom,
  //   };
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Lab Info', 'Lab Business Info', 'Create an ad'];

  const handlePersonalChange = e => {
    console.log(e.target.name);
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckBoxChange = e => {
    const name = e.target.name;
    setPersonalInfo({
      ...personalInfo,
      speciality: {
        ...personalInfo.speciality,
        [name]: e.target.checked,
      },
    });
  };
  const handleBusinessChange = e => {
    setBusinessInfo({
      ...businessInfo,
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
            <StepLabel>
              <Typography variant="h6" style={{ fontWeight: 'unset' }}>
                Lab Info
              </Typography>
            </StepLabel>

            <StepContent>
              <LabPersonalInfo
                handlePersonalChange={handlePersonalChange}
                personalInfo={personalInfo}
                handleCheckBoxChange={handleCheckBoxChange}
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
              <Typography variant="h6" style={{ fontWeight: 'unset' }}>
                Lab's Business Info
              </Typography>
            </StepLabel>
            <StepContent>
              <LabBusinessInfo
                businessInfo={businessInfo}
                handleBusinessChange={handleBusinessChange}
              />

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
          <Step>
            <StepLabel style={{ fontSize: '1.1rem' }}>3</StepLabel>
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
