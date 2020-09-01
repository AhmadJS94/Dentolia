import React, { useState, useEffect } from 'react';
import Tooth from '../vectors/Tooth';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Teeth from '../vectors/Teeth';

const useStyles = makeStyles(theme => ({}));
export default function Vector({ selectedTooth, toggleToothClick }) {
  const classes = useStyles();

  useEffect(() => {
    console.log(selectedTooth);
  }, [selectedTooth]);

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <Teeth
          selectedTooth={selectedTooth}
          toggleToothClick={toggleToothClick}
        />
      </div>
    </>
  );
}

{
  /* <Tooth handleToothClick={handleToothClick} /> */
}
