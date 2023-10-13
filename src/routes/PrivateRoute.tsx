import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {

  const token = Cookies.get('token')
  const tokenExist = token ? true : false

  if (!tokenExist) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

