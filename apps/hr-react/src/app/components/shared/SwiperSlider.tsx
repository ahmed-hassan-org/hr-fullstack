import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../../assets/images/1.jpg';
import img2 from '../../../assets/images/2.jpg';
import img3 from '../../../assets/images/3.jpg';
import img4 from '../../../assets/images/4.jpg';
import img5 from '../../../assets/images/6.jpg';
import img6 from '../../../assets/images/7.jpg';
import img7 from '../../../assets/images/8.jpg';
const SwiperSlider = () => {
  return (
    <Swiper
      spaceBetween={20}
      // slidesPerView={3.4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      breakpoints={{
        640: {
          width: 640,
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          width: 768,
          slidesPerView: 2,
        },
        1290: {
          width: 768,
          slidesPerView: 3.4,
        },
      }}
    >
      <SwiperSlide>
        <Card>
          <CardContent>
            <img src={img1} alt="img1" style={{ width: '100%' }} />
          </CardContent>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <CardContent>
            <img src={img2} alt="img2" style={{ width: '100%' }} />
          </CardContent>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <CardContent>
            <img src={img3} alt="img3" style={{ width: '100%' }} />
          </CardContent>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <CardContent>
            <img src={img4} alt="img4" style={{ width: '100%' }} />
          </CardContent>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <CardContent>
            <img src={img5} alt="img5" style={{ width: '100%' }} />
          </CardContent>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <CardContent>
            <img src={img6} alt="img6" style={{ width: '100%' }} />
          </CardContent>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <CardContent>
            <img src={img7} alt="img7" style={{ width: '100%' }} />
          </CardContent>
        </Card>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperSlider;
