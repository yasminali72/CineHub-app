import { createBrowserRouter } from "react-router-dom";
import Details from "./Commponents/Details/Details";
import Home from "./Commponents/Home/Home";
import Layout from "./Commponents/Layout/Layout";
import ExpolerPage from "./Commponents/ExpolerPage/ExpolerPage";
import Search from "./Commponents/Search/Search";
import Login from "./Commponents/Login/Login";

export const router=createBrowserRouter([
    {
      path:'',
      element:<Layout></Layout>,
      children:[
        {index:true,
      element:<Home/>
    
    },
    {
      path:':expoler',
      element:<ExpolerPage/>
    }
    ,{
      path:':expoler/:id',
      element:<Details/>
    },{
      path:'search'
      ,element:<Search/>
    }
  
      ,{
      path:'login',
      element:<Login/>
    }
   

      ]
    }
  ])