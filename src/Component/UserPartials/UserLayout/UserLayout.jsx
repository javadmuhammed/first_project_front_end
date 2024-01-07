import React, { Fragment, useEffect } from 'react'
import Footer from '../Footer/Footer'
import UserHeader from '../Header/UserHeader'
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../../axios/instance';
import { const_data } from '../../../CONST/const_data';
import authHelper from '../../../helper/AuthHelper';
import { getUserByJwtToken, userAction } from '../../../redux/slice/UserSlicer';
import { getCartItems } from '../../../API/api_request';
import { fetchCartDetails } from '../../../redux/slice/CartItems';
import { fetchUserWishlist } from '../../../redux/slice/Wishlist';
import SetUserAuth from './SetUserAuth';


function UserLayout(props) {

 


  return (
    <Fragment>
      <SetUserAuth>
        <UserHeader></UserHeader>
        <div class="wrapper ">
          {props.children}
        </div>

        <Footer></Footer>
      </SetUserAuth>
    </Fragment>
  )
}

export default UserLayout
