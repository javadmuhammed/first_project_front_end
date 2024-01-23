import React, { Fragment, useEffect, useState } from 'react'
import { addToWishListHelper } from '../../helper/HelperFunction'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToWishListThunk, fetchUserWishlist, removeFromWishlistThunk } from '../../redux/slice/Wishlist'

function WishListButton({ product_id, is_save_icon }) {

    let navigate = useNavigate();
    let dispatch = useDispatch();



    let isUserLogged = useSelector((state) => state.userAuth.isLogged);
    let wishListItems = useSelector((state) => state.userWishlist) 


    let [isInclude, setIsInclude] = useState(is_save_icon);

    useEffect(() => {
        setIsInclude(wishListItems?.wishlist_items.some((item) => item?.product_id?._id == product_id))
    }, [])

    

    async function wishlistControl() {




        if (isUserLogged) {
            if (isInclude) {  
                try {
                    dispatch(await removeFromWishlistThunk({ product_id }))  
                    setIsInclude(false)
                } catch (e) { }
            } else { 
                try { 
                    dispatch(await addToWishListThunk({ product_id }))  
                    setIsInclude(true)
                } catch (e) { }
            }
        } else {
            navigate("/login")
        }
    }


    return (
        <Fragment> 
            <span className={"wishlitsIcon " + (isInclude ? "save-icon liked" : "") + (isInclude ? " liked" : "")} onClick={wishlistControl} title="wishlist"></span>
        </Fragment>
    )
}

export default WishListButton
