import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//CONSIDER ADDING BLOODTYPE
import {
  Paper,
  Grid,
  Typography,
  Button,
  Divider,
  ListItemText,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AllergiesCard from './MedicalPage/AllergiesCard';
import MedicalConditionsCard from './MedicalPage/MedicalConditionsCard';
import MedicationsCard from './MedicalPage/MedicationsCard';
import PastSurgeriesCardCard from './MedicalPage/PastSurgeriesCard';
import SpecialNotesCard from './MedicalPage/SpecialNotesCard';
import MedicalGeneralCard from './MedicalPage/MedicalGeneralCard';
const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '621px',
    // padding: '1em',
    overflow: 'auto',
    maxHeight: '621 px',
  },

  list: {
    alignSelf: 'center',
    border: '1px solid rgba(221, 216, 216, 0.7)',
    outline: '0',
    borderRadius: '7px',
    transition: 'all 0.2s ease',

    '&:focus': {
      border: 'none',
      outline: '1px solid #555',
    },
    '&:hover': {
      border: '1px solid #555',
    },
  },
  title: {
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1em',
  },
  inputLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
}));
export default function MedicalRecordCard({
  medicalForms,

  _id,
}) {
  const [isLoading, setLoading] = useState(true);

  const [medicalForm, setMedicalForm] = useState(medicalForms[0]);
  // console.log(medicalForm);
  useEffect(() => {}, []);
  const changeViewedForm = date => {
    let form = medicalForms.filter(form => form.date === date);
    setMedicalForm(form[0]);
  };
  const classes = useStyles();
  return (
    <Grid container className={classes.container} spacing={1}>
      <Grid item xs={12} sm={6} md={5}>
        <MedicalGeneralCard
          medicalForms={medicalForms}
          medicalForm={medicalForm}
          changeViewedForm={changeViewedForm}
          _id={_id}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AllergiesCard medicalForm={medicalForm} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MedicalConditionsCard medicalForm={medicalForm} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MedicationsCard medicalForm={medicalForm} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <PastSurgeriesCardCard medicalForm={medicalForm} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SpecialNotesCard medicalForm={medicalForm} />
      </Grid>
    </Grid>
  );
}
