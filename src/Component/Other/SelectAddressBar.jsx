import React from 'react'

function SelectAddressBar({ address }) {
    return (

        address ? (
            <div class="call-bill">
                <div class="delivery-man">
                    <div>
                        <span>Deliver to:</span>
                        <h6 className='mt-2'>{address.name}</h6>
                        <h6>{address.address}</h6>
                    </div>
                    <button class="add-address hover-btn mt-2 ml-0" data-toggle="modal" data-target="#select_address_model">Select Address</button>

                </div>

            </div>
        ) : (
            <div class="call-bill">
                <div class="delivery-man w-100 d-flex justify-content-between ">
                    <div>
                        <span>Add new address</span>
                        <h6 className='mb-0'>Create new address into your account</h6>
                    </div>
                    {/* <a href="#" class="add-address hover-btn mt-0" data-toggle="modal" data-target="#address_model">Add New Address</a> */}

                    <button class="add-address hover-btn mb-2 mt-0 ml-0" data-toggle="modal" data-target="#address_model">Add New Address</button>
                </div>

            </div>

        )

    )
}

export default SelectAddressBar
