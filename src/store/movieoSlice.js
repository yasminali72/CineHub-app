import { createSlice } from "@reduxjs/toolkit";


const initialState={
bannerData:[],
imageURL:''
}

export const movieoSlice=createSlice({
    name:'movieo',
    initialState,
    reducers:{
        setBannerData:(state,action)=>{
            state.bannerData=action.payload
        },
        setImageURL:(state,action)=>{
            state.imageURL=action.payload
        }
    }
})

export const {setBannerData}=movieoSlice.actions  
export const {setImageURL}=movieoSlice.actions  
export  const movieoReducer= movieoSlice.reducer