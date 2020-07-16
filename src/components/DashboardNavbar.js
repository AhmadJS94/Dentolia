import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  MenuList,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  ButtonGroup,
  Grid,
  Modal,
  TextField,
  IconButton,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link as RouterLink } from 'react-router-dom';
// const options = ['Check-in patient', 'Quick check-in', 'Check-in new patient'];
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: 'inherit',
    boxShadow: 'none',
  },
  title: {
    flexGrow: 1,
  },

  modal: {
    position: 'absolute',
    width: 700,
    height: 540,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  toolbar: { minHeight: '64px' },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    textAlign: 'center',
    cursor: 'pointer',
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
  patientsHidden: {
    ['@media (max-width:250px)']: {
      display: 'none',
    },
  },
  appointmentsHidden: {
    ['@media (max-width:360px)']: {
      display: 'none',
    },
  },
  patientsHiddenMenu: {
    ['@media (min-width:250px)']: {
      display: 'none',
    },
  },
  appointmentsHiddenMenu: {
    ['@media (min-width:300px)']: {
      display: 'none',
    },
  },
}));

export default function DashboardNavbar() {
  const classes = useStyles();
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [quickCheckInModalOpen, setQuickCheckInModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleCheckInClick = event => {
  //   event.preventDefault();
  //   if (event.target.textContent === 'Check-in patient') {
  //     setCheckInModalOpen(true);
  //   } else if (event.target.textContent === 'Quick check-in') {
  //     setQuickCheckInModalOpen(true);
  //   }
  // };

  // const handleMenuItemClick = (event, index) => {
  //   setSelectedIndex(index);
  //   setOpen(false);
  // };

  // const handleToggle = () => {
  //   setOpen(prevOpen => !prevOpen);
  // };

  // const handleClose = event => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }
  //   setOpen(false);
  // };
  const handleModalClose = () => {
    setCheckInModalOpen(false);
    setQuickCheckInModalOpen(false);
  };
  const modalBody = (
    <div className={classes.modal}>
      <h2 style={{ fontSize: '2em' }}>
        {selectedIndex === 0 ? 'Check-in patient' : 'Quick check-in'}
      </h2>
      <TextField
        variant="standard"
        label={`Patient's Name`}
        autoFocus
      ></TextField>
    </div>
  );
  return (
    <div>
      <Modal open={checkInModalOpen} onClose={handleModalClose}>
        {modalBody}
      </Modal>
      <AppBar className={classes.root} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              DontoHub
            </Link>
          </Typography>

          <Button
            component={Link}
            className={`${classes.link} ${classes.patientsHidden}`}
            to="/patients"
          >
            Patients
          </Button>
          <Button
            component={Link}
            className={`${classes.link} ${classes.appointmentsHidden}`}
            to="/appointments"
          >
            Appointments
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
              to="/patients"
              className={classes.patientsHiddenMenu}
              onClick={handleClose}
            >
              <Link className={`${classes.link}`} color="inherit">
                Patients
              </Link>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/appointments"
              className={classes.appointmentsHiddenMenu}
              onClick={handleClose}
            >
              <Link className={`${classes.link}`} color="inherit">
                Appointments
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.link} component={Link} color="inherit">
                Lab
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.link} component={Link} color="inherit">
                Inventory
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.link} component={Link} color="inherit">
                Settings
              </Link>
            </MenuItem>
          </Menu>
          <Button
            component={Link}
            className={`${classes.hidden} ${classes.link}`}
          >
            Lab
          </Button>
          <Button
            component={Link}
            className={`${classes.hidden} ${classes.link}`}
          >
            Inventory
          </Button>
          <Button
            component={Link}
            className={`${classes.hidden} ${classes.link}`}
          >
            Settings
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

{
  /* <Grid item xs="auto" sm="auto">
              <ButtonGroup
                variant="contained"
                color="secondary"
                ref={anchorRef}
                aria-label="split button"
              >
                <Button
                  onClick={event => {
                    handleCheckInClick(event);
                  }}
                >
                  {options[selectedIndex]}
                </Button>
                <Button
                  color="secondary"
                  size="small"
                  aria-controls={open ? 'split-button-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndex}
                              onClick={event =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Grid> */
}
