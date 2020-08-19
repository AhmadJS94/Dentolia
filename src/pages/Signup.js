import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Joi from '@hapi/joi';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Grid,
  InputLabel,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: 'linear-gradient(45deg,#07AFAF,#7037D2)',
    minHeight: '100vh',
  },
  inputLabel: {
    color: '#888',
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },

  formContainer: {
    width: '50%',
    margin: '2em auto',
    padding: theme.spacing(3),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -9,
    marginLeft: -12,
  },
}));

export default function Signup({ history }) {
  const [isLoading, setLoading] = useState(false);
  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const officeReg = /^[a-zA-Z\s]{0,25}$/;
  const schema = Joi.object({
    email: Joi.string().trim().regex(emailReg),
    password: Joi.string().trim().regex(passReg),
    confirmPassword: Joi.string().trim().regex(passReg),
    officeName: Joi.string().regex(officeReg),
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    officeName: null,
  });
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    officeName: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateData = type => {
    if (!type) {
      for (let item in errors) {
        if (errors[item] !== null) {
          return false;
        }
      }
      return true;
    }
    if (type === 'confirmPassword') {
      if (formData.password !== formData.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: 'Passwords do not match',
        });
        return false;
      }
    }
    if (formData[type] === '') {
      setErrors({
        ...errors,
        [type]: null,
      });
      return true;
    }
    const value = formData[type];
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
  // const validateEmail = () => {
  //   const { email } = formData;
  //   if (!email) {
  //     setErrors({ ...errors, email: '' });
  //     return;
  //   }
  //   const { error } = schema.validate({ email });
  //   console.log(error);
  //   if (!error) {
  //     setErrors({
  //       ...errors,
  //       email: '',
  //     });
  //     return true;
  //   } else {
  //     setErrors({
  //       ...errors,
  //       email: 'Email is Invalid',
  //     });
  //     return false;
  //   }
  // };
  // const validatePassword = () => {
  //   const { password } = formData;
  //   if (!password) {
  //     setErrors({ ...errors, password: '' });
  //     return;
  //   }
  //   const { error } = schema.validate({ password });
  //   if (!error) {
  //     setErrors({
  //       ...errors,
  //       password: '',
  //     });
  //     return true;
  //   } else {
  //     setErrors({
  //       ...errors,
  //       password: 'password is Invalid',
  //     });
  //     return false;
  //   }
  // };
  // const validateConfirmPassword = () => {
  //   const { password, confirmPassword } = formData;
  //   // const {error} = schema.validate({confirmPassword})
  //   if (password === confirmPassword) {
  //     setErrors({
  //       ...errors,

  //       confirmPassword: '',
  //     });
  //     return true;
  //   } else {
  //     setErrors({
  //       ...errors,

  //       confirmPassword: 'passwords do not match',
  //     });
  //     return false;
  //   }
  // };
  // const validateOfficeName = () => {
  //   const { officeName } = formData;
  //   if (!officeName) {
  //     setErrors({ ...errors, officeName: '' });
  //     return;
  //   }
  //   const { error } = schema.validate({ officeName });

  //   if (!error) {
  //     setErrors({
  //       ...errors,
  //       officeName: '',
  //     });
  //     return true;
  //   } else {
  //     setErrors({
  //       ...errors,
  //       officeName: 'office name is Invalid',
  //     });
  //     return false;
  //   }
  // };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const { email, password, officeName, confirmPassword } = formData;
    if (email && password && officeName && confirmPassword && validateData()) {
      axios
        .post('http://localhost:5000/signup', formData)
        .then(res => {
          console.log(res);
          localStorage.token = res.data;
          history.push('/dashboard');
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          if (err.response) {
            if (err.response.data.message.includes('Email')) {
              setErrors({
                ...errors,
                email: err.response.data.message,
              });
            }
          } else {
            console.log(`No Internet`);
          }
        });
      // fetch('http://localhost:5000/signup', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: {
      //     'content-type': 'application/json',
      //   },
      // })
      //   .then(res => {
      //     if (res.statusCode === 200) {
      //       return console.log(res.json());
      //     }
      //     return res.json().then(err => {
      //       throw new Error(err.message);
      //     });
      //   })

      //   .catch(err => console.log(err.message));
    } else {
      setLoading(false);
    }
  };
  return (
    <div className={classes.root}>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Grid
          className={classes.formContainer}
          container
          component={Paper}
          spacing={4}
        >
          <Grid item xs={12}>
            <Typography align="center" variant="h4" gutterBottom>
              Create an account
            </Typography>
            <Divider />
          </Grid>

          <Grid
            item
            container
            direction="column"
            alignContent="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <InputLabel className={classes.inputLabel}>Email*</InputLabel>
              <TextField
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoFocus
                error={Boolean(errors.email)}
                helperText={Boolean(errors.email) && errors.email}
                size="small"
                required
                onBlur={() => validateData('email')}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel className={classes.inputLabel}>
                Password*
                <Typography variant="subtitle2">
                  (must be atleast 8 characters long)
                </Typography>
              </InputLabel>
              <TextField
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={Boolean(errors.password) && errors.password}
                size="small"
                required
                onBlur={() => validateData('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel className={classes.inputLabel}>
                Confirm Password*
              </InputLabel>
              <TextField
                variant="outlined"
                type="password"
                name="confirmPassword"
                error={Boolean(errors.confirmPassword)}
                helperText={
                  Boolean(errors.confirmPassword) && errors.confirmPassword
                }
                value={formData.confirmPassword}
                onChange={handleChange}
                size="small"
                required
                onBlur={() => validateData('confirmPassword')}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel className={classes.inputLabel}>
                Office Name*
                <Typography variant="subtitle2">
                  (Max 25 Characters alphanumeric Only)
                </Typography>
              </InputLabel>
              <TextField
                variant="outlined"
                name="officeName"
                value={formData.officeName}
                onChange={handleChange}
                size="small"
                required
                onBlur={() => validateData('officeName')}
              />
            </Grid>
            <Grid
              style={{ textAlign: 'center', position: 'relative' }}
              item
              xs={12}
            >
              <Button
                disabled={isLoading}
                color="primary"
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
              {isLoading && (
                <CircularProgress
                  size={20}
                  className={classes.buttonProgress}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
