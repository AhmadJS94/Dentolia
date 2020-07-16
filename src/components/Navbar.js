import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuIcon,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    background: 'inherit',
    boxShadow: 'none',
  },
  toolbar: { minHeight: '64px' },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    textAlign: 'center',
  },
  hidden: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  menu: {
    padding: '0',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  loginHidden: {
    ['@media (max-width:250px)']: {
      display: 'none',
    },
  },
  signupHidden: {
    ['@media (max-width:300px)']: {
      display: 'none',
    },
  },
  loginHiddenMenu: {
    ['@media (min-width:250px)']: {
      display: 'none',
    },
  },
  signupHiddenMenu: {
    ['@media (min-width:300px)']: {
      display: 'none',
    },
  },
}));
export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.root} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              DontoHub
            </Link>
          </Typography>

          <Button
            component={Link}
            className={`${classes.link} ${classes.loginHidden}`}
            to="/login"
          >
            Login
          </Button>
          <Button
            component={Link}
            className={`${classes.link} ${classes.signupHidden}`}
            to="/signup"
          >
            Signup
          </Button>

          <IconButton className={classes.menu} onClick={handleClick}>
            <MoreVertIcon size="small" />
          </IconButton>
          <Menu
            variant="selectedMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              component={Link}
              to="/login"
              className={classes.loginHiddenMenu}
              onClick={handleClose}
            >
              <Link className={`${classes.link}`} color="inherit">
                Login
              </Link>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/signup"
              className={classes.signupHiddenMenu}
              onClick={handleClose}
            >
              <Link className={`${classes.link}`} color="inherit">
                Signup
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.link} component={Link} color="inherit">
                FAQ
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.link} component={Link} color="inherit">
                Pricing
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.link} component={Link} color="inherit">
                About us
              </Link>
            </MenuItem>
          </Menu>
          <Button
            component={Link}
            className={`${classes.hidden} ${classes.link}`}
          >
            FAQ
          </Button>
          <Button
            component={Link}
            className={`${classes.hidden} ${classes.link}`}
          >
            Pricing
          </Button>
          <Button
            component={Link}
            className={`${classes.hidden} ${classes.link}`}
          >
            About us
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
