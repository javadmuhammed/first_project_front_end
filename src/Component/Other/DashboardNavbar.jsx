import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userAction } from '../../redux/slice/UserSlicer'
import { Link, useLocation } from 'react-router-dom';

function DashboardNavbar() {

    let dispatch = useDispatch();
    let currentLocation = useLocation();
    let currentPath = currentLocation.pathname

    function onLogout() {
        dispatch(userAction.userLogout())
    }



    return (
        <div class="left-side-tabs mt-0">
            <div class="dashboard-left-links">
                <Link to="/dashboard" class={"user-item" + (currentPath == "/dashboard" ? ' active' : '')}><i class="uil uil-apps"></i>Overview</Link>
                <Link to="/profile_update" class={"user-item" + (currentPath == "/profile_update" ? ' active' : '')}><i class="uil uil-user"></i>Manage Profile</Link>
                <Link to="/my_orders" class={"user-item" + (currentPath == "/my_orders" ? ' active' : '')}><i class="uil uil-box"></i>My Orders</Link>
                <Link to="/manage_wallet" class={"user-item" + (currentPath == "/manage_wallet" ? ' active' : '')}><i class="uil uil-wallet"></i>My Wallet</Link>
                <Link to="/wishlist" class={"user-item" + (currentPath == "/wishlist" ? ' active' : '')}><i class="uil uil-heart"></i>Shopping Wishlist</Link>
                <Link to="/address" class={"user-item" + (currentPath == "/address" ? ' active' : '')}><i class="uil uil-location-point"></i>My Address</Link>
                <Link to={"/"} onClick={onLogout} class={"user-item" + (currentPath == "/" ? ' active' : '')}><i class="uil uil-exit"></i>Logout</Link>
            </div>
        </div>
    )
}

export default DashboardNavbar
