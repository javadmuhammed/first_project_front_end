import React from 'react'
import AddtoCartBtn from '../Util/Buttons/AddtoCartBtn'
import ProductQuanityManager from '../Other/ProductQuanityManager'
import { useDispatch } from 'react-redux'
import { removeFromWishlistThunk, wishlistSendToCartThunk } from '../../redux/slice/Wishlist';
import { wishlistToCart } from '../../API/api_request';
import { const_data } from '../../CONST/const_data';
import { toast } from 'react-toastify';

function Wishlist_item({ category, productImage, offer, title, sale_price, originalPrice, product_id, onDelete }) {


    let dispatch = useDispatch();

    async function onItemDelete() {
        dispatch(await removeFromWishlistThunk({ product_id }))
        onDelete(product_id);
    }

    async function sentToCart() {
        try {
            dispatch(await wishlistSendToCartThunk({ product_id: product_id, variation: const_data.PRODUCT_VARIATION['1kg'] }))
            toast.success("Product sented to cart")
        } catch (e) {

        }

    }


    return (
        <div class="cart-item">
            <div class="cart-product-img">
                <img src={productImage} alt="" />
                <div class="offer-badge">{offer} % OFF</div>
            </div>
            <div class="cart-text">
                <div>
                    <h4>{title}</h4>
                    <div class="cart-item-price">{sale_price} <span>{originalPrice}</span></div>
                    <div className='mt-3'>
                        {/* <ProductQuanityManager currentValue={0} product_id={product_id} ></ProductQuanityManager> */}
                        <AddtoCartBtn onClick={sentToCart}></AddtoCartBtn>
                    </div>
                </div>
                <button onClick={onItemDelete} type="button" class="cart-close-btn"><i class="uil uil-trash-alt"></i></button>
            </div>
        </div>
    )
}

export default Wishlist_item
