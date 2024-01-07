import React from 'react'
import { Link } from 'react-router-dom'

function OrderedSingleItem({ deliveryTime, productData,productImage }) {

 
    return (
        <div class="col-lg-12 col-md-12 ">
            <div class="pdpt-bg mt-0">
                <div class="pdpt-title">
                    <h6>Delivery Expected on {deliveryTime}</h6>
                </div>
                <Link to={"/order_single_item/" + productData?.id}>
                    <div class="order-body10">
                        <ul class="order-dtsll">
                            <li>
                                <div class="order-dt-img">
                                    <img src={productImage} alt="" />
                                </div>
                            </li>
                            <li>
                                <div class="order-dt47">
                                    <h4>{productData?.name}</h4>
                                    <p>Status - {productData?.status}</p>
                                    <div class="order-title">{productData?.quanity} Items <span data-inverted="" data-tooltip={productData?.tooltip} data-position="top center">?</span></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default OrderedSingleItem
