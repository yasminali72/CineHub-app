
import './App.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

import { RouterProvider } from 'react-router-dom';

import { router } from './routers';
import { Provider } from 'react-redux';
import { store } from './store/store';
function App() {


  return (
    <>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
    </>
  )
}

export default App
