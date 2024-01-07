
import React, { useEffect, useRef, useState } from 'react'
import { getUserAddress } from '../../API/api_request';

function SelectAddressOverlay({ state,allAddress }) {


    let [selectedAddress, setSelectedAddress] = useState();
    
    let modalCloseBtn = useRef(null);


    function addressSelectChange(e) {
        let address_id = e.target.value;
        setSelectedAddress(address_id);
        state(address_id)
        modalCloseBtn.current.click(); 
    }


     

    return (
        <div id="select_address_model" class="header-cate-model main-gambo-model modal fade" tabindex="-1" role="dialog" aria-modal="false">
            <div class="modal-dialog category-area" role="document">
                <div class="category-area-inner">
                    <div class="modal-header">
                        <button ref={modalCloseBtn} type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                            <i class="uil uil-multiply"></i>
                        </button>
                    </div>
                    <div class="category-model-content modal-content">
                        <div class="cate-header">
                            <h4>Select Address</h4>
                        </div>
                        <div class="add-address-form">
                            <div class="checout-address-step">
                                <div class="row">
                                    <div class="col-lg-12">
                                    <button class="add-address hover-btn mb-2 mt-0 ml-0" data-toggle="modal" data-target="#address_model">Add New Address</button>

                                        <ul class="d-block radio--group-inline-container_1" style={{
                                            maxHeight: "300px",
                                            overflowY: "auto", overflowX: "hidden"
                                        }}> 
                                            {
                                                
                                                allAddress.map((addressItem, index) => { 
                                                    return (
                                                        <li class="w-100">
                                                            <div class="radio-item_1">
                                                                <input value={addressItem._id} onClick={addressSelectChange} id={"addressItem" + index} name="addressItem" type="radio" checked={selectedAddress == addressItem._id} />
                                                                <label for={"addressItem" + index} class="radio-label_1 d-flex">
                                                                    <div style={{ flex: "3" }}>
                                                                        <h5>{addressItem.name}</h5>
                                                                        <p>{addressItem.address}</p>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }



                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SelectAddressOverlay
