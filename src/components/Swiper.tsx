import React from 'react';
import { styled } from '@mui/material';
import { Swiper as SwiperJS, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper';
import Img from './Img';

type SwiperProps = {
  images: string[];
};

const StyledSwiper = styled(SwiperJS)({
  height: 250,
});

const Swiper: React.FC<SwiperProps> = ({ images }) => (
  <StyledSwiper pagination={{ dynamicBullets: true }} navigation modules={[Pagination, Navigation]}>
    {images.map((imgSrc) => (
      <SwiperSlide key={imgSrc}>
        <Img src={imgSrc} sx={{ height: '100%', width: '100%' }} />
      </SwiperSlide>
    ))}
  </StyledSwiper>
);

export default Swiper;
