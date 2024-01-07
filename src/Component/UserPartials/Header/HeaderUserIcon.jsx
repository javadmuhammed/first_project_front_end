import React from 'react';
import { useSelector } from 'react-redux';
import avatar5 from '../../../assets/images/avatar/img-5.jpg';
import {Link} from 'react-router-dom'

function HeaderUserIcon() {
    const isUserLogged = useSelector((state) => state.userAuth.isLogged);
    const userData = useSelector((state) => state.userAuth.user);


     



    return (
        <>
            
            <Link to={isUserLogged ? "/dashboard" : "/login"} className="opts_account">
                <img src={avatar5} alt="" />
                <span className="user__name">{isUserLogged ? userData?.first_name + " " : "Login "}</span>
                {isUserLogged ? <i className="uil uil-angle-down"></i> : null}
            </Link>
            {isUserLogged ? (
                <div className="menu dropdown_account">
                    <a href="dashboard_overview.html" className="item channel_item"><i className="uil uil-apps icon__1"></i>Dashbaord</a>
                    <a href="dashboard_my_orders.html" className="item channel_item"><i className="uil uil-box icon__1"></i>My Orders</a>
                    <a href="dashboard_my_wishlist.html" className="item channel_item"><i className="uil uil-heart icon__1"></i>My Wishlist</a>
                    <a href="dashboard_my_wallet.html" className="item channel_item"><i className="uil uil-usd-circle icon__1"></i>My Wallet</a>
                    <a href="dashboard_my_addresses.html" className="item channel_item"><i className="uil uil-location-point icon__1"></i>My Address</a>
                    <a href="offers.html" className="item channel_item"><i className="uil uil-gift icon__1"></i>Offers</a>
                    <a href="sign_in.html" className="item channel_item"><i className="uil uil-lock-alt icon__1"></i>Logout</a>
                </div>
            ) : null
            }
        </>
    );
}

export default HeaderUserIcon;
