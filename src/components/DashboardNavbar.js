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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/';
import { Link, useHistory } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link as RouterLink } from 'react-router-dom';
// const options = ['Check-in patient', 'Quick check-in', 'Check-in new patient'];
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: 'inherit',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
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
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default function DashboardNavbar() {
  const classes = useStyles();
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [quickCheckInModalOpen, setQuickCheckInModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [responsiveAnchorEl, setResponsiveAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };
  const handleClick = event => {
    setResponsiveAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setResponsiveAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(false);
  };
  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          <Link className={classes.link} to="/">
            DontoHub
          </Link>
        </Typography>

        <Button
          component={Link}
          className={`${classes.link} ${classes.patientsHidden}`}
          to="/dashboard"
        >
          Dashboard
        </Button>
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

        {/* Responsive Menu */}
        <Menu
          variant="selectedMenu"
          anchorEl={responsiveAnchorEl}
          keepMounted
          open={Boolean(responsiveAnchorEl)}
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
          to="/lab"
        >
          Lab
        </Button>
        <Button
          component={Link}
          className={`${classes.hidden} ${classes.link}`}
        >
          Inventory
        </Button>
        <ButtonGroup>
          <Button
            color="primary"
            variant="contained"
            component={Link}
            className={`${classes.hidden} ${classes.link}`}
          >
            Dr.Ahmad Zaaza
          </Button>
          <Button
            color="primary"
            onClick={handleMenuOpen}
            size="small"
            variant="contained"
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
      </Toolbar>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link className={classes.link}>Account</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link className={classes.link}>Settings</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link onClick={logout} className={classes.link}>
            Logout
          </Link>
        </MenuItem>
      </StyledMenu>
    </AppBar>
  );
}

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
// const handleModalClose = () => {
//   setCheckInModalOpen(false);
//   setQuickCheckInModalOpen(false);
// };
// const modalBody = (
//   <div className={classes.modal}>
//     <h2 style={{ fontSize: '2em' }}>
//       {selectedIndex === 0 ? 'Check-in patient' : 'Quick check-in'}
//     </h2>
//     <TextField
//       variant="standard"
//       label={`Patient's Name`}
//       autoFocus
//     ></TextField>
//   </div>
// );
