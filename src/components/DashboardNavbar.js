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
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link as RouterLink } from 'react-router-dom';
const options = ['Check-in patient', 'Quick check-in', 'Check-in new patient'];
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
}));

export default function DashboardNavbar() {
  const classes = useStyles();
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [quickCheckInModalOpen, setQuickCheckInModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleCheckInClick = event => {
    event.preventDefault();
    if (event.target.textContent === 'Check-in patient') {
      setCheckInModalOpen(true);
    } else if (event.target.textContent === 'Quick check-in') {
      setQuickCheckInModalOpen(true);
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
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
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              DontoHub
            </Link>
          </Typography>
          <Grid
            container
            spacing={1}
            justify="flex-end"
            direction="row"
            alignItems="center"
          >
            <Grid item xs="auto" sm="auto">
              <Button component={RouterLink} to="/patients" color="inherit">
                Patients
              </Button>
              <Button component={RouterLink} to="/logout" color="inherit">
                Logout
              </Button>
              <Button component={RouterLink} to="/inventory" color="inherit">
                Inventory
              </Button>
              <Button
                className={classes.grid}
                component={RouterLink}
                to="/appointments"
                color="inherit"
              >
                Appointments
              </Button>
            </Grid>
            <Grid item xs="auto" sm="auto">
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
