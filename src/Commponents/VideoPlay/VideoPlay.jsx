import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function VideoPlay({id,expoler,setPlayVideo}) {
    const [playVideoData, setPlayVideoData] = useState([]);
    const [indexOfKey,setIndexOfKey]=useState(0)

    const getVideo  = async () => {
        try {
          let {data} = await axios.get(
            `https://api.themoviedb.org/3/${expoler}/${id}/videos
    
    
            `,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGNjMjM4ZmE0MjIwMTliZjdlNmQyNzBiNjZmNjY1YyIsIm5iZiI6MTcyNjMzNTc1Mi42NTY3NTYsInN1YiI6IjY2ZTViYjM4ZWEyOTY5ODY0ZDc0YmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44BHSGVL4cN29tW3ehGHeIzC48j6olcGIhhkMAgLDQI`,
              },
            }
          );
          console.log(data.results, "vediooooooooooooooooooooooooooooooooooooooooooooooooooooo");
    setPlayVideoData(data.results)
          
    
         
        } catch (error) {
          console.log(error);
          
        }
      };
    useEffect(()=>{
        getVideo()
    },[indexOfKey])
  return (
    <section className='fixed bg-neutral-500 bg-opacity-50 inset-0 z-20' >
        <div className='absolute top-20 end-0 lg:end-20 '>
        <i class="fa-solid fa-xmark text-3xl cursor-pointer" onClick={()=>setPlayVideo(false)}></i>
        </div>
<div className='w-full max-w-screen-lg lg:h-[75vh] bg-black mt-28 mx-auto aspect-video rounded' >
<iframe src={`https://www.youtube.com/embed/${playVideoData[indexOfKey]?.key}`} className='w-full h-full' ></iframe>
</div>
<div className='flex justify-center items-center gap-2 mt-3'>
<button className='bg-gray-500 text-white px-4 py-2  rounded disabled:cursor-not-allowed' onClick={()=>{
    if (indexOfKey>=1) {
      setIndexOfKey(indexOfKey-1)
    }
  }} disabled={indexOfKey===0}>Previous Video</button>
  <button className='bg-orange-500 text-white px-4 py-2  rounded' onClick={()=>setIndexOfKey(indexOfKey+1)}>Next Video</button>
  

</div>
        </section>
  )
}
