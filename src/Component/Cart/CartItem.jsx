import React from 'react'
import { const_data } from '../../CONST/const_data'
import ProductQuanityManagerInCart from '../Other/ProductQuanityManagerInCart'
import { useDispatch } from 'react-redux'
import { fetchCartDetails, removeFromCart } from '../../redux/slice/CartItems'
import ProductVariation from './ProductVariation'

function CartItem({stock, cart_id, productImage, productTitle, productQuanity, sale_price, original_price, product_id, onCartUpdate,selected_variation }) {

    let dispatch = useDispatch()


    async function cartItemDelete() {
        dispatch(await removeFromCart({ cart_id: cart_id, product_id: product_id })) 
        dispatch(await fetchCartDetails()) 
    }

    return (
        <div class="cartItems mb-3">
            <div class="cart-item">

                <div class="cart-product-img">
                    <img src={productImage} alt="" />
                    <div class="offer-badge">{stock}% OFF</div>
                </div>
                <div class="cart-text">
                    <h4>{productTitle}</h4>
                    <div class="cart-radio">
                         <ProductVariation cart_id={cart_id} product_id={product_id} selected_variation={selected_variation} ></ProductVariation>
                    </div>
                    <div class="qty-group">
                        <ProductQuanityManagerInCart stock={stock} cart_id={cart_id} onQuanityUpdate={onCartUpdate} currentValue={productQuanity} product_id={product_id} ></ProductQuanityManagerInCart>
                        <div class="cart-item-price">{const_data.CURRENCY_ICON + " " + sale_price}/kg <span>{const_data.CURRENCY_ICON + " " + original_price} </span></div>
                    </div>
                    <button type="button" onClick={() => { cartItemDelete() }} class="cart-close-btn"><i class="uil uil-trash"></i></button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
