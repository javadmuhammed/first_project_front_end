import React, { useEffect, useState } from 'react'
import InputOne from '../Util/Input/InputOne'
import { const_data } from '../../CONST/const_data';
import { addAddressType, updateAddress } from '../../API/api_request';
import ComponentHelper from '../../helper/ComponentHelper';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import InputWithIconButton from '../Util/Input/InputWithIconButton';
import { useSelector } from 'react-redux';

function EditAddressModel({ address_id, data_target, address_data, state }) {

    // 
    let [addressTypeState, addressTypeStateUpdate] = useState(address_data?.type);




    // let [nameState, nameStateUpdate] = useState(address_data.name);
    // let [houseNameState, houseNameStateUpdate] = useState(address_data.house_name);
    // let [cityState, cityStateStateUpdate] = useState(address_data.city_town_dist);
    // let [stateState, stateStateUpdate] = useState(address_data.state);
    // let [pincodeState, pincodeStateUpdate] = useState(address_data.pincode);
    // let [landmarkState, landmarkStateUpdate] = useState(address_data.landmark);
    // let [phoneNumberState, phoneNumberStateUpdate] = useState(address_data.phone_number);
    // let [AltphoneNumberState, AltphoneNumberStateUpdate] = useState(address_data.alternative_phone);
    // let [emailState, emailStateUpdate] = useState(address_data.email);
    // let [addressState, adressStateUpdate] = useState(address_data.address);
    // let [alertComponent, alertComponetUpdate] = useState({ component: null })
    let [addressTypes, setAddressTypes] = useState([])
    let [toogleNewAddressType, setToogleNewAddressType] = useState(false);
    let userData = useSelector((state) => state.userAuth.user)

    const addressValidation = Yup.object().shape({
        //addressType: Yup.string().required('Address type is required'),
        name: Yup.string().trim().required('Name is required'),
        houseName: Yup.string().trim().required('House name is required'),
        city: Yup.string().trim().required('City is required'),
        state: Yup.string().trim().required('State is required'),
        pincode: Yup.number("Please enter valid Pin code").required('Pincode is required'),
        landmark: Yup.string().trim().required("Landmark is required"),
        phoneNumber: Yup.string().trim().matches(/^\d{10}$/, 'Phone number must be 10 digits').required("Phone number is required"),
        altPhoneNumber: Yup.string().trim().matches(/^\d{10}$/, 'Alternate phone number must be 10 digits').required("Alternative number is required"),
        email: Yup.string().trim().email('Invalid email address').required("Email address required"),
        address: Yup.string().trim().required('Address is required'),
    });


    function updateAddressType(type) {
        // alert(type)
        addressTypeStateUpdate(type)
    }


    useEffect(() => {
        alert("Hello world" + addressTypeState)
    }, [addressTypeState])


    let initAddress = {
        addressType: address_data.type,
        name: address_data.name,
        houseName: address_data.house_name,
        city: address_data.city_town_dist,
        state: address_data.state,
        pincode: address_data.pincode,
        landmark: address_data.landmark,
        phoneNumber: address_data.phone_number,
        altPhoneNumber: address_data.alternative_phone,
        email: address_data.email,
        address: address_data.address,
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
        let userAddress = userData?.extra_address_type;
        let tempAddressTypes = [...Object.values(const_data.ADDRESS_TYPE), ...userAddress]
        setAddressTypes(tempAddressTypes)
    }, [])


    function onAddressFormSubmit(values) {

        const address = {
            addressType: addressTypeState,
            name: values.name,
            house_name: values.houseName,
            city_town_dist: values.city,
            state: values.state,
            pincode: values.pincode,
            landmark: values.landmark,
            phone_number: values.phoneNumber,
            alternative_phone: values.altPhoneNumber,
            email: values.email,
            address: values.address,
        };

        updateAddress(address, address_id).then((data) => {

            toast.success("Address update success")
        }).catch((err) => {
            alert(err)
            toast.error("Something went wrong")
        })
    }



    // function onChangeAddressFiled(e, state) {
    //     state(e.target.value)
    // }
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
                            <h4>Edit address  {addressTypeState}</h4>
                        </div>
                        <div class="add-address-form">
                            <div class="checout-address-step">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <Formik validate={() => {
                                            if (addressTypeState == "" || addressTypeState == null) {
                                                return {
                                                    addressType: "Please select Address Type"
                                                }
                                            } else {
                                                return {}
                                            }
                                        }} initialValues={initAddress} onSubmit={onAddressFormSubmit} validationSchema={addressValidation}>
                                            <Form>
                                                <div class="form-group">

                                                    <div class="product-radio">
                                                        <ul class="product-now">
                                                            {
                                                                addressTypes?.map((each) => {
                                                                    return (<li>
                                                                        <input
                                                                            type="radio"
                                                                            onClick={() => {
                                                                                updateAddressType(each)
                                                                            }}
                                                                            id={"adedit1" + each}
                                                                            name="addressedit1"
                                                                            {...(each === addressTypeState ? { checked: true } : {})}
                                                                        />
                                                                        <label for={"adedit1" + each}>{each}  </label>
                                                                    </li>)
                                                                })
                                                            }



                                                            <li>
                                                                <input type="radio" onClick={() => { setToogleNewAddressType(!toogleNewAddressType) }} id="addressAddEdit" name="addressAddEdit" />
                                                                <label for="addressAddEdit">{!toogleNewAddressType ? "+" : "x"}</label>
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

                                                            <Field className="form-control" as="textarea" name={"address"} id="address" placeholder={"Address"} type={"text"} />
                                                            <ErrorMessage name="address" component="div" className="formValidateError" ></ErrorMessage>
                                                        </div>
                                                    </div>


                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label">Phone Number  *</label>
                                                            <Field className="form-control" name={"phoneNumber"} id="phoneNumber" placeholder={"Phone number"} type={"text"} />
                                                            <ErrorMessage name="phoneNumber" component="div" className="formValidateError" ></ErrorMessage>

                                                        </div>
                                                    </div>

                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label">Altranative Number *</label>
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
    )
}

export default EditAddressModel
