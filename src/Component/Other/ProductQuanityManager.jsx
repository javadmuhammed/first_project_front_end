import React, { Fragment, useRef } from 'react'
import { addToCart } from '../../helper/HelperFunction';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { const_data } from '../../CONST/const_data';
import { useNavigate } from 'react-router-dom';
import { cartQuantityUpdate } from '../../API/api_request';
import AddtoCartBtn from '../Util/Buttons/AddtoCartBtn';
import { useDispatch } from 'react-redux'
import { addToCartThunk, fetchCartDetails } from '../../redux/slice/CartItems';

function ProductQuanityManager({ product_id, variation }) {

    let userState = useSelector((state) => state.userAuth.user)
    let isLogged = useSelector((state) => state.userAuth.isLogged)
    let dispatch = useDispatch();
    let navigate = useNavigate();

    async function addToCartAction() {
        if (isLogged) {  
            dispatch(await addToCartThunk({ product_id: product_id, userid: userState?._id, variation: variation }))
            
        } else {
            navigate("/login")
        }
    }



    return (
        <Fragment>
            <div className='w-100'>
                <AddtoCartBtn onClick={addToCartAction}></AddtoCartBtn>
            </div>

        </Fragment>
    )
}

export default ProductQuanityManager
