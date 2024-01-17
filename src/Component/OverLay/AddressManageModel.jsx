import React, { useRef, useState } from 'react'
import InputOne from '../Util/Input/InputOne'
import { const_data } from '../../CONST/const_data';
import { addAddressType, addNewAddress } from '../../API/api_request';
import ComponentHelper from '../../helper/ComponentHelper';
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Formik, ErrorMessage, Field, Form } from 'formik'
import CoupenCodeApply from '../Cart/CoupenCodeApply';
import InputWithIconButton from '../Util/Input/InputWithIconButton';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

function AddressManageModel({ state }) {


    let [addressTypeState, addressTypeStateUpdate] = useState(const_data.ADDRESS_TYPE.HOME);
    let closeRef = useRef();
    let [toogleNewAddressType, setToogleNewAddressType] = useState(false);
    let [addressTypes, setAddressTypes] = useState([])
    let userData = useSelector((state) => state.userAuth.user)


    const addressValidation = Yup.object().shape({
        //addressType: Yup.string().required('Address type is required'),
        name: Yup.string().required('Name is required'),
        houseName: Yup.string().required('House name is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        landmark: Yup.string().required("Landmark is required"),
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required("Phone number is required"),
        altPhoneNumber: Yup.string().matches(/^\d{10}$/, 'Alternate phone number must be 10 digits'),
        email: Yup.string().email('Invalid email address').required("Email address required"),
        address: Yup.string().required('Address is required'),
    });

    let initAddress = {
        addressType: const_data.ADDRESS_TYPE.HOME,
        name: "",
        houseName: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        phoneNumber: "",
        altPhoneNumber: "",
        email: "",
        address: "",
    }

    function onAddressFormSubmit(values, { resetForm }) {

        let address = {
            type: addressTypeState,
            name: values.name,
            house_name: values.houseName,
            city_town_dist: values.city,
            state: values.state,
            address: values.address,
            pincode: values.pincode,
            landmark: values.phoneNumber,
            phone_number: values.altPhoneNumber,
            email: values.email,
            alternative_phone: values.address
        }

        addNewAddress({ address }).then((data) => {

            let response = data?.data;
            if (response?.status) {
                address._id = data?.data?.address_id;
                state((prev) => [...prev, address])
                toast.success("Address successfuly created")
                closeRef.current.click();
                // resetForm();
            } else {
                toast.error(response.msg)
            }

        }).catch((err) => {
            console.log(err)
            toast.error("Something went wrong")
        })
    }


    function addNewAddressType(type) {
        addAddressType(type).then((data) => {

            let response = data?.data;
            if (response?.status) {
                toast.success("Address added success")
                setAddressTypes([...addressTypes, type])
                addressTypeStateUpdate(type)
            } else {
                toast.error(response.msg)
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }



    useEffect(() => {
        let tempAddressTypes = [...Object.values(const_data.ADDRESS_TYPE)]
        setAddressTypes(tempAddressTypes)
    }, [])

    return (
        <div id="address_model" class="header-cate-model main-gambo-model modal fade" tabindex="-1" role="dialog" aria-modal="false">
            <div class="modal-dialog category-area" role="document">
                <div class="category-area-inner">
                    <div class="modal-header">
                        <button ref={closeRef} type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                            <i class="uil uil-multiply"></i>
                        </button>
                    </div>
                    <div class="category-model-content modal-content">
                        <div class="cate-header">
                            <h4>Add New Address</h4>
                        </div>
                        <div class="add-address-form">
                            <div class="checout-address-step">
                                <div class="row">
                                    <div class="col-lg-12">


                                        <div class="address-fieldset">
                                            <Formik
                                                initialValues={initAddress}
                                                validationSchema={addressValidation}
                                                onSubmit={onAddressFormSubmit}
                                                validate={() => {
                                                    if (addressTypeState == "" || addressTypeState == null) {
                                                        return {
                                                            addressType: "Please select Address Type"
                                                        }
                                                    } else {
                                                        return {}
                                                    }
                                                }}
                                            >
                                                <Form>

                                                    <div class="form-group">

                                                        <div class="product-radio">
                                                            <ul class="product-now">
                                                                {
                                                                    addressTypes?.map((each) => {
                                                                        return (<li>
                                                                            <input
                                                                                type="radio"
                                                                                onClick={() => { addressTypeStateUpdate(each) }}
                                                                                id="ad1"
                                                                                name="address1"
                                                                                {...(each === addressTypeState ? { checked: true } : {})}
                                                                            />                                                                            <label for="ad1">{each}  </label>
                                                                        </li>)
                                                                    })
                                                                }



                                                                <li>
                                                                    <input type="radio" onClick={() => { setToogleNewAddressType(!toogleNewAddressType) }} id="ad4" name="address1" />
                                                                    <label for="ad4">{!toogleNewAddressType ? "+" : "x"}</label>
                                                                </li>
                                                            </ul>
                                                            <ErrorMessage name="addressType" component="div" className="formValidateError" ></ErrorMessage>

                                                        </div>
                                                        {
                                                            toogleNewAddressType ? (
                                                                <div className="bg-white pl-3 pr-3 pb-3" >
                                                                    <InputWithIconButton OnClick={addNewAddressType} icon={"check"} placeHolder={"Enter address type"}></InputWithIconButton>
                                                                </div>
                                                            ) : null
                                                        }



                                                    </div>


                                                    <div class="row">

                                                        <div class="col-lg-6 col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label">Name * </label>
                                                                <Field className="form-control" name={"name"} id="name" placeholder={"Enter full name"} type={"text"} />
                                                                <ErrorMessage name="name" component="div" className="formValidateError" ></ErrorMessage>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label">House Name * </label>
                                                                <Field className="form-control" name={"houseName"} id="houseName" placeholder={"Enter house name"} type={"text"} />
                                                                <ErrorMessage name="houseName" component="div" className="formValidateError" ></ErrorMessage>
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label">City / Town / District*</label>
                                                                <Field className="form-control" name={"city"} id="city" placeholder={"City / Town / District"} type={"text"} />
                                                                <ErrorMessage name="city" component="div" className="formValidateError" ></ErrorMessage>
                                                            </div>
                                                        </div>


                                                        <div class="col-lg-6 col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label">State*</label>
                                                                <Field className="form-control" name={"state"} id="state" placeholder={"State"} type={"text"} />
                                                                <ErrorMessage name="state" component="div" className="formValidateError" ></ErrorMessage>
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-md-12">
                                                            <div class="form-group">
                                                                <label class="control-label">Pincode*</label>
                                                                <Field className="form-control" name={"pincode"} id="state" placeholder={"Pin Code"} type={"text"} />
                                                                <ErrorMessage name="pincode" component="div" className="formValidateError" ></ErrorMessage>
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label">Landmark *</label>
                                                                <Field className="form-control" name={"landmark"} id="landmark" placeholder={"Landmark"} type={"text"} />
                                                                <ErrorMessage name="landmark" component="div" className="formValidateError" ></ErrorMessage>
                                                            </div>
                                                        </div>


                                                        <div class="col-lg-12 col-md-12">
                                                            <div class="form-group">
                                                                <label class="control-label">Address*</label>
                                                                {/* <textarea name="" onChange={(e) => { adressStateUpdate(e.target.value) }} style={{ width: "100%" }} id="" cols="30" rows="5" placeholder='Enter your address'>
                                                                {addressState}
                                                            </textarea> */}
                                                                <Field className="form-control" as="textarea" name={"address"} id="address" placeholder={"Address"} type={"text"} />
                                                                <ErrorMessage name="address" component="div" className="formValidateError" ></ErrorMessage>
                                                            </div>
                                                        </div>


                                                        <div class="col-lg-6 col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label">Phone Number  *</label>
                                                                <Field className="form-control" name={"phoneNumber"} id="phoneNumber" placeholder={"Phone number"} type={"text"} />
                                                                <ErrorMessage name="phoneNumber" component="div" className="formValidateError" ></ErrorMessage>

                                                                {/* <InputOne value={phoneNumberState} noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"phoneNumber"} placeholder={"Enter phone number"} state={phoneNumberStateUpdate} type={"text"} /> */}
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label">Altranative Number </label>
                                                                <Field className="form-control" name={"altPhoneNumber"} id="altPhoneNumber" placeholder={"Altranative Number"} type={"text"} />
                                                                <ErrorMessage name="altPhoneNumber" component="div" className="formValidateError" ></ErrorMessage>

                                                                {/* <InputOne value={altPhoneNumberState} noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"altranative_phoneNumber"} placeholder={"Enter altranative phone number"} state={altPhoneNumberStateUpdate} type={"text"} /> */}
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-12 col-md-12">
                                                            <div class="form-group">
                                                                <label class="control-label">Email Address *</label>
                                                                <Field className="form-control" name={"email"} id="email" placeholder={"Email address"} type={"text"} />
                                                                <ErrorMessage name="email" component="div" className="formValidateError" ></ErrorMessage>

                                                                {/* <InputOne value={emailState} noicon={true} isRequired={true} onChange={onChangeAddressFiled} name={"email_address"} placeholder={"Enter email address"} state={emailStateUpdate} type={"text"} /> */}
                                                            </div>
                                                        </div>


                                                        <div class="col-lg-12 col-md-12">
                                                            <div class="form-group mb-0">
                                                                <div class="address-btns">
                                                                    <button class="save-btn14 hover-btn" type='submit'>Save</button>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </Form>
                                            </Formik>
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

export default AddressManageModel
