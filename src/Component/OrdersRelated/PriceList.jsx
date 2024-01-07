import React from 'react'
import { const_data } from '../../CONST/const_data'

function PriceList({ total, priceList }) {
    return (
        <div class="total-dt">
            <div class="total-checkout-group mt-0">
                {
                    priceList?.map((item) => {
                        return (<div class="cart-total-dil pb-3">
                            <h4>{item.title}</h4>
                            <span>{item.price}</span>
                        </div>
                        )
                    })
                }

            </div>
            <div class="main-total-cart">
                <h2>Total</h2>
                <span>{total}</span>
            </div>
        </div>
    )
}

export default PriceList
