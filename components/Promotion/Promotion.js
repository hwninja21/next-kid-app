import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Slider from 'react-animated-slider';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import useStyles from './promotion-style';
import img from '~static/images/imgAPI';
import Router from 'next/router';

const sliderData = [
  {
    image: img.hosting[0],
    title: 'Maestro Kids',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.'
  },
  {
    image: img.hosting[1],
    title: 'Maestro Kids',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.',
  },
  {
    image: img.hosting[2],
    title: 'Maestro Kids',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.',
  }
];

function Promotion(props) {
  const classes = useStyles();
  const text = useText();
  const { t } = props;
  return (
    <div>
      <div className={classes.sliderWrap}>
        <Slider
          autoplay={15000}
          previousButton={
            <div></div>
          }
          nextButton={
            <div></div>
          }
        >
          {sliderData.map((item, index) => (
            <div className={classes.item} key={index.toString()} style={{background: `url(${item.image}) 100% 100%`, backgroundSize: 'cover'}}>
              <Grid container>
                <Grid item sm={6} xs={12}>
                  <div className={classes.content}>
                    <img className={classes.contentImage} src="/static/images/icon1.png" alt="icon"/>
                    <Typography variant="h1">
                      <ButtonBase>
                        <span className={classes.text}>
                        {item.title}
                        </span>
                      </ButtonBase>
                    </Typography>
                    <Typography component="p" className={classes.promoImage}>
                      {item.desc}
                    </Typography>
                    <Button variant="contained" color="secondary"><span className={classes.viewmoreBut} size="large" onClick={(ev)=>{
                      ev.preventDefault();
                      Router.push('/activity');
                    }}>{t('hosting-landing:view_more')}</span></Button>
                  </div>
                </Grid>
                <Grid item sm={4} xs={12}>
                </Grid>
              </Grid>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

Promotion.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['hosting-landing'])(Promotion);
