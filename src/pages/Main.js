import React from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Hero from '../components/Hero';
import heroImage from '../images/hero.png';
import HeroBackground from '../vectors/HeroBackground';
import bgSvg from '../vectors/bg.svg';
import WhyDontoHub from '../components/WhyDontoHub';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    background: 'linear-gradient(45deg,#07AFAF,#7037D2)',
    // backgroundImage: `url(${bgSvg})`,
    // background: '#888',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    // width: '100%',
    display: 'block',
  },
}));
export default function Main() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Hero />
      <WhyDontoHub />
    </div>
  );
}
