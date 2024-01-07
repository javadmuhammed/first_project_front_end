import React, { Fragment, useEffect, useState } from 'react'
import { getUserAddress } from '../../../API/api_request';
import AddressManageModel from '../../OverLay/AddressManageModel';

function SelectAddress({ stateField }) {


    let [addressList, setAddressList] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);


    useEffect(() => {
        getUserAddress().then((addressList) => {
            console.log(addressList)
            setAddressList(addressList.data?.address ?? [])
        }).catch((err)=>{
            console.log("Something went wrong")
        })
    }, [])


    const handleRadioChange = (event) => {
        const selectedId = event.target.value;
        setSelectedAddressId(selectedId);
        stateField(selectedId);
    };

    return (
        <Fragment>
            <AddressManageModel state={setAddressList}></AddressManageModel>
            <div class="checkout-card" id="headingTwo">
                <span class="checkout-step-number">2</span>
                <h4 class="checkout-step-title">
                    <button class="wizard-btn collapsed" type="button" data-toggle="collapse"
                        data-target="#collapseTwo" aria-expanded="false"
                        aria-controls="collapseTwo"> Delivery Address</button>
                </h4>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#checkout_wizard">
                <div class="checkout-step-body">
                    <div class="checout-address-step">
                        <div class="row">
                            <a href="#" class="add-address hover-btn mt-0" data-toggle="modal" data-target="#address_model">Add New Address</a>

                            <div class="col-lg-12">
                                <div class="row">

                                    {
                                        addressList.map((addressItem) => {
                                            console.log(addressItem)
                                            return (
                                                <div class="col-md-6">
                                                    <div class="address_item">
                                                        <input type="radio" onChange={handleRadioChange} checked={selectedAddressId === addressItem._id} value={addressItem._id} />
                                                        <div class="purchase-history">
                                                            <div class="purchase-history-left">
                                                                <h4>{addressItem.name}</h4>
                                                                <p>{addressItem.address}</p>
                                                                <span>{addressItem.type}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SelectAddress
