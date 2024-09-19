import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { setBannerData, setImageURL } from "../../store/movieoSlice";
import BannerHome from "../BannerHome/BannerHome";
import Card from "../Card/Card";
import Slider from "react-slick";

export default function Home() {
  const dispatch = useDispatch();
  const { bannerData} = useSelector((state) => state.movieoData);
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);

  const [numOfPage, setNumOfPage] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const getTeanding = async () => {
    try {
      let { data } = await axios.get(
        "http://api.themoviedb.org/3/trending/all/week",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      dispatch(setBannerData(data.results));
    } catch (error) {
      console.log(error);
    }
  };

  const getCconfiguration = async () => {
    try {
      let { data } = await axios.get(
        "https://api.themoviedb.org/3/configuration",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log("dat", data);
      dispatch(setImageURL(data.images.secure_base_url + "original"));
    } catch (error) {
      console.log(error);
    }
  };

  const getNowPlayingData = async () => {
    if (numOfPage === 1) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${numOfPage}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data);
      setNowPlayingData(data.results);
      setNotFound(false);
      if (data.results.length === 0) {
        setNotFound(true);
      }
    } catch (error) {
      console.log(error, "err");
      setNotFound(true);
      setNowPlayingData([]);
    }
  };

  const getTopRated = async () => {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated
        `,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data);
      setTopRated(data.results);
    } catch (error) {
      console.log(error, "err");
    }
  };

  const getPopular = async () => {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data);
      setPopular(data.results);
    } catch (error) {
      console.log(error, "err");
    }
  };

  const getUpComing = async () => {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming
        `,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data);
      setUpComing(data.results);
    } catch (error) {
      console.log(error, "err");
    }
  };

  const getOnAir = async () => {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/on_the_air
        `,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data);
      setOnAir(data.results);
    } catch (error) {
      console.log(error, "err");
    }
  };
  const getTopRatedTv = async () => {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated

        `,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data);
      setTopRatedTv(data.results);
    } catch (error) {
      console.log(error, "err");
    }
  };

  useEffect(() => {
    getTeanding();
    getCconfiguration();
    getNowPlayingData();
    getTopRated();
    getPopular();
    getUpComing();
    getOnAir()
    getTopRatedTv()
  }, [numOfPage]);

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
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div>
        {/* banner */}
        <BannerHome />

        {/* trending data */}
        <div className="container w-[85%] xl:w-full mx-auto my-10 ">
          <h1 className=" font-bold  text-2xl mb-5 text-white  ps-3">
            Trending Show
          </h1>
          <div className="">
            <Slider {...settings}>
              {nowPlayingData.map((data, index) => {
                return (
                  <Card
                    key={data.id}
                    data={data}
                    index={index + 1}
                    trending={true}
                    expoler={data.media_type}
                  />
                );
              })}
            </Slider>
          </div>
        </div>

        {/* Now playing */}

        <div className="container w-[85%] xl:w-full mx-auto my-10 ">
          <h1 className=" font-bold  text-2xl mb-5 text-white  ps-3">
            Now Playing
          </h1>

          <div>
            <Slider {...settings}>
              {nowPlayingData.map((data, index) => {
                return <Card key={data.id} data={data} trending={false} expoler={'movie'}/>;
              })}
            </Slider>
            {/* for all pages */}
            {/* {notFound && <h1 className="text-4xl font-bold">Invalid page!</h1>}
            <div className=" flex justify-center items-center my-10 ">
              <button
                className={`px-2 py-1 bg-orange-600 rounded me-2 hover:bg-gray-300 hover:text-orange-600   ${
                  isDisabled
                    ? "disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-white"
                    : ""
                }`}
                onClick={() => {
                  if (numOfPage > 1) {
                    setNumOfPage(numOfPage - 1);
                    setIsDisabled(false);
                  }
                }}
                disabled={isDisabled}
              >
                Previous Page
              </button>
              <input
                type="text"
                value={numOfPage}
                className="w-11 me-2 text-black text-center rounded"
                minLength={1}
                onChange={(e) => {
                  if (e.currentTarget.value > 1) {
                    setNumOfPage(Number(e.currentTarget.value));
                  } else {
                    setNumOfPage(1);
                  }
                }}
              />
              <button
                className="px-2 py-1 bg-orange-600 rounded hover:bg-gray-300 hover:text-orange-600"
                onClick={() => setNumOfPage(numOfPage + 1)}
              >
                Next Page
              </button>
            </div> */}
          </div>
        </div>

        {/* top rated data */}
        <div className="container w-[85%] xl:w-full mx-auto my-10 ">
          <h1 className=" font-bold  text-2xl mb-5 text-white  ps-3">
            Top Rated Movies
          </h1>
          <div className="">
            <Slider {...settings}>
              {topRated.map((data, index) => {
                return <Card key={data.id} data={data} trending={false} expoler={'movie'}/>;
              })}
            </Slider>
          </div>
        </div>

        {/* Upcoming data */}
        <div className="container w-[85%] xl:w-full mx-auto my-10 ">
          <h1 className=" font-bold  text-2xl mb-5 text-white  ps-3">
            Up Coming
          </h1>
          <div className="">
            <Slider {...settings}>
              {upComing.map((data, index) => {
                return <Card key={data.id} data={data} trending={false} expoler={'movie'}/>;
              })}
            </Slider>
          </div>
        </div>
        {/* top popular data */}
        <div className="container w-[85%] xl:w-full mx-auto my-10 ">
          <h1 className=" font-bold  text-2xl mb-5 text-white  ps-3 capitalize">
            Popular movies
          </h1>
          <div className="">
            <Slider {...settings}>
              {popular.map((data, index) => {
                return <Card key={data.id} data={data} trending={false} expoler={'movie'} />;
              })}
            </Slider>
          </div>
        </div>
{/* on the top tv */}
<div className="container w-[85%] xl:w-full mx-auto my-10 ">
          <h1 className=" font-bold  text-2xl mb-5 text-white  ps-3 capitalize">
            popular tv 
          </h1>
          <div className="">
            <Slider {...settings}>
              {topRatedTv.map((data, index) => {
                return <Card key={data.id} data={data} trending={false} expoler={'tv'}/>;
              })}
            </Slider>
          </div>
        </div>
{/* on the air data */}
<div className="container w-[85%] xl:w-full mx-auto my-10 ">
          <h1 className=" font-bold  text-2xl mb-5 text-white  ps-3 capitalize">
            On the air
          </h1>
          <div className="">
            <Slider {...settings}>
              {onAir.map((data, index) => {
                return <Card key={data.id} data={data} trending={false} expoler={'tv'}/>;
              })}
            </Slider>
          </div>
        </div>
        

        
      </div>
    </>
  );
}
