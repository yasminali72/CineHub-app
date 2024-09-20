import React from 'react'
import Card from '../Card/Card';
import Slider from 'react-slick';

export default function HorizontalCards({data,heading,trending,expoler}) {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
    infinite:true
            },
          },
        ],
      };
  return (
    <>
    <div className="container w-[85%]  mx-auto my-10 ">
          <h1 className=" font-bold  text-2xl mb-5 text-white  ps-3 capitalize">
            {heading}
          </h1>
          <div className="">
            <Slider {...settings}>
              {data.map((data, index) => {
                return (
                  <Card
                    key={data.id}
                    data={data}
                    index={index + 1}
                    trending={trending}
                    expoler={data.media_type ||expoler}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
    </>
  )
}
