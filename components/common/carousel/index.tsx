'use client';
import React, { ReactNode } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CustomCarousel = ({
  children,
  breakpoint,
}: {
  children: ReactNode;
  breakpoint?: any;
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1199 },
      items: 3,
      slidesToSlide: 3,
    },
    laptop: {
      breakpoint: { max: 1200, min: 899 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 900, min: 599 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Carousel
      itemClass="custom-carousel-item"
      responsive={breakpoint || responsive}
    >
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
