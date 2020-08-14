import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Joi from '@hapi/joi';
import Auth from '../Auth';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Grid,
  InputLabel,
  OutlinedInput,
  FormControl,
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

export default function Login({ history }) {
  const [isLoading, setLoading] = useState(false);
  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const schema = Joi.object({
    email: Joi.string().trim().regex(emailReg).required(),
  });
  const [errors, setErrors] = useState({
    email: '',
  });
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateEmail = () => {
    const { email } = formData;
    if (!email) {
      setErrors({
        email: '',
      });
      return;
    }
    const { error } = schema.validate({ email });
    console.log(error);
    if (!error) {
      setErrors({
        email: '',
      });
      return true;
    } else {
      setErrors({
        email: 'Email is Invalid',
      });
      return false;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const { email } = formData;
    if (validateEmail() && email) {
      axios
        .post('http://localhost:5000/login', formData)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          localStorage.token = res.data;
          history.push('/dashboard');
        })
        .catch(err => {
          setLoading(false);
          if (err.response) {
            setErrors({
              email: err.response.data.message,
            });
          } else {
            console.log(`No Internet`);
          }
        });
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
              Login
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
              <InputLabel className={classes.inputLabel}>Email</InputLabel>
              <TextField
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoFocus
                error={Boolean(errors.email)}
                helperText={Boolean(errors.email) && errors.email}
                size="small"
                onBlur={validateEmail}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel className={classes.inputLabel}>Password</InputLabel>
              <TextField
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={Boolean(errors.password) && errors.password}
                size="small"
              />
            </Grid>

            <Grid
              style={{ textAlign: 'center', position: 'relative' }}
              item
              xs={12}
            >
              <Button
                disabled={isLoading}
                // onClick={handleClick}
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
