import React, { useState } from 'react'
import ProductQuanityManager from './ProductQuanityManager'
import { const_data } from '../../CONST/const_data'
import { findDiscountPercentage } from '../../helper/HelperFunction';
import ProductQuanityManagerInCart from './ProductQuanityManagerInCart';
import ProductVariation from '../Cart/ProductVariation';

function CanvasCartItem(props) {


    let [isOutofStock, setIsOutofStock] = useState(true);



    let product = props.product; 
    console.log(product)
    let discountPercentage = findDiscountPercentage(product.original_price, product.sale_price)

    return (
        <div className="cart-item">

            <div className="cart-product-img">
                <img src={const_data.public_image_url + "/" + product.images[0]} alt="" />
                <div className="offer-badge">{discountPercentage} % OFF</div>
            </div>

            <div className="cart-text">
                <h4 className='mb-2'>{props.product?.name}</h4>
                <ProductVariation selected_variation={props.variation} cart_id={props.cart_id} product_id={props.product?._id}></ProductVariation>
                <div className="qty-group">
                    {
                        product.stock <= 0 ? (<div><p>Not available (Out of stock) </p></div>) : product.stock <= 10 ? (<div> <ProductQuanityManagerInCart stock={product?.stock} product_id={props.product?._id} cart_id={props.cart_id} onInc={() => { }} onDec={() => { }}   onUpdate={() => { }}></ProductQuanityManagerInCart> <p className='mb-0'>Limited Stock</p>  </div>) : <ProductQuanityManagerInCart stock={product?.stock} product_id={props.product?._id} cart_id={props.cart_id} onInc={() => { }} onDec={() => { }} currentValue={props.currentQuanity} onUpdate={() => { }}></ProductQuanityManagerInCart>
                    }
                    <div className="cart-item-price">{const_data.CURRENCY_ICON}{product.sale_price}/kg<span>{const_data.CURRENCY_ICON}{product.original_price}</span></div>
                </div> 

                <button type="button" onClick={props.onDelete} className="cart-close-btn"><i className="uil uil-multiply"></i></button>
            </div>
        </div>
    )
}

export default CanvasCartItem
