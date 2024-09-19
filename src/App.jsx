
import './App.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

import { RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from './Commponents/Login/Login';
import Search from './Commponents/Search/Search';
import Details from './Commponents/Details/Details';
import ExpolerPage from './Commponents/ExpolerPage/ExpolerPage';
import Home from './Commponents/Home/Home';
import Layout from './Commponents/Layout/Layout';
function App() {

  const router=createBrowserRouter([
    {
      path:'',
      element:<Layout/>,
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

  return (
    <>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
    </>
  )
}

export default App
