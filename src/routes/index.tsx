import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

// components
import PrivateRoute from './PrivateRoute';
import Login from '@/pages/auth/Login';

// lazy load all the views

// auth
const Register = React.lazy(() => import('../pages/auth/Register'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const ForgotPassword = React.lazy(() => import('../pages/auth/ForgotPassword'));
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'));

// dashboard
const Dashboard = React.lazy(() => import('../pages/Dashboard'));

// pages
const Librarians = React.lazy(() => import('../pages/Librarians'));
const Readers = React.lazy(() => import('../pages/Readers'));
const Categories = React.lazy(() => import('../pages/Categories'));
const Materials = React.lazy(() => import('../pages/Materials'));
const Authors = React.lazy(() => import('../pages/Authors'));
const Sales = React.lazy(() => import('../pages/Sales'));
const CustomerCares = React.lazy(() => import('../pages/Notifications/CustomerCare'));
const BulkNotifications = React.lazy(() => import('../pages/Notifications/BulkNotifications'));
const MobileSetting = React.lazy(() => import('../pages/Settings/MobileSettings'));
const Packages = React.lazy(() => import('../pages/Settings/Packages'));
const GeneralSettings = React.lazy(() => import('../pages/Settings/GeneralSettings'));
const Orders = React.lazy(() => import('../pages/Shop/Orders'));
const ProductCategory = React.lazy(() => import('../pages/Shop/ProductCategory'));
const Products = React.lazy(() => import('../pages/Shop/Products'));

export interface RoutesProps {
  path: RouteProps['path'];
  name?: string;
  element?: RouteProps['element'];
  route?: any;
  exact?: boolean;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

// dashboards
const dashboardRoutes: RoutesProps = {
  path: '/admin',
  name: 'Dashboards',
  icon: 'home',
  header: 'Navigation',
  children: [
    {
      path: '/dashboard',
      name: 'Root',
      element: <Dashboard />,
      route: PrivateRoute,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      element: <Dashboard />,
      route: PrivateRoute,
    },
    {
      path: '/librarians',
      name: 'Librarians',
      element: <Librarians />,
      route: PrivateRoute,
    },
    {
      path: '/readers',
      name: 'Readers',
      element: <Readers />,
      route: PrivateRoute,
    },
    {
      path: '/categories',
      name: 'Categories',
      element: <Categories />,
      route: PrivateRoute,
    },
    {
      path: '/materials',
      name: 'Materials',
      element: <Materials />,
      route: PrivateRoute,
    },
    {
      path: '/authors',
      name: 'Authors',
      element: <Authors />,
      route: PrivateRoute,
    },
    {
      path: '/sales',
      name: 'Sales',
      element: <Sales />,
      route: PrivateRoute,
    },
    {
      path: '/settings/mobile-settings',
      name: 'MobileSetting',
      element: <MobileSetting />,
      route: PrivateRoute,
    },
    {
      path: '/settings/packages',
      name: 'Packages',
      element: <Packages />,
      route: PrivateRoute,
    },
    {
      path: '/settings/general-settings',
      name: 'GeneralSettings',
      element: <GeneralSettings />,
      route: PrivateRoute,
    },
    {
      path: '/notifications/customer-care',
      name: 'CustomerCares',
      element: <CustomerCares />,
      route: PrivateRoute,
    },
    {
      path: '/notifications/bulk-notifications',
      name: 'BulkNotifications',
      element: <BulkNotifications />,
      route: PrivateRoute,
    },
    {
      path: '/shop/orders',
      name: 'Orders',
      element: <Orders />,
      route: PrivateRoute,
    },
    {
      path: '/shop/product-category',
      name: 'ProductCategory',
      element: <ProductCategory />,
      route: PrivateRoute,
    },
    {
      path: '/shop/product',
      name: 'Products',
      element: <Products />,
      route: PrivateRoute,
    },
  ],
};

// auth
const authRoutes: RoutesProps[] = [
  {
    path: '/',
    name: 'Login',
    element: <Login />,
    route: Route,
  },
  {
    path: '/auth/register',
    name: 'Register',
    element: <Register />,
    route: Route,
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    element: <Logout />,
    route: Route,
  },
  {
    path: '/auth/forgot-password',
    name: 'Forgot Password',
    element: <ForgotPassword />,
    route: Route,
  },
  {
    path: '/auth/lock-screen',
    name: 'Lock Screen',
    element: <LockScreen />,
    route: Route,
  },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);
    if (item.children) {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [dashboardRoutes];
const publicRoutes = [...authRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);

export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
};
