import {
    createBrowserRouter
  } from "react-router-dom";
import Login from '../login/Login';
import Register from '../register/Register';
import Profile from '../profile/Profile';
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/',
        element: <Register></Register>
    },
    {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
    }
  ]);


  export default router;
