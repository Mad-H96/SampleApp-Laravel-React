import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Login from '../views/guest/Login';
import Customers from '../views/private/customers/Index';
import BaseLayout from '../components/layouts/baseLayout';

const routes = [
  { path: "/", element: <Navigate to="login" /> },
  { path: "/login", element: <Login /> },

  {
    path: "/dashboard",
    element: <BaseLayout />,

    children: [
      { path: "customers", element: <Customers /> },
    ]

  },
];

const AppRouter = () => {
  const route = useRoutes(routes);
  return route;
};

export default AppRouter;
