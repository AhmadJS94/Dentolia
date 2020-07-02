import React from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#3a5ad9',
    minHeight: '100vh',
    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)',
  },
  container: {
    background: 'inherit',
    height: '75vh',
    width: '50vw',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginWord: {
    color: '#fff',
    textAlign: 'center',
  },
  textfield: {
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& label.Mui-focused': {
      color: 'black',
    },
    width: '15em',
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));
function Login() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Box className={classes.container} component="div" maxWidth="sm">
        <Typography className={classes.loginWord} variant="h3" gutterBottom>
          Login
        </Typography>
        <br />
        <form className={classes.form}>
          <TextField
            className={classes.textfield}
            id="outlined-basic"
            label="Username"
            variant="standard"
            color="primary"
            autoFocus
          />
          <TextField
            className={classes.textfield}
            id="outlined-basic"
            label="Password"
            variant="standard"
            type="password"
          />
          <Button className={classes.submitButton} variant="contained">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default Login;
