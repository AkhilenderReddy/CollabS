import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Components/Layout';
import ErrorPage from './Pages/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserProvider from './Context/UserContext';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Signup from './Pages/Signup';
import Chat from './Pages/Chat/Chat';
import Clients from './Pages/Clients';
import ClientProfile from './Pages/ClientProfile';
import UpdateClient from './Pages/UpdateClient';
import Influencers from './Pages/Influencers';
import InfluencerProfile from './Pages/InfluencerProfile';
import UpdateInfluencer from './Pages/UpdateInfluencer';
import InfluencerDashboard from './Pages/InfluencerDashboard';
import ClientDashboard from './Pages/ClientDashboard';
import { Analytics } from "@vercel/analytics/react"

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home/>},
      {path: 'login', element: <Login/>},
      {path: 'logout', element: <Logout/>},
      {path: 'signup', element: <Signup/>},
      {path: 'chat', element: <Chat/>},
      {path: 'clients', element: <Clients/>},
      {path: 'Influencers', element: <Influencers/>},
      {path: 'clients/:id', element: <ClientProfile/>},
      {path: 'influencers/:id', element: <InfluencerProfile/>},
      {path: 'clients/:id/edit', element: <UpdateClient/>},
      {path: 'influencers/:id/edit', element: <UpdateInfluencer/>},
      {path: 'influencers/:id/dashboard', element: <InfluencerDashboard/>},
      {path: 'clients/:id/dashboard', element: <ClientDashboard/>},
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <Analytics />
  </React.StrictMode>
);
