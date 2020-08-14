import React, { useState } from 'react';
import Tooth from '../vectors/Tooth';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({}));
export default function Vector({ handleToothClick }) {
  const classes = useStyles();
  // const initialState = {
  //   mouseX: null,
  //   mouseY: null,
  // };

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <Tooth handleToothClick={handleToothClick} />
      </div>
    </>
  );
}
