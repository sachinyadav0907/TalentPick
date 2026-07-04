import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

function GuestRoute({children}) {
  const {isLogin} = useAuth();
  return isLogin ? <Navigate to="/" replace/> : children;
}

export default GuestRoute
