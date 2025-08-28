// src/components/auth/AdminRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  if (!token || !user ) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
