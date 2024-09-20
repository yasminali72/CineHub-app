import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import { data } from "autoprefixer";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../Divider/Divider";
import Slider from "react-slick";
import VideoPlay from "../VideoPlay/VideoPlay";

export default function Details() {
  const { imageURL } = useSelector((state) => state.movieoData);

  const { id, expoler } = useParams();
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [writers, setWriters] = useState([]);
  const [director, setDirector] = useState([]);
  const [Similar, setSimilar] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [playVideo, setPlayVideo] = useState(false);
  





  let minutes = details?.runtime;
  let hours = Math.floor(minutes / 60); // Get the whole number of hours
  let remainingMinutes = minutes % 60;
  const getDetails = async () => {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/${expoler}/${id} `,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data, "details");
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };


  const getCredits = async () => {
    try {
      let {data} = await axios.get(
        `https://api.themoviedb.org/3/${expoler}/${id}/credits
        `,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data, "credits");
      setCast(data.cast)
      setCrew(data.crew)
      setWriters(data.crew.filter((ele)=>ele.job==='Writer'))
      setDirector(data.crew.filter((ele)=>ele.job==='Director'))

      

     
    } catch (error) {
      console.log(error);
      
    }
  };

  const getSimilar = async () => {
    try {
      let {data} = await axios.get(
        `https://api.themoviedb.org/3/${expoler}/${id}/similar

        `,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data, "similar");
   setSimilar(data.results)

      

     
    } catch (error) {
      console.log(error);
      
    }
  };

  const getRecommendations  = async () => {
    try {
      let {data} = await axios.get(
        `https://api.themoviedb.org/3/${expoler}/${id}/recommendations
        `,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data, "recoooooooooooooooooooooooooooooooooooooooo");
   setRecommendations(data.results)

      

     
    } catch (error) {
      console.log(error);
      
    }
  };

  // https://api.themoviedb.org/3/tv/{series_id}/videos

  
  useEffect(() => {
    getDetails();
    getCredits()
    getSimilar()
    getRecommendations()
    window.scrollTo({top:0,behavior:'smooth'})
  }, [id]);
  console.log(details);

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
        },
      },
    ],
  };
  return (
    <div className="mb-10">
      <div className="w-full h-[450px] relative hidden lg:block ">
        <div className="w-full h-full">
          {details.backdrop_path ? (
            <img
              src={imageURL + `${details.backdrop_path}`}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="capitalize rounded text-neutral-400 w-full  h-full flex justify-center items-center bg-neutral-600">
              <p>image not found</p>{" "}
            </div>
          )}
        </div>
        <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container w-[85%] mx-auto py-20 px-3  lg:py-0 flex  flex-col lg:flex-row  gap-3 lg:gap-10">
        <div className="lg:-mt-28 relative w-fit  mx-auto lg:ml-0 lg:mx-0 ">
          <img
            src={imageURL + `${details.poster_path}`}
            alt=""
            className="w-60 lg:w-[500px] h-80 object-cover rounded"
          />
          <button onClick={()=>{setPlayVideo(true)
          }} className="  py-2 px-4 rounded font-bold my-2 shadow-md bg-gradient-to-l from-red-500 to-orange-500 text-white hover:scale-105 transition-all">
                  Play Now
                </button>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-white mt-2">
            {details.title || details.name}
          </h1>
          <p className="text-neutral-400">{details.tagline}</p>
          <Divider/>
          <div className="flex items-center gap-4 mt-1">
            <p>Rating: {Number(details.vote_average).toFixed(1)}</p>
            <strong>| </strong>
            <p>View: {Number(details.vote_count)}</p>
            <strong>| </strong>
            {details.runtime && (
              <p>
                Duration: {hours} hr {remainingMinutes}min
              </p>
            )}
          </div>
          <Divider/>
          <div className="mt-2 mb-2">
            <h3 className="font-bold text-white mb-1">
              Overview:
              <p className="font-normal text-neutral-400">{details.overview}</p>
            </h3>
          </div>
          <Divider/>
          <div className="flex gap-4 items-center text-center">
            <p><strong>Status</strong> : {details.status}</p>
            <strong>|</strong>
            <p>
              <strong>Release Date</strong> :  {moment(details.release_date).format('MMMM Do YYYY')}
            </p>
            <strong>|</strong>
            <p>
              <strong>Revenue</strong> : {details.revenue}
            </p>
           
          </div>
          <Divider/>
          <div>
            <p><strong>Director</strong>: {director[0]?.name}</p>
            <Divider/>
            <p><strong>Writer</strong>: {writers[0]?.name}</p>
          </div>

          <Divider/>
      <div className="container mx-auto">
        <h1 className="font-bold text-2xl my-2">Star Cast:</h1>
<div className="grid grid-cols-[repeat(auto-fit,96px)] gap-4 ">
  {cast.filter((star)=>star.profile_path).map((star)=><div className="">
    <img src={imageURL+star.profile_path} alt="" className="w-24  h-24 object-cover rounded-full " />
    <p className="text-center font-bold text-sm text-neutral-400">{star.name}</p>
  </div>)}
</div>
      </div>
        </div>

      
      </div>

    { Similar.length>=1 && <div className="container w-[85%]  mx-auto my-10 ">
          <h1 className=" font-bold  text-2xl mb-5 text-white  ps-3 capitalize">
            similar {expoler}
          </h1>
          <div className="">
            <Slider {...settings}>
              {Similar.map((data, index) => {
                return <Card key={data.id} data={data} trending={false} expoler={expoler}/>;
              })}
            </Slider>
          </div>
        </div>}

        {recommendations.length>=1&&  <div className="container w-[85%] xl:w-full mx-auto my-10 ">
          <h1 className=" font-bold  text-2xl mb-5 text-white  ps-3 capitalize">
          Recommendations {expoler}
          </h1>
          <div className="">
            <Slider {...settings}>
              {recommendations.map((data, index) => {
                return <Card key={data.id} data={data} trending={false} expoler={expoler}/>;
              })}
            </Slider>
          </div>
        </div>}


{playVideo && <VideoPlay id={id} expoler={expoler} setPlayVideo={setPlayVideo}/>
}

  </div>
  );
}
