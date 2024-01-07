import React, { useEffect, useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import DashboardSectionTitle from '../../../Component/Util/Title/DashboardSectionTitle'
import FullBox from '../../../Component/Util/Box/FullBox'
import Button1 from '../../../Component/Util/Buttons/Button1'
import InputWithLabel from '../../../Component/Util/Input/InputWithLabel'
import { BasicProfileUpdate, updateEmailAddressEndPoint, updatePhoneNumberConfirmation, updatePhoneNumberRequest, userPasswordUpdater } from '../../../API/api_request'
import { useDispatch, useSelector } from 'react-redux'
import { userAction } from '../../../redux/slice/UserSlicer'
import ComponentHelper from '../../../helper/ComponentHelper'
import { const_data } from '../../../CONST/const_data'
import * as Yup from 'yup'
import WhiteBox from '../../../Component/Util/Box/WhiteBox'
import UserProfile from '../../../Component/Util/ElementRelated/UserProfile'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ButtonWithoutBg from '../../../Component/Util/Buttons/ButtonWithoutBg'

function ProfileUpdate() {





    let dispatch = useDispatch()
    let currentUser = useSelector((state) => state.userAuth.user)
    let [firstName, firstNameUpdater] = useState();
    let [lastName, lastNameUpdater] = useState();;
    let [emailAddress, emailAddressUpdater] = useState();
    let [phoneNumberOTPHandler, phoneNumberUpdater] = useState();

    let [isOtpSendPhoneNumber, setIsOtpSendPhoneNumber] = useState(false);
    let [phoneNumberOTP, setPhoneNumberOTP] = useState(false);


    useEffect(() => {
        console.log(currentUser)
    }, [])

    let [passwordState, passwordStateUpdater] = useState()
    let [cpasswordState, cpasswordStateUpdater] = useState()
    let [currentPassword, currentPasswordUpdater] = useState()

    let basicProfileHandling = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
    })

    let phoneNumberValidator = Yup.object().shape({
        phone_number: Yup.string("Please enter valid number")
            .matches(/^\d{10}$/, "Please enter a 10-digit number")
            .required("Phone number is required")
    })

    let basicProfileValidation = Yup.object().shape({
        first_name: Yup.string("Please enter valid string").required("First name is required"),
        last_name: Yup.string("Please enter valid last name")
    })

    let otpValidation = Yup.object().shape({
        otp_number: Yup.number("Please enter valid OTP Number").min(4, "Minimum 4 digit").required("OTP number is required")
    })

    let emailValidation = Yup.object().shape({
        email_address: Yup.string("Please enter valid email").email("Please enter valid email").required("Email field is required")
    })

    let passwordValidation = Yup.object().shape({
        current_password: Yup.string().required("Current Password is required").min(6, 'Password must be at least 6 characters'),
        password: Yup.string().required("Password is required").min(6, 'Password must be at least 6 characters'),
        cpassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password"), null], 'Password should be match').min(6, 'Password must be at least 6 characters'),
    })


    function emailUpdation(values) {
        let email_address = values.email_address;

        updateEmailAddressEndPoint(email_address).then((data) => {
            let response = data?.data;
            console.log(response)
            if (response?.status) {
                toast.success("Verification link has been sent to email address")
            } else {
                toast.error(response?.msg ?? "Something went wrong")
            }
        }).catch((err) => {
            console.log(err)
            toast.error("Something went wrong")
        })
    }

    function basicProfileUpdation(values) {


        let firstName = values.first_name;
        let lastName = values?.last_name;

        BasicProfileUpdate({
            userdata: {
                first_name: firstName,
                last_name: lastName
            }
        }).then((data) => {
            if (data?.data?.status) {
                let user = { ...currentUser };

                user.firstName = firstName;
                user.lastName = lastName
                console.log(user)
                dispatch(userAction.updateUser({ user }))
                toast.success("Basic profile update success")
            } else {
                toast.error("Basic profile update failed 1")
            }
        }).catch((err) => {
            console.log(err)
            toast.error("Basic profile update failed 2 ")
        })

    }


    function handlePhoneNumberUpdate(values) {

        let phoneNumber = values?.phone_number
        let otp_number = values?.otp_number;
        setPhoneNumberOTP(phoneNumber);

        if (!isOtpSendPhoneNumber) {
            updatePhoneNumberRequest(phoneNumber).then((data) => {
                console.log(data)
                let response = data?.data;
                if (response?.status) {
                    phoneNumberUpdater(phoneNumber)
                    setIsOtpSendPhoneNumber(true)
                    toast.success(`OTP has sent to ${phoneNumber}`)
                } else {
                    toast.error(`Something went wrong`);
                }
            }).catch((err) => {
                toast.error(`Something went wrong`);
            })
        } else {
            updatePhoneNumberConfirmation(otp_number).then((isSuccess) => {
                let response = isSuccess?.data;
                let msg = response?.msg
                if (response.status) {

                    let newUser = { ...currentUser }; // this is an object
                    newUser.mobile = phoneNumberOTPHandler + "";
                    dispatch(userAction.updateUser({ user: newUser }))
                    toast.success(`Phone number update success`)

                } else {
                    toast.error(msg);
                }
            }).catch((err) => {
                toast.error(msg);
            })
        }
    }

    function passwordSubmitHandle() {

        passwordValidation.validate({ password: passwordState, cpassword: cpasswordState, current_password: currentPassword }).then(() => {
            userPasswordUpdater(passwordState, currentPassword).then((data) => {
                let response = data?.data;
                if (response?.status) {
                    if (data.data?.status) {
                        toast.success("Password update success")
                    } else {
                        toast.error(response?.msg)
                    }
                } else {
                    toast.error(response?.msg)
                }

            }).catch((err) => {
                toast.error("Password update failed 2")
            })
        }).catch((err) => {
            toast.error("Password update failed 3")
        })
    }

    function resendOtpCode() {

        updatePhoneNumberRequest(phoneNumberOTP).then((data) => {
            console.log(data)
            let response = data?.data;
            if (response?.status) {
                toast.success(`OTP has sent to ${phoneNumberOTP}`)
            } else {
                toast.error(`Something went wrong`);
            }
        }).catch((err) => {
            toast.error(`Something went wrong`);
        })
    }


    return (
        <DashBoardLayout>
            <DashboardSectionTitle title={"Update Profile"} icon={"uil-user"}></DashboardSectionTitle>

            <div class="mt-3">
                <WhiteBox>
                    <div className="row p-2">
                        <div className="col-md-3 d-flex justify-content-center align-items-center">
                            <UserProfile></UserProfile>
                        </div>
                        <div className="col-md-9">
                            <Link class="user-item" to="#"><i class="uil uil-user"></i>{currentUser?.first_name + " " + currentUser?.last_name}</Link>
                            <Link class="user-item" href="#"><i class="uil uil-tag"></i>{currentUser?.username}</Link>
                            <Link class="user-item" href="#"><i class="uil uil-phone"></i>{currentUser?.mobile}</Link>
                            <Link class="user-item" href="#"><i class="uil uil-envelope-add"></i>{currentUser?.email}</Link>
                            <Link class="user-item" to="#">
                                <i class="uil uil-megaphone"> </i>
                                Referal Code : {currentUser?.referal_code}


                                <i class="uil uil-clipboard"></i>

                            </Link>
                            {/* <Link class="user-item" to="#"><i class="uil uil-user"></i>{currentUser?.firstName + " " + currentUser?.lastName}</Link> */}


                        </div>
                    </div>
                </WhiteBox>
            </div>

            <Formik
                initialValues={{
                    first_name: "",
                    last_name: ""
                }}
                onSubmit={basicProfileUpdation}
                validationSchema={basicProfileValidation}
            >
                <Form>
                    <FullBox title={<h4>Update Basic Profile</h4>} footer={<Button1 onClick={() => { }} title="Save Changes"></Button1>}>

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="">First Name</label>
                                <div class="form-group pos_rel">
                                    <Field class="form-control lgn_input" placeholder={"Enter First Name"} type={"text"} name={"first_name"}></Field>
                                    <i className='uil-calling lgn_icon'></i>
                                </div>
                                <ErrorMessage component="div" className="formValidateError" name="first_name"></ErrorMessage>

                                {/* <InputWithLabel placeholder={"Enter first name"} label={"First name"} onChange={(e) => { firstNameUpdater(e.target.value) }} isRequired={true} type={"text"} name={"first_name"} icon={<i className='uil-user lgn_icon'></i>}></InputWithLabel> */}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Last Name</label>
                                <div class="form-group pos_rel">
                                    <Field class="form-control lgn_input" placeholder={"Enter Last Name"} type={"text"} name={"last_name"}></Field>
                                    <i className='uil-calling lgn_icon'></i>
                                </div>
                                <ErrorMessage component="div" className="formValidateError" name="last_name"></ErrorMessage>

                                {/* <InputWithLabel placeholder={"Enter last name"} label={"Last name"} onChange={(e) => { lastNameUpdater(e.target.value) }} isRequired={true} type={"text"} name={"last_name"} icon={<i className='uil-user lgn_icon'></i>}></InputWithLabel> */}

                            </div>
                        </div>
                    </FullBox>
                </Form>
            </Formik>

            <div className="row">
                <div className="col-md-6">
                    <Formik
                        initialValues={{ phone_number: "", otp_number: "" }}
                        onSubmit={handlePhoneNumberUpdate}
                        validationSchema={!isOtpSendPhoneNumber ? phoneNumberValidator : otpValidation}
                    >
                        <Form>
                            <FullBox title={<h4>Update Phone Number</h4>} footer={<Button1 type="submit" title="Update Phone Number"></Button1>}>


                                <div className="row">

                                    {!isOtpSendPhoneNumber ? (
                                        <div className="col-md-12">
                                            <label htmlFor="">Phone Number</label>
                                            <div class="form-group pos_rel">
                                                <Field class="form-control lgn_input" placeholder={"Enter phone number"} type={"number"} name={"phone_number"}></Field>
                                                <i className='uil-calling lgn_icon'></i>
                                            </div>
                                            <ErrorMessage component="div" className="formValidateError" name="phone_number"></ErrorMessage>

                                        </div>)
                                        : (
                                            <div className="col-md-12">
                                                <label htmlFor="">OTP Number</label>
                                                <div class="form-group pos_rel">
                                                    <Field class="form-control lgn_input" placeholder={"Enter OTP Number"} type={"number"} name={"otp_number"}></Field>
                                                    <i className='uil-calling lgn_icon'></i>
                                                </div>
                                                <ButtonWithoutBg type="button" onClick={resendOtpCode} title="Resend OTP"></ButtonWithoutBg>
                                                <ErrorMessage component="div" className="formValidateError" name="otp_number"></ErrorMessage>

                                            </div>)}


                                </div>
                            </FullBox>
                        </Form>
                    </Formik>
                </div>

                <div className="col-md-6">
                    <Formik
                        initialValues={{
                            email_address: ""
                        }}
                        onSubmit={emailUpdation}
                        validationSchema={emailValidation}
                    >

                        <Form>
                            <FullBox title={<h4>Update Email Address</h4>} footer={<Button1 onClick={() => { }} title="Update Email Address"></Button1>}>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-md-12">
                                            <label htmlFor="">Email Address</label>
                                            <div class="form-group pos_rel">
                                                <Field class="form-control lgn_input" placeholder={"Enter Email Address"} type={"text"} id="email_address" name={"email_address"}></Field>
                                                <i className='uil-envelope-alt lgn_icon'></i>
                                            </div>
                                            <ErrorMessage component="div" className="formValidateError" name="email_address"></ErrorMessage>

                                        </div>
                                    </div>
                                </div>
                            </FullBox>
                        </Form>
                    </Formik>
                </div>
                <div className="col-md-12">
                    <FullBox title={<h4>Update Password</h4>} footer={<Button1 title="Update Password" onClick={() => { passwordSubmitHandle() }}></Button1>}>

                        <div className="row">
                            <div className="col-md-6">
                                <InputWithLabel placeholder={"Current Password"} label={"Current Password"} onChange={(e) => { currentPasswordUpdater(e.target.value) }} isRequired={true} type={"password"} name={"password"} icon={<i className='uil-lock lgn_icon'></i>}></InputWithLabel>
                            </div>

                            <div className="col-md-6">
                                <InputWithLabel placeholder={"Enter Password"} label={"Password"} onChange={(e) => { passwordStateUpdater(e.target.value) }} isRequired={true} type={"password"} name={"password"} icon={<i className='uil-lock lgn_icon'></i>}></InputWithLabel>
                            </div>
                            <div className="col-md-6">
                                <InputWithLabel placeholder={"Enter Confirm Password"} label={"Confirm Password"} onChange={(e) => { cpasswordStateUpdater(e.target.value) }} isRequired={true} type={"password"} name={"cpassword"} icon={<i className='uil-lock lgn_icon'></i>}></InputWithLabel>
                            </div>
                        </div>
                    </FullBox>
                </div>
            </div>
        </DashBoardLayout >
    )
}

export default ProfileUpdate
