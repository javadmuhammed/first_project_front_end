import React from 'react'
import { const_data } from '../../../CONST/const_data'

function Summary({ title, list, total }) {
    return (
        <div class="pdpt-bg mt-0">
            <div class="pdpt-title">
                <h4>{title}</h4>
            </div>

            <div class="total-checkout-group">
                {
                    list.map((items) => {
                        return (
                            <div class="cart-total-dil pb-3">
                                <h4>{items.title}</h4>
                                <span>{const_data.CURRENCY_ICON} {items.value}</span>
                            </div>
                        )
                    })
                }
            </div>

            <div class="main-total-cart">
                <h2>Sub Total</h2>
                <span>{const_data.CURRENCY_ICON} {total}</span>
            </div>
        </div>
    )
}

export default Summary
