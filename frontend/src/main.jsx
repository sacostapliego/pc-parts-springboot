import React from 'react'
import ReactDOM from 'react-dom/client'
import Customer from './Customer.jsx'
import {ChakraProvider, Text} from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup";
import AuthProvider from "./components/context/AuthContext.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Parts from './Parts.jsx'
import Builds from './Builds.jsx'
import './index.css'
import Home from "./Home.jsx";

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "dashboard",
        element: <Home/>
    },
    {
        path: "dashboard/customers",
        element: <Customer />
    },
    {
        path: "dashboard/parts",
        element: <Parts />
    },
    {
        path: "dashboard/builds",
        element: <Builds />
    },
])

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <ChakraProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
                <ToastContainer />
            </ChakraProvider>
        </React.StrictMode>,
    )
