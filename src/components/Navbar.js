import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: 'inherit',
    boxShadow: 'none',
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {},
}));
export default function Navbar() {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              DontoHub
            </Link>
          </Typography>

          <Link className={classes.link} to="/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link className={classes.link} to="/signup">
            <Button className={classes.button} color="inherit">
              Signup
            </Button>
          </Link>
          <Button color="inherit">FAQ</Button>
          <Button color="inherit">Pricing</Button>
          <Button color="inherit">About us</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
