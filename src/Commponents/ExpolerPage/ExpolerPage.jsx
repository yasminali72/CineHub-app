import { useParams } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Card from '../Card/Card';

import { Link, useNavigate } from 'react-router-dom';
export default function ExpolerPage() {
  const {expoler}=useParams()
  const [data, setData] = useState([]);

  const [numOfPage, setNumOfPage] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const navigate=useNavigate()

  const getData = async () => {
    if (numOfPage === 1) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/${expoler}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${numOfPage}&sort_by=vote_average.desc`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
console.log(data);
setData(data.results)
setNotFound(false);
      if (data.results.length === 0) {
        setNotFound(true);
        setData([])
      }
    } catch (error) {
      console.log(error);
      setNotFound(true);
      setData([]);
    }
  };
  useEffect(()=>{
getData()
window.scrollTo({top:0,behavior:'smooth'})
  },[numOfPage,expoler])
  return (
    <>
    <Helmet>
      <title>Expoler</title>
    </Helmet>
    <div className='container w-[85%] mt-20 mx-auto pt-10'>
    <div className="lg:hidden sticky top-20 mb-5 z-10 flex justify-center items-center mt-5 ">
        <input
          type="text"
          placeholder="Search here ....  "
          onChange={(e) => navigate(`/search?p=${e.target.value}`)}
          className="text-black w-10/12 md:w-1/2 rounded-full p-2 bg-gray-200"
        />
      </div>
<h1 className='capitalize ms-4 font-bold text-2xl mb-4'>popular {expoler}</h1>
<div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto gap-y-6'>{data?.map((data, index) => {
                return <Card data={data} key={data.id} trending={false} expoler={expoler}/>
              })}</div>           
              


              <div >
            {notFound && <h1 className="text-4xl font-bold">Invalid page!
            <div className='mt-5'>            <Link to={'/'} className='text-2xl  bg-orange-600 text-white p-1 rounded'><i className='fa-solid fa-arrow-left'></i> back to home </Link>
</div></h1>}
         
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
                className="w-11 me-2 text-black text-center rounded px-2 py-1"
                minLength={1}
                onChange={(e) => {
                  if (e.currentTarget.value > 1) {
                    setNumOfPage(Number(e.currentTarget.value));
                  } else {
                    setNumOfPage(1);
                  }
                }}
              />
           { !notFound &&  <button
                className="px-2 py-1 bg-orange-600 rounded hover:bg-gray-300 hover:text-orange-600"
                onClick={() => setNumOfPage(numOfPage + 1)}
              >
                Next Page
              </button>}
            </div> 
            </div>       
    </div>
   
    </>
  )
}
