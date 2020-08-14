import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DashboardNavbar from '../components/DashboardNavbar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
  Typography,
  Paper,
  Container,
  Button,
  ButtonGroup,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Popper,
  Grow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  Grid,
  Divider,
} from '@material-ui/core';
import Vector from './Vector';
import FirstSection from '../components/Form/FirstSection';
// import NewSessionPrevProcedures from '../components/Session/NewSessionPrevProcedures';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(45deg,#07AFAF,#7037D2)',

    minHeight: '100vh',
  },
  container: {
    background: '#f8f8ff',
    margin: '8px 8px',
    padding: '15px 10px',
    borderRadius: '10px',
  },
  headerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  topSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modeMenu: {
    // padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    // border: '1px solid grey',
    // borderRadius: '8px',
  },
  typography: {
    color: '#fff',
  },
}));
export default function NewForm() {
  const [modeMenuOpen, setModeMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const options = ['Gingival Index (GI)', 'CPITN', ''];
  const [selectedOption, setSelectedOption] = useState(0);
  //Dialog handlers
  const toggleDialogOpen = () => {
    setDialogOpen(prevState => !prevState);
  };
  /////////////////////////

  //Mode Menu handlers
  const handleModeMenuToggle = () => {
    setModeMenuOpen(prevOpen => !prevOpen);
  };
  const handleModeItemClick = (e, i) => {
    setSelectedOption(i);
    setModeMenuOpen(false);
  };
  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setModeMenuOpen(false);
  };
  const [mouse, setMouse] = useState({ mouseX: null, mouseY: null });

  // Tooth Select Handlers
  const [selectedTooth, setSelectedTooth] = useState(null);
  const handleToothClick = event => {
    event.preventDefault();

    setMouse({ mouseX: event.clientX, mouseY: event.clientY });
    setSelectedTooth(event.currentTarget.getAttribute('id'));
  };
  const handleToothMenuClose = () => {
    setMouse({ mouseX: null, mouseY: null });
  };
  //

  // Tooth Menu Click Handlers

  const handleToothMenuClick = () => {
    handleToothMenuClose();
    toggleDialogOpen();
  };
  const anchorRef = useRef(null);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog onClose={toggleDialogOpen} open={dialogOpen}>
        <DialogTitle>
          {selectedTooth && `Tooth #${selectedTooth.slice(6)}`}
        </DialogTitle>
      </Dialog>
      <DashboardNavbar />
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid style={{ textAlign: 'center' }} item xs={12} sm={12} md={8}>
            <Typography className={classes.typohgraphy} variant="h4">
              Dental Examination Form
            </Typography>
          </Grid>
          <Grid style={{ textAlign: 'center' }} item xs={12} sm={12} md={4}>
            <Button fullWidth variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <FirstSection />
        <div className={classes.topSection}>
          <Typography variant="h5">Select a Tooth</Typography>
          <div className={classes.modeMenu}>
            <Typography variant="h5">Mode </Typography>
            <Button
              style={{ margin: '1em' }}
              onClick={handleModeMenuToggle}
              variant="contained"
              color="primary"
              ref={anchorRef}
              endIcon={<ArrowDropDownIcon />}
            >
              {options[selectedOption]}
            </Button>
          </div>
        </div>
        {/* VECTOR */}
        <Grid container className={classes.midPanel}>
          <Grid item xs={12} className={classes.vectorContainer}>
            <Vector
              selectedOption={selectedOption}
              setSelectedTooth={setSelectedTooth}
              handleToothClick={handleToothClick}
              handleToothMenuClose={handleToothMenuClose}
            />
          </Grid>
          {/* <Grid item xs={12} sm={4} className={classes.prevProcedures}>
            <NewSessionPrevProcedures />
          </Grid> */}
        </Grid>
      </div>
      <Menu
        open={mouse.mouseY !== null}
        onClose={handleToothMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mouse.mouseY !== null && mouse.mouseX !== null
            ? { top: mouse.mouseY, left: mouse.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleToothMenuClick}>Plan a treatment</MenuItem>
        <MenuItem onClick={handleToothMenuClose}>See Treatments</MenuItem>
        {selectedOption === 1 && (
          <MenuItem onClick={handleToothMenuClose}>See</MenuItem>
        )}
      </Menu>
      <Popper
        open={modeMenuOpen}
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
                      key={index}
                      selected={index === selectedOption}
                      onClick={event => handleModeItemClick(event, index)}
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
    </div>
  );
}
