import React, { useEffect, useRef, useState } from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import bgSvg from '../vectors/bg.png';
import Navbar from '../components/Navbar';

import { makeStyles } from '@material-ui/core/styles';
import gsap from 'gsap';
import { Link as RouterLink } from 'react-router-dom';
import HeroBackground from '../vectors/HeroBackground';
import img from '../images/Dentist.jpg';
const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    // background: 'linear-gradient(45deg,#07AFAF,#7037D2)',
    backgroundImage: `url(${bgSvg})`,
    // background: '#888',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    // minHeight: '100vh',
    // width: '100%',
    // display: 'block',
  },
  container: { height: 'auto' },
  button: {
    borderRadius: '25px',
    margin: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    boxShadow: 'none',
    '&:hover': {
      background: 'rgba(245, 246, 255, 0.88)',
      color: 'inherit',
    },
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
  },
  headerGrid: {
    marginTop: theme.spacing(5),
    display: 'grid',
    placeItems: 'center',
    padding: theme.spacing(3),
  },
  title: {
    fontWeight: 'bold',
    color: '#eee',
    fontSize: '70px',
  },
  slogan: { color: '#eee' },
  sloganContainer: {
    padding: theme.spacing(3),
  },
  ctaContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: theme.spacing(3),
  },
  imgContainer: {
    marginTop: theme.spacing(2),
    width: '100%',
    height: '500px',
    // objectFit: 'cover',
  },
}));
export default function Hero() {
  // let count = 1;
  // const repeat = () => {
  //   if (text) {
  //     text.innerHTML = words[count];
  //     count++;
  //     if (count === 2) count = 0;
  //   }
  // };

  // const [headerTween] = useState(
  //   gsap.timeline({ repeat: -1, onRepeat: repeat })
  // );
  // const words = [
  //   'Small Software,<br/>Big Impact',
  //   'A New way for managing <br/> your patients ',
  // ];
  // let text = useRef(null);

  // useEffect(() => {
  //   headerTween.to(text, {
  //     opacity: 1,
  //     duration: 2,
  //     repeatDelay: 2,
  //     repeat: 1,
  //     yoyo: true,
  //   });
  //   console.log(text.textContent);
  // });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Grid container className={classes.container}>
        <Grid item className={classes.headerGrid} xs={12}>
          <Typography
            // ref={current => (text = current)}
            variant="h2"
            align="center"
            className={classes.title}
            // gutterBottom
          >
            Small Software,
            <br /> Big Impact
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.sloganContainer}>
          <Typography
            align="center"
            variant="h6"
            className={classes.slogan}
            gutterBottom
          >
            The ultimate solution for managing your dental office
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.ctaContainer}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Get Started
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
        </Grid>

        {/* <div className={classes.svgBox}> */}
        {/* <HeroBackground /> */}
        {/* </div> */}
      </Grid>
      <div className={classes.imgContainer}>
        <HeroBackground />
      </div>
    </div>
  );
}
