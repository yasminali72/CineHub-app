import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from 'moment'
import { useNavigate } from "react-router-dom";
export default function Card({ data ,index,trending,expoler}) {
const {imageURL}=useSelector((state)=>state.movieoData)
const navigate=useNavigate()
const [open, setOpen] = useState(false);

  return (
    <>
        <div className="w-[90%] h-80  rounded  relative mx-auto  shadow shadow-neutral-300 border border-gray-500 cursor-pointer " onClick={()=>navigate('/'+expoler+'/'+data.id)}>
         {(data.backdrop_path && data.poster_path) ? <img
            className="w-full h-full object-cover rounded"
            src={imageURL + `${data.backdrop_path}` ||`${data.poster_path}`}
            alt={data.title || data.name}

          />:<div className="capitalize rounded text-neutral-400 w-full  h-full flex justify-center items-center bg-neutral-600"><p>image not found</p> </div>}
        
{      trending &&    <div className="absolute top-2 rounded-r-full py-1 px-2 backdrop-blur-3xl bg-black/60"># {index} Trending</div>
}
<div className="absolute bottom-0  w-full h-20  backdrop-blur-3xl rounded-b bg-black/60 text-white p-2">
  <h2 className="line-clamp-1 text-ellipsis text-lg font-semibold " >{data.title || data.name}</h2>
  <div className="flex justify-between items-center text-sm text-neutral-400">
  <p >{ moment(data.release_date).format('MMMM Do YYYY')}</p>
{data.vote_average && <p className="bg-black px-1 py-1 text-xs md:w-[50%] text-white  rounded-lg text-center">Rating: {Number(data.vote_average).toFixed(1)}<i class="fa-solid fa-star ms-1 text-orange-500"></i></p>
}  </div>
</div>

<div className="absolute top-1 end-1">
{/* <i class={`fa-solid fa-heart text-2xl cursor-pointer  ${heartColor ?'text-orange-500':''}`} onClick={(e)=>{setHeartColor(!heartColor)
e.stopPropagation()}
}></i> */}
<i class=" fa-solid fa-ellipsis bg-slate-300 rounded-full p-1 bg-opacity-50" onClick={(e)=>{e.stopPropagation()
  setOpen(!open)
}}></i>
{open&&<div className="absolute top-7 -start-24 lg:-start-12 bg-white  text-black/80 z-10 rounded w-28" onClick={(e)=>e.stopPropagation()}>
  <p className="flex  items-center p-2 hover:text-orange-500"  onClick={()=>setOpen(false)}><i class="fa-solid fa-heart me-1"></i> Favorite</p>
  <hr className="w-full border border-gray-300"/>
  <p className="flex   items-center p-2 capitalize hover:text-orange-500 " onClick={()=>setOpen(false)}><i class="fa-solid fa-bookmark me-1"></i> watch list</p>
</div>}
</div>


        </div>
    </>
  );
}
