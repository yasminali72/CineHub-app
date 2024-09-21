import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoPlay from "../VideoPlay/VideoPlay";

export default function BannerHome() {
  const { bannerData ,imageURL} = useSelector((state) => state.movieoData);
  const [playVideo, setPlayVideo] = useState(false);
  const [id,setId]=useState()
  const [expoler,setExpoler]=useState()
console.log(bannerData,'bannnnn');
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    
  };

  return (
   <>
   
   <section className="w-full h-full overflow-x-hidden">
      <Slider {...settings}>
        {bannerData.map((data) => (
          
          <div className="min-w-full min-h-[590px]  sm:h-[700px] lg:h-[99vh]  relative bg-green-400" key={data.id}>
            <div className="w-full  min-h-[590px] sm:h-[700px] h-full bg-blue-600  ">
              <img
                src={imageURL + `${data.backdrop_path}`}
                alt={data.title || data.name }
                className="w-full min-h-[590px] sm:h-[700px]  h-full object-cover "
              />
            </div>
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent "></div>
            <div className="container max-w-xl absolute bottom-0 mx-1 md:mx-10">
              <div className="px-2 w-full">
                <h1 className="font-semibold text-xl md:text-3xl lg:text-4xl text-white drop-shadow-md">
                  {data.title || data.name}
                </h1>
                <p className="my-2 text-ellipsis line-clamp-4">
                  {data.overview}
                </p>
                <div className="flex items-center gap-2">
                  <p>Rating: {Number(data.vote_average).toFixed(1)}+ <i class="fa-solid fa-star text-orange-500"></i></p>
                  <span>|</span>
                  <p>View: {Number(data.popularity).toFixed(0)}<i class="fa-solid fa-eye ms-1 text-orange-500"></i></p>
                </div>
                <button onClick={()=>{setPlayVideo(true)
      setId(data.id) ; setExpoler(data.media_type)   }} className="bg-white text-orange-500 py-2 px-4 rounded font-bold my-2 shadow-md hover:bg-gradient-to-l from-red-500 to-orange-500 hover:text-white hover:scale-105 transition-all">
                  Play Now
                </button>
              </div>
            </div>
           
          </div>
           
           
        ))}
      </Slider>
    </section>
    {playVideo && <VideoPlay id={id} expoler={expoler} setPlayVideo={setPlayVideo}/>
          }
  
   </>
  );
}

