import React from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Typography } from '@material-ui/core';

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
    paddingLeft: '20px',
    alignContent: 'center',
  },
}));
function Login() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Box className={classes.container} component="div" maxWidth="sm">
        <Typography variant="h3" gutterBottom>
          Login
        </Typography>
        <form className={classes.form}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
      </Box>
    </div>
  );
}

export default Login;
