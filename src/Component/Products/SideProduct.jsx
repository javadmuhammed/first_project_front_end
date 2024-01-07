import React from 'react'
import AddtoCartBtn from '../Util/Buttons/AddtoCartBtn'
import { const_data } from '../../CONST/const_data'
import ProductQuanityManager from '../Other/ProductQuanityManager'

function SideProduct({ product_id, category, productImage, offer, title, sale_price, originalPrice, onDelete, onAddtoCart }) {
    return (
        <div class="cart-item">
            <div class="cart-product-img">
                <img src={productImage} alt="" />
                <div class="offer-badge">{offer} % OFF</div>
            </div>
            <div class="cart-text">
                <div>
                    <h4>{title}</h4>
                    <div class="cart-item-price">{const_data.CURRENCY_ICON}{sale_price} <span>{const_data.CURRENCY_ICON}{originalPrice}</span></div>
                    <div className='mt-3'>
                        {/* <AddtoCartBtn onClick={() => { }}></AddtoCartBtn> */}
                        <ProductQuanityManager currentValue={1} product_id={product_id}></ProductQuanityManager>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideProduct
