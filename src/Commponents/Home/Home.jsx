import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { setBannerData, setImageURL } from "../../store/movieoSlice";
import BannerHome from "../BannerHome/BannerHome";
import Card from "../Card/Card";
import Slider from "react-slick";
import HorizontalCards from "../HorizontalCards/HorizontalCards";

export default function Home() {
  const dispatch = useDispatch();
  const { bannerData, imageURL } = useSelector((state) => state.movieoData);
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
        "https://api.themoviedb.org/3/trending/all/day?language=en-US'",
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
       
        <HorizontalCards data={bannerData} heading={'Trending Show'} trending={true} />

        {/* Now playing */}

        <HorizontalCards data={nowPlayingData} heading={'Now Playing'} trending={false} expoler={'movie'}/>


        {/* top rated data */}
        

        <HorizontalCards data={topRated} heading={'Top Rated Movies'} trending={false} expoler={'movie'}/>

        {/* Upcoming data */}
       

<HorizontalCards data={upComing} heading={'Up coming'} trending={false} expoler={'movie'}/>

        {/* top popular data */}
       

        <HorizontalCards data={popular} heading={'Popular movies'} trending={false} expoler={'movie'}/>



{/* on the top tv */}

        <HorizontalCards data={topRatedTv} heading={'popular tv '} trending={false} expoler={'tv'}/>


{/* on the air data */}

        <HorizontalCards data={onAir} heading={'On the air'} trending={false} expoler={'tv'}/>


        
      </div>
    </>
  );
}
