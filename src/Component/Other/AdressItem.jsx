import React from 'react'
import { toast } from 'react-toastify'
import { const_data } from '../../CONST/const_data'
import { AddressAsPrimaryApi } from '../../API/api_request'
import EditAddressModel from '../OverLay/editAddressModel'

function AdressItem({ address_id, type, onEdit, onDelete, address, is_primary, onUpdate,address_data }) {

    function setAsPrimary() {
        AddressAsPrimaryApi(address_id).then((success) => {
            console.log(success)
            if (success?.data?.status) {
                toast.success("Address set as primary", const_data.DEFAULT_ALERT_DATA);
                onUpdate();
            } else {
                console.log(success)
                toast.error("Something went wrong", const_data.DEFAULT_ALERT_DATA);
            }
        }).catch((err) => {
            console.log(err)
            toast.error("Something went wrong", const_data.DEFAULT_ALERT_DATA);
        })
    }


    return (
        <>

            <EditAddressModel address_data={address_data} address_id={address_id} data-toggle="modal" data_target={"edit_address_model" + address_id}></EditAddressModel>
            <div class="address-item">
                <div class="address-icon1">
                    <i class="uil uil-home-alt"></i>
                </div>
                <div class="address-dt-all">
                    <h4>{type} {
                        is_primary ? <span class="primary_address address_primary">PRIMARY</span> : <span onClick={setAsPrimary} class="primary_address set_as_primary">SET AS PRIMARY</span>
                    }</h4>
                    <p>{address}</p>
                    <ul class="action-btns">
                        <li><a onClick={onDelete} class="action-btn"><i class="uil uil-trash-alt"></i></a></li>
                        <li><a href='#' data-toggle="modal" data-target={"#edit_address_model" + address_id} class="action-btn"><i class="uil uil-edit"></i></a></li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default AdressItem
