import React from 'react'

function OrderNowButton() {
    return (
        <div>
            {/* <button class="add-address hover-btn mb-2 mt-0 ml-0" data-toggle="modal" data-target="#address_model">Add New Address</button>
            <button class="add-address hover-btn mt-2 ml-0" data-toggle="modal" data-target="#select_address_model">Select Address</button> */}

            <button  data-toggle="modal" data-target="#select_address_model" class="order-btn hover-btn">Order Now</button>
        </div>
    )
}

export default OrderNowButton
