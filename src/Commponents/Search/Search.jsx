import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Card from "../Card/Card";

export default function Search() {
  const { search } = useLocation();
  console.log("searh", search);
  const keyword = search.slice(3).split('%20').join(' ')

  console.log(keyword);
  const [searchData, setSearchData] = useState([]);

  const [numOfPage, setNumOfPage] = useState(1);
  const [prevIsDesiabled, setprevIsDesiabled] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const getSearchData = async () => {
    if (numOfPage === 1) {
      setprevIsDesiabled(true);
    } else {
      setprevIsDesiabled(false);
    }
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=en-US&page=${numOfPage}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
          },
        }
      );
      console.log(data,'searh');
      setSearchData(data.results);
      setNotFound(false);
      if (data.results.length === 0) {
        setNotFound(true);
        setSearchData([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.log(error);
      setNotFound(true);
      setSearchData([]);
    }
  };
  useEffect(() => {
    getSearchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, numOfPage]);
  return (
    <div className="py-24">
      <div className="lg:hidden sticky top-20 z-10 flex justify-center items-center mt-5 ">
        <input
          type="text"
          placeholder="Search here ....  "
          onChange={(e) => navigate(`/search?p=${e.target.value}`)}
          className="text-black w-10/12 md:w-1/2 rounded-full p-2 bg-gray-200"
          value={keyword}
        />
      </div>
      <div className="container w-[85%] mx-auto ">
        <h1 className="text-2xl font-bold  mt-5 mb-5">Search Results</h1>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto gap-4">
          {searchData?.map((data, index) => {
            return <Card data={data} key={data.id} trending={false} expoler={data.media_type}/>;
          })}
        </div>

        <div>
          {notFound && (
            <h1 className="text-4xl font-bold">
              Invalid Page!
              <div className="mt-5">
                
                <Link
                  to={"/"}
                  className="text-2xl  bg-orange-600 text-white p-1 rounded"
                >
                  <i className="fa-solid fa-arrow-left"></i> back to home
                </Link>
              </div>
            </h1>
          )}
        {searchData.length>10 &&  <div className=" flex justify-center items-center my-10 ">
            <button
              className={`px-2 py-1 bg-orange-600 rounded me-2 hover:bg-gray-300 hover:text-orange-600   ${
                prevIsDesiabled
                  ? "disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-white"
                  : ""
              }`}
              onClick={() => {
                if (numOfPage > 1) {
                  setNumOfPage(numOfPage - 1);
                  setprevIsDesiabled(false);
                }
              }}
              disabled={prevIsDesiabled}
            >
              Previous Page
            </button>
            <input
              type="text"
              value={numOfPage}
              className={`w-11 me-2 text-black text-center rounded px-2 py-1 ${
                totalPages === 1 ? "disabled:cursor-not-allowed" : ""
              }`}
              minLength={1}
              onChange={(e) => {
                if (e.currentTarget.value > 1) {
                  setNumOfPage(Number(e.currentTarget.value));
                } else {
                  setNumOfPage(1);
                }
              }}
              disabled={totalPages === 1}
            />
            {!notFound && (
              <button
                className={`px-2 py-1 bg-orange-600 rounded me-2 hover:bg-gray-300 hover:text-orange-600  `}
                onClick={() => setNumOfPage(numOfPage + 1)}
              >
                Next Page
              </button>
            )}
          </div>}
        </div>
      </div>
    </div>
  );
}
