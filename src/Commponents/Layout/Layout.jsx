import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MobileNavgition from '../MobileNavgition/MobileNavgition';
import { useDispatch } from 'react-redux';
export default function Layout() {
  const dispatch = useDispatch();
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
  useEffect(()=>{
getCconfiguration()
getTeanding()
  },[])
  return (
   <>
   <Navbar/>
   <div className='min-h-[100vh]'><Outlet/></div>
<Footer/>
   <MobileNavgition/>
   </>
  )
}
