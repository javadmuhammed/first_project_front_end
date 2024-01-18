import React, { Fragment, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../helper/HelperFunction';
import { toast } from 'react-toastify';
import { const_data } from '../../CONST/const_data';
import { cartQuantityUpdate } from '../../API/api_request';
import { useDispatch } from 'react-redux';
import { changeQuantity, fetchCartDetails } from '../../redux/slice/CartItems';

function ProductQuanityManagerInCart({ cart_id, currentValue, product_id, onQuanityUpdate, stock }) {



    let productQuanity = useRef();
    let userState = useSelector((state) => state.userAuth.user)
    let isLogged = useSelector((state) => state.userAuth.isLogged)
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let [isOutofStock, setOutOfStock] = useState(false)

    async function quantityDec() {
        if (isOutofStock) {
            setOutOfStock(false)
        }

        dispatch(await changeQuantity({ cart_id, quantity: currentValue - 1, product_id: product_id }))
        // dispatch(await fetchCartDetails())
    }

    async function quantityInc() {
        if (stock <= productQuanity.current.value) {
            setOutOfStock(true)
        } else {
            dispatch(await changeQuantity({ cart_id, quantity: currentValue + 1, product_id: product_id }))
            // dispatch(await fetchCartDetails())
            setOutOfStock(false)
        }
    }



    return (
        <div>
            <div className="quantity buttons_added">
 
                <input type="button" data-disabled="true" onClick={quantityDec} value="-" className="minus minus-btn" />
                <input type="number" ref={productQuanity} step="1" name="quantity" value={currentValue} className="input-text qty text" />
                <input type="button" data-disabled="true" onClick={quantityInc} value="+" className="plus plus-btn" />
            </div>
            {
                isOutofStock ? <p className='text-danger'>Not available (Quantity Exccees)</p> : null
            }

        </div>
    )

}

export default ProductQuanityManagerInCart
