import React, { Fragment, useEffect, useState } from 'react'
import { addToWishListHelper } from '../../helper/HelperFunction'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToWishListThunk, removeFromWishlistThunk } from '../../redux/slice/Wishlist'

function WishListButton({ product_id, is_save_icon }) {

    let navigate = useNavigate();
    let dispatch = useDispatch();



    let isUserLogged = useSelector((state) => state.userAuth.isLogged);
    let wishListItems = useSelector((state) => state.userWishlist.wishlist_items) ?? []


    let [isInclude, setIsInclude] = useState(false);

    useEffect(() => {
        setIsInclude(wishListItems.includes(product_id))
    })

    async function wishlistControl() {

        if (isUserLogged) {
            if (isInclude) {
                
                try {
                    let wishlist = dispatch(await removeFromWishlistThunk({ product_id })) //await addToWishListHelper(product_id)

                    if (wishlist) { 
                        setIsInclude(false)
                    }
                } catch (e) { }
            } else {
                try {
                    let wishlist = dispatch(await addToWishListThunk({ product_id })) //await addToWishListHelper(product_id)

                    if (wishlist) {
                        toast.success("Item addedd to wishlist")
                        setIsInclude(true)
                    }
                } catch (e) { }
            }

        } else {
            navigate("/login")
        }
    }


    return (
        <Fragment>
            <span className={"wishlitsIcon " + (is_save_icon ? "save-icon" : "") + (isInclude ? " liked" : "")} onClick={wishlistControl} title="wishlist"></span>
        </Fragment>
    )
}

export default WishListButton
