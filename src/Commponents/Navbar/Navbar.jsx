import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userLogo from "/src/assets/user.png";
import logo from '/src/assets/logo.png'
export default function Navbar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [searhInput, SetSearhInput] = useState('');
  useEffect(() => {
    if (searhInput) {
      navigate(`/search?p=${searhInput}`);
    }
    
  }, [searhInput]);

  function closeMenu() {
    setOpenMenu(false);
  }

  function submit(e) {
    e.preventDefault();
    SetSearhInput(searhInput);
    navigate(`/search?p=${searhInput}`);
  }

  return (
    <>
      <header className="fixed w-full h-20 top-0 left-0 right-0 z-50     shadow-md bg-gray-600 bg-opacity-50">
        <nav className="mx-auto flex max-w-[90%] gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4 justify-center items-center">
          <div className="relative flex items-center justify-start">
            <Link to={""} className="font-bold text-2xl md:text-4xl text-orange-500">
            CineHub
            </Link>
          </div>
          <ul
            className="hidden items-center justify-center gap-6 md:flex  ml-10 
    "
          >
            <li
              className=" 
              "
            >
              <NavLink to={"tv"} className="md:text-base lg:text-lg font-semibold">
                Tv Shows
              </NavLink>
            </li>
            <li
              className="
               "
            >
              <NavLink to={"movie"} className="text-lg font-semibold">
                Movies
              </NavLink>
            </li>
          </ul>
          <div className="flex-grow"></div>
          <div className="hidden lg:flex relative   ">
            <form onSubmit={submit}>
              <input
                className=" appearance-none border-2 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 pl-10 pr-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                id="moviename"
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  SetSearhInput(e.target.value);
                }}
                value={searhInput}
              />
              <button type="submit">
                {" "}
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              </button>
            </form>
            <i className="fa-solid fa-close absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={()=>SetSearhInput('')}></i>

          </div>

          <div className=" items-center justify-center gap-6 md:flex   md:w-10 md:h-10 active:scale-50 transition-all">
            <Link to={"/login"}>
              {" "}
              <img
                src={userLogo}
                alt=""
                className=" rounded-full   w-1/2 h-1/2  md:w-full md:h-full"
              />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
