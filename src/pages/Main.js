import React from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Hero from '../components/Hero';
import heroImage from '../images/hero.png';
import HeroBackground from '../vectors/HeroBackground';
// import bgSvg from '../vectors/bg.png';
import WhyDontoHub from '../components/WhyDontoHub';

const useStyles = makeStyles(theme => ({}));
export default function Main() {
  const classes = useStyles();
  return (
    <div>
      <Hero />
      <WhyDontoHub />
    </div>
  );
}
