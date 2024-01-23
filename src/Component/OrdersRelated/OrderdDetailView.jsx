import React from 'react'
import PriceList from './PriceList'
import { const_data } from '../../CONST/const_data'

function OrderdDetailView({ subTotal, total, deliveryCharge,discount }) {





    return (
        <div className="col-md-12">
            <div className='bg-white'>
                <PriceList total={const_data.CURRENCY_ICON + subTotal} priceList={
                    [
                        { title: "Total", price: const_data.CURRENCY_ICON + " " + total },
                        { title: "Sub total", price: const_data.CURRENCY_ICON + " " + subTotal },
                        { title: "Discount", price: const_data.CURRENCY_ICON + " " + discount },
                        { title: "Delivery Charge", price: deliveryCharge }
                    ]
                }>

                </PriceList>
            </div >
        </div>
    )
}

export default OrderdDetailView
