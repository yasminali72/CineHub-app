import React from "react";
import { useSelector } from "react-redux";
import moment from 'moment'
import { useNavigate } from "react-router-dom";
export default function Card({ data ,index,trending,expoler,imageURL}) {
// const {imageURL}=useSelector((state)=>state.movieoData)
const navigate=useNavigate()
  return (
    <>
        <div className="w-[90%] h-80  rounded  relative mx-auto cursor-pointer hover:scale-105 transition-all " onClick={()=>navigate('/'+expoler+'/'+data.id)}>
         {(data.backdrop_path && data.poster_path) ? <img
            className="w-full h-full object-cover rounded"
            src={imageURL + `${data.backdrop_path}` ||`${data.poster_path}`}
            alt={data.title || data.name}

          />:<div className="capitalize rounded text-neutral-400 w-full  h-full flex justify-center items-center bg-neutral-600"><p>image not found</p> </div>}
        
{      trending &&    <div className="absolute top-2 rounded-r-full py-1 px-2 backdrop-blur-3xl bg-black/60"># {index} Trending</div>
}
<div className="absolute bottom-0  w-full h-20  backdrop-blur-3xl rounded-b bg-black/60 text-white p-2">
  <h2 className="line-clamp-1 text-ellipsis text-lg font-semibold">{data.title || data.name}</h2>
  <div className="flex justify-between items-center text-sm text-neutral-400">
  <p >{ moment(data.release_date).format('MMMM Do YYYY')}</p>
{data.vote_average && <p className="bg-black px-2 text-xs font-medium text-white  rounded-full">Rating: {Number(data.vote_average).toFixed(1)}</p>
}  </div>
</div>


        </div>
    </>
  );
}
