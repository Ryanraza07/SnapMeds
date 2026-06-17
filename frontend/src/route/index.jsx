import React from 'react';
import { createBrowserRouter}  from "react-router-dom"
import App from "../App";
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import VerifyOtp from '../pages/VerifyOtp';
import ResetPassword from '../pages/ResetPassword';
import UserMenuMobile from '../pages/UserMenuMobile';
import Dashboard from '../layout/Dashboard';
import Profile from '../pages/Profile';
import MyOrders from '../pages/MyOrders';
import Address from '../pages/Address';
import Category from '../pages/Category';
import SubCategory from '../pages/SubCategory';
import UploadProduct from '../pages/UploadProduct';


const router = createBrowserRouter([
    {
        
            path:"/",
            element: <App/>,
            children:[
                {
                    path:"",
                    element: <Home/>
                },
                {
                    path:"search",
                    element: <SearchPage/>
                },
                {
                    path:"login",
                    element: <Login/>
                },
                {
                    path:"register",
                    element:<Register/>
                },
                {
                    path:"forgot-password",
                    element:<ForgotPassword/>
                },
                {
                    path:"verify-otp",
                    element:<VerifyOtp/>
                },
                {
                    path:"reset-password",
                    element:<ResetPassword/>
                },
                {
                    path:"user",
                    element:<UserMenuMobile/>
                },
                {
                    path: "dashboard",
                    element: <Dashboard />,
                    children:[
                      {
                        path: "profile",
                        element: <Profile/>
                      },
                      {
                        path:"myorders",
                        element:<MyOrders />
                      },
                      {
                        path:"address",
                        element:<Address/>
                      },
                      {
                        path:"Category",
                        element:<Category/>
                      },
                      {
                        path:"subCategory",
                        element:<SubCategory/>
                      },
                      {
                        path:"UploadProduct",
                        element:<UploadProduct/>
                      }
                    ]
                }
                
            ]
       
    }
])

export default router