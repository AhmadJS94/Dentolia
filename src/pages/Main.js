import React from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Hero from '../components/Hero';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#3a5ad9',
    minHeight: '100vh',
    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)',
  },
}));
export default function Main() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Hero />
    </div>
  );
}
