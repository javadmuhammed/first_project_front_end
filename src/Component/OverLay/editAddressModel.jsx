import React, { useState } from 'react'
import InputOne from '../Util/Input/InputOne'
import { const_data } from '../../CONST/const_data';
import { updateAddress } from '../../API/api_request';
import ComponentHelper from '../../helper/ComponentHelper';
import * as Yup from 'yup'

function EditAddressModel({ address_id, data_target, address_data }) {


    let [addressTypeState, addressTypeStateUpdate] = useState(address_data.type);
    let [nameState, nameStateUpdate] = useState(address_data.name);
    let [houseNameState, houseNameStateUpdate] = useState(address_data.house_name);
    let [cityState, cityStateStateUpdate] = useState(address_data.city_town_dist);
    let [stateState, stateStateUpdate] = useState(address_data.state);
    let [pincodeState, pincodeStateUpdate] = useState(address_data.pincode);
    let [landmarkState, landmarkStateUpdate] = useState(address_data.landmark);
    let [phoneNumberState, phoneNumberStateUpdate] = useState(address_data.phone_number);
    let [AltphoneNumberState, AltphoneNumberStateUpdate] = useState(address_data.alternative_phone);
    let [emailState, emailStateUpdate] = useState(address_data.email);
    let [addressState, adressStateUpdate] = useState(address_data.address);
    let [alertComponent, alertComponetUpdate] = useState({ component: null })


    const addressValidation = Yup.object().shape({
        addressType: Yup.string().required('Address type is required'),
        name: Yup.string().required('Name is required'),
        houseName: Yup.string().required('House name is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        landmark: Yup.string().required("Landmark is required"),
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required("Phone number is required"),
        AltphoneNumber: Yup.string().required("Alternative number is required").matches(/^\d{10}$/, 'Alternate phone number must be 10 digits'),
        email: Yup.string().email('Invalid email address').required("Email address required"),
        address: Yup.string().required('Address is required'),
    });

    function onAddressFormSubmit() {

        const formData = {
            addressType: addressTypeState,
            name: nameState,
            houseName: houseNameState,
            city: cityState,
            state: stateState,
            pincode: pincodeState,
            landmark: landmarkState,
            phoneNumber: phoneNumberState,
            AltphoneNumber: AltphoneNumberState,
            email: emailState,
            address: addressState,
        };

        addressValidation.validate(formData).then(() => {
            let address = {
                type: addressTypeState,
                name: nameState,
                house_name: houseNameState,
                city_town_dist: cityState,
                state: stateState,
                address: addressState,
                pincode: pincodeState,
                landmark: landmarkState,
                phone_number: phoneNumberState,
                email: emailState,
                alternative_phone: AltphoneNumberState
            }
            updateAddress(address, address_id).then((data) => {
                alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.SUCCESS, "Address successfuly updated") })
            }).catch((err) => {
                console.log(err)
                alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, "Something went wrong") })
            })
        }).catch((err) => {
            alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, err.message) })
        })


    }



    function onChangeAddressFiled(e, state) {
        state(e.target.value)
    }
    return (
        <div id={data_target} class="editAddressModel header-cate-model main-gambo-model modal fade" tabindex="-1" role="dialog" aria-modal="false">
            <div class="modal-dialog category-area" role="document">
                <div class="category-area-inner">
                    <div class="modal-header">
                        <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                            <i class="uil uil-multiply"></i>
                        </button>
                    </div>
                    <div class="category-model-content modal-content">
                        <div class="cate-header">
                            <h4>Edit address  </h4>
                        </div>
                        <div class="add-address-form">
                            <div class="checout-address-step">
                                <div class="row">
                                    <div class="col-lg-12">
                                        {
                                            alertComponent.component != null ? alertComponent.component : null
                                        }
                                        <div class="form-group">

                                            <div class="product-radio">
                                                <ul class="product-now">
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            onClick={() => {
                                                                addressTypeStateUpdate(const_data.ADDRESS_TYPE.HOME);
                                                            }}
                                                            id={"ad1"+address_id}
                                                            name="address1"
                                                            checked={addressTypeState == const_data.ADDRESS_TYPE.HOME}
                                                        />
                                                        <label for={"ad1"+address_id}>Home</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id={"ad2"+address_id}
                                                            name="address2"
                                                            onClick={() => {
                                                                addressTypeStateUpdate(const_data.ADDRESS_TYPE.OFFICE);
                                                            }}
                                                            checked={addressTypeState === const_data.ADDRESS_TYPE.OFFICE}
                                                        />
                                                        <label for={"ad2"+address_id}>Office</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            onClick={() => {
                                                                addressTypeStateUpdate(const_data.ADDRESS_TYPE.OTHER);
                                                            }}  
                                                            checked={addressTypeState === const_data.ADDRESS_TYPE.OTHER}
                                                            id={"ad3"+address_id}
                                                            name="address3"
                                                        />
                                                        <label for={"ad3"+address_id}>Other</label>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                        <div class="address-fieldset">
                                            <div class="row">
                                                <div class="col-lg-6 col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label">Name * </label>
                                                        <InputOne noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"name"} placeholder={"Enter full name"} state={nameStateUpdate} value={nameState} type={"text"} />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label">House Name * </label>
                                                        <InputOne noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"house_name"} placeholder={"Enter house name"} state={houseNameStateUpdate} value={houseNameState} type={"text"} />
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label">City / Town / District*</label>
                                                        <InputOne noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"city_twon_dist"} placeholder={"City / Town / District"} value={cityState} state={cityStateStateUpdate} type={"text"} />
                                                    </div>
                                                </div>


                                                <div class="col-lg-6 col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label">State*</label>
                                                        <InputOne noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"state"} placeholder={"State"} value={stateState} state={stateStateUpdate} type={"text"} />
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label">Pincode*</label>
                                                        <InputOne noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"pinCode"} placeholder={"Enter pin code"} value={pincodeState} state={pincodeStateUpdate} type={"text"} />
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label">Landmark *</label>
                                                        <InputOne noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"landmark"} placeholder={"Enter landmark"} value={landmarkState} state={landmarkStateUpdate} type={"text"} />
                                                    </div>
                                                </div>


                                                <div class="col-lg-12 col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label">Address*</label>
                                                        <textarea name="" onChange={(e) => { adressStateUpdate(e.target.value) }} style={{ width: "100%" }} id="" cols="30" rows="5" placeholder='Enter your address'>{addressState}</textarea>
                                                    </div>
                                                </div>


                                                <div class="col-lg-6 col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label">Phone Number  *</label>
                                                        <InputOne noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"phoneNumber"} placeholder={"Enter phone number"} value={phoneNumberState} state={phoneNumberStateUpdate} type={"text"} />
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label">Altranative Number *</label>
                                                        <InputOne noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"altranative_phoneNumber"} value={AltphoneNumberState} placeholder={"Enter altranative phone number"} state={AltphoneNumberStateUpdate} type={"text"} />
                                                    </div>
                                                </div>

                                                <div class="col-lg-12 col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label">Email Address *</label>
                                                        <InputOne noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"email_address"} value={emailState} placeholder={"Enter email address"} state={emailStateUpdate} type={"text"} />
                                                    </div>
                                                </div>


                                                <div class="col-lg-12 col-md-12">
                                                    <div class="form-group mb-0">
                                                        <div class="address-btns">
                                                            <button class="save-btn14 hover-btn" onClick={onAddressFormSubmit}>Save</button>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAddressModel
