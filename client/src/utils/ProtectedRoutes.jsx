
import React from 'react'
import { useEffect } from 'react'
import { isAuthenticated } from '../redux/auth/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const ProtectedRoutes = () => {

    const Auth = useSelector((state) => state?.auth?.isAuth)

    return (
        <div>
            {Auth ? <Outlet /> : <Navigate to="/login" />}
        </div>
    )
}




export default ProtectedRoutes

