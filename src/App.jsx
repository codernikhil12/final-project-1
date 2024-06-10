
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './layouts/Root';
import Home from './Components/Home';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import { ToastContainer } from 'react-toastify';
import Createproduct from './Pages/Createproduct';
import AuthRouter from './utils/AuthRouter';
import ProductList from './Pages/productList';
import EditProduct from './Pages/Editproduct';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },

         {
          element: <AuthRouter />,
          children: [
            {
              path: "createProduct",
              element: <Createproduct />,
            },
            {
              path: "productList",
              element: <ProductList />,
            },
            {
              path: "editProduct/:id", 
              element: <EditProduct />,
            },
  
          ],
        }
      
      ],
    },
  ]);

  return (
  <>
    <h1>Student Server</h1>
    <RouterProvider router={router} />
   
      <ToastContainer />
  </>
  )
}

export default App
