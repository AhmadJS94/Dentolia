import React, { useState, useEffect } from 'react';
import Tooth from './Tooth';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LeftSurfaceVector from './LeftSurfaceVector';

const useStyles = makeStyles(theme => ({}));
export default function LeftSurfaceComponent() {
  const classes = useStyles();

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <LeftSurfaceVector />
    </div>
  );
}
