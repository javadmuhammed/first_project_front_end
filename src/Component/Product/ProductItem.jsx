import React, { useEffect, useState } from 'react'
import ProductQuanityManager from '../Other/ProductQuanityManager'
import { const_data } from '../../CONST/const_data'
import { Link } from 'react-router-dom'
import WishListButton from '../Other/WishListButton'
import { findDiscountPercentage } from '../../helper/HelperFunction'
import { useSelector } from 'react-redux'

function ProductItem({ product_image, stock, _id, title, sale_price, original_price }) {

    let [isFav, setFav] = useState(false);
    let wishListItems = useSelector((state) => state.userWishlist.wishlist_items) ?? []


    useEffect(() => { 
        let isInclude = wishListItems.some(function(item) {  
            return item.product_id?._id == _id
        }); 
        setFav(isInclude)
    }, [wishListItems])

    return (
        <div class="item" id={_id}>
            <div class="product-item">
                <Link to={"/product_view/" + _id} class="product-img">
                    <img src={product_image} alt="" />
                    <div class="product-absolute-options">
                        <span class="offer-badge-1">{findDiscountPercentage(original_price, sale_price)}% off</span>


                    </div>
                </Link>

                <div class="product-text-dt">


                    <h4>{title} </h4>
                    <div class="product-price">{const_data.CURRENCY_ICON}{sale_price}/kg<span>{const_data.CURRENCY_ICON}{original_price}</span></div>

                    <div className='productWishlistCart'>
                        {
                            stock <= 0 ? <div className='text-center w-100'> <p>Not available<span>(Out of stock)</span></p> </div> : (
                                <div class="qty-cart">
                                    <ProductQuanityManager product_id={_id}></ProductQuanityManager>
                                </div>
                            )
                        }
                        {/* <span class="wishlitsIcon " title="wishlist"></span> */}
                        
                        <WishListButton is_save_icon={isFav} product_id={_id}></WishListButton>
                    </div>



                </div>
            </div>
        </div>


    )
}

export default ProductItem
