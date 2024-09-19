import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function MobileNavgition() {
  return (
    <>
      <section className="md:hidden fixed bottom-0 w-full bg-gray-600">
        <div className="  flex justify-between items-center  py-2 px-1 font-semibold">
          <NavLink to={""} className={"text-center"}>
            <i class="fa-solid fa-house text-3xl"></i>
            <h5>Home</h5>
          </NavLink>
          <NavLink to={"tv"} className={"text-center"}>
            <i class="fa-solid fa-tv text-3xl"></i>
            <h5>Tv Shows</h5>
          </NavLink>
          <NavLink to={"movie"} className={"text-center"}>
            <i class="fa-solid fa-film text-3xl"></i>
            <h5>Movies</h5>
          </NavLink>
          <NavLink to={"search"} className={"text-center"}>
          <i class="fa-solid fa-magnifying-glass text-3xl"></i>
            <h5>Search</h5>
          </NavLink>
        </div>
      </section>
    </>
  );
}
