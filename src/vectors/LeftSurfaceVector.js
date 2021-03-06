import React, { useState, useEffect } from 'react';
import Tooth from './Tooth';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  // transition: { transition: '0.05s ease' },
}));
export default function LeftSurfaceVector({
  handleSurfaceClick,
  handleMouseEnter,
  handleMouseLeave,
  toothRef,
}) {
  const classes = useStyles();

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="180px"
        width="180px"
        viewBox="0 0 202 211"
      >
        <g id="left" transform="translate(-78 -289)">
          <g
            id="left_circle"
            data-name="left circle"
            transform="translate(107 324)"
            fill="#f9f6f6"
            className={classes.transition}
            ref={toothRef}
          >
            <path
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleSurfaceClick}
              id="lingual"
              d="M3791.634,133.616s18.28,23.157,51.912,23.157S3896,132.938,3896,132.938l-25.468-22.3a36.354,36.354,0,0,1-26.983,12.336,35.626,35.626,0,0,1-26.6-11.721Z"
              transform="translate(-3773.282 -16.681)"
              fill="#f9f6f6"
              stroke="#707070"
              stroke-width="1"
              className={classes.transition}
            />
            <path
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleSurfaceClick}
              id="buccal"
              d="M3790.838,135.148s18.988-24.512,52.62-24.512,53.026,24.77,53.026,24.77l-25.946,22a36.622,36.622,0,0,0-27.081-12.409c-17.229,0-27.284,12.391-27.284,12.391Z"
              transform="translate(-3773.194 -110.636)"
              fill="#f9f6f6"
              stroke="#707070"
              stroke-width="1"
              className={classes.transition}
            />
            <path
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleSurfaceClick}
              id="distal"
              d="M0,25.979s16.3,17.7,45.609,17.7S92.527,25.335,92.527,25.335L70.153,0S56.223,9.373,45.836,9.373,22.336.6,22.336.6Z"
              transform="translate(43.679 24.432) rotate(90)"
              fill="#f9f6f6"
              stroke="#707070"
              stroke-width="1"
              className={classes.transition}
            />
            <path
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleSurfaceClick}
              id="mesial"
              d="M0,17.255S15.963,0,45.275,0,91.484,17.83,91.484,17.83L69.179,43.3S58.12,34.463,45.338,34.156s-23.349,9.018-23.349,9.018Z"
              transform="translate(140.528 24.766) rotate(90)"
              fill="#f9f6f6"
              stroke="#707070"
              stroke-width="1"
              className={classes.transition}
            />
            <g
              onClick={handleSurfaceClick}
              data-name=" occlusial"
              transform="translate(33.798 33.798)"
              fill="#f9f6f6"
              className={classes.transition}
            >
              <path
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                id="occlusial"
                d="M 36.4661979675293 72.43239593505859 C 31.61056709289551 72.43239593505859 26.90044784545898 71.48152923583984 22.46667861938477 69.606201171875 C 18.18390846252441 67.79473876953125 14.33748817443848 65.20137786865234 11.03424835205078 61.89814758300781 C 7.73101806640625 58.59490966796875 5.13765811920166 54.74848937988281 3.326197862625122 50.46571731567383 C 1.450868010520935 46.03194808959961 0.4999979734420776 41.32182693481445 0.4999979734420776 36.4661979675293 C 0.4999979734420776 31.61056709289551 1.450868010520935 26.90044784545898 3.326197862625122 22.46667861938477 C 5.13765811920166 18.18390846252441 7.73101806640625 14.33748817443848 11.03424835205078 11.03424835205078 C 14.33748817443848 7.73101806640625 18.18390846252441 5.13765811920166 22.46667861938477 3.326197862625122 C 26.90044784545898 1.450868010520935 31.61056709289551 0.4999979734420776 36.4661979675293 0.4999979734420776 C 41.32182693481445 0.4999979734420776 46.03194808959961 1.450868010520935 50.46571731567383 3.326197862625122 C 54.74848937988281 5.13765811920166 58.59490966796875 7.73101806640625 61.89814758300781 11.03424835205078 C 65.20137786865234 14.33748817443848 67.79473876953125 18.18390846252441 69.606201171875 22.46667861938477 C 71.48152923583984 26.90044784545898 72.43239593505859 31.61056709289551 72.43239593505859 36.4661979675293 C 72.43239593505859 41.32182693481445 71.48152923583984 46.03194808959961 69.606201171875 50.46571731567383 C 67.79473876953125 54.74848937988281 65.20137786865234 58.59490966796875 61.89814758300781 61.89814758300781 C 58.59490966796875 65.20137786865234 54.74848937988281 67.79473876953125 50.46571731567383 69.606201171875 C 46.03194808959961 71.48152923583984 41.32182693481445 72.43239593505859 36.4661979675293 72.43239593505859 Z"
                stroke="none"
                className={classes.transition}
              />
              <path
                d="M 36.4661979675293 1 C 31.67784881591797 1 27.03326797485352 1.937576293945313 22.66145706176758 3.786697387695313 C 18.43828964233398 5.572944641113281 14.64527893066406 8.130325317382813 11.38780975341797 11.38780975341797 C 8.130325317382813 14.64527893066406 5.572944641113281 18.43828964233398 3.786697387695313 22.66145706176758 C 1.937576293945313 27.03326797485352 1 31.67784881591797 1 36.4661979675293 C 1 41.25454711914063 1.937576293945313 45.89912796020508 3.786697387695313 50.27093887329102 C 5.572944641113281 54.49411010742188 8.130325317382813 58.287109375 11.38780975341797 61.54458618164063 C 14.64527893066406 64.80207061767578 18.43828964233398 67.35945129394531 22.66145706176758 69.14569854736328 C 27.03326797485352 70.99481964111328 31.67784881591797 71.93239593505859 36.4661979675293 71.93239593505859 C 41.25454711914063 71.93239593505859 45.89912796020508 70.99481964111328 50.27093887329102 69.14569854736328 C 54.49411010742188 67.35945129394531 58.287109375 64.80207061767578 61.54458618164063 61.54458618164063 C 64.80207061767578 58.287109375 67.35945129394531 54.49411010742188 69.14569854736328 50.27093887329102 C 70.99481964111328 45.89912796020508 71.93239593505859 41.25454711914063 71.93239593505859 36.4661979675293 C 71.93239593505859 31.67784881591797 70.99481964111328 27.03326797485352 69.14569854736328 22.66145706176758 C 67.35945129394531 18.43828964233398 64.80207061767578 14.64527893066406 61.54458618164063 11.38780975341797 C 58.287109375 8.130325317382813 54.49411010742188 5.572944641113281 50.27093887329102 3.786697387695313 C 45.89912796020508 1.937576293945313 41.25454711914063 1 36.4661979675293 1 M 36.4661979675293 0 C 56.60591888427734 0 72.93239593505859 16.32646942138672 72.93239593505859 36.4661979675293 C 72.93239593505859 56.60591888427734 56.60591888427734 72.93239593505859 36.4661979675293 72.93239593505859 C 16.32646942138672 72.93239593505859 0 56.60591888427734 0 36.4661979675293 C 0 16.32646942138672 16.32646942138672 0 36.4661979675293 0 Z"
                stroke="none"
                fill="#707070"
              />
            </g>
          </g>
          <text
            id="D"
            transform="translate(78 405)"
            fill="#707070"
            font-size="20"
            font-family="Montserrat-Regular, Montserrat"
          >
            <tspan x="0" y="0">
              D
            </tspan>
          </text>
          <text
            id="B"
            transform="translate(170 308)"
            fill="#707070"
            font-size="20"
            font-family="Montserrat-Regular, Montserrat"
          >
            <tspan x="0" y="0">
              B
            </tspan>
          </text>
          <text
            id="M"
            transform="translate(260 405)"
            fill="#707070"
            font-size="20"
            font-family="Montserrat-Regular, Montserrat"
          >
            <tspan x="0" y="0">
              M
            </tspan>
          </text>
          <text
            id="L"
            transform="translate(172 495)"
            fill="#707070"
            font-size="20"
            font-family="Montserrat-Regular, Montserrat"
          >
            <tspan x="0" y="0">
              L
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}
