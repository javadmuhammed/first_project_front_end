import React, { Fragment, useState } from 'react'
import LogoWidget from '../../../Component/Util/Logo/LogoWidget'
import SimpleBox from '../../../Component/Util/Box/SimpleBox'
import InputOne from '../../../Component/Util/Input/InputOne'
import Button1 from '../../../Component/Util/Buttons/Button1'
import BlackButton from '../../../Component/Util/Buttons/BlackButton'
import CopyRight from '../../../Component/UserPartials/Footer/CopyRight'
import { userOtpValidationForSignup, userSignUpRequest } from '../../../API/api_request'
import { useNavigate, useParams } from 'react-router-dom'
import ComponentHelper from '../../../helper/ComponentHelper'
import { const_data } from '../../../CONST/const_data'
import * as Yup from 'yup';
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner'

function UserSignup() {

    let { referal_code } = useParams();


    let [isOtpSend, otpSendUpdate] = useState(false);
    let [firstName, firstNameUpdate] = useState("");
    let [lastName, lastNameUpdate] = useState("");
    let [email, emailUpdate] = useState("");
    let [phoneNumber, phoneUpdate] = useState("");
    let [password, passwordUpdate] = useState("");
    let [cpassword, cpasswordUpdate] = useState("");
    let [userid, useridUpdate] = useState("")
    let [otp, otpUpdater] = useState("");

    let [isSpinning, setSpinning] = useState(false);



    const fisrtLevel = Yup.object().shape({
        isOtpSend: Yup.boolean(),
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string()
            .matches(/^\d{10}$/, 'Phone number must be 10 digits')
            .required('Phone Number is required'),
        userid: Yup.string()
    });

    const secondLevel = Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        cpassword: Yup.string().required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        otp: Yup.string().required('OTP is required')
    });

    let [alertComponent, alertComponetUpdate] = useState({ component: null })

    let navigate = useNavigate()




    function sendOTP() {
        setSpinning(true);
        fisrtLevel.validate({ isOtpSend, firstName, lastName, email, phoneNumber, userid }).then(() => {
            userSignUpRequest({ firstName, lastName, email, phoneNumber, invited_code: referal_code }).then((user) => {
                if (user.data?.status) {
                    setSpinning(false);
                    otpSendUpdate(true)
                    useridUpdate(user.data?.user?._id)
                    alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.SUCCESS, "OTP has been send to mail") })
                } else {
                    console.log(user.data)
                    alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, user?.data?.msg) })
                    setSpinning(false);
                }
            }).catch((err) => {
                setSpinning(false);
                alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, "Something Went Wrong") })
            })
        }).catch((err) => {
            setSpinning(false);
            alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, err.message ?? "Something went wrong") })
        })
    }

    function verifyOTP() {
        setSpinning(true);
        secondLevel.validate({ otp, password, cpassword }).then(() => {
            userOtpValidationForSignup({ otp, userid, password }).then((otpValidated) => {
                console.log(otpValidated)
                if (otpValidated.data?.status) {
                    setSpinning(false);
                    navigate("/login")
                } else {
                    setSpinning(false);
                    alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, otpValidated.data?.msg) })
                }
            }).catch((err) => {
                setSpinning(false);
                console.log(err);
            })
        }).catch((err) => {
            setSpinning(false);
            alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, err.message) })
        })

    }


    function inputChange(e, stateUpdate) {
        stateUpdate(e.target.value)
    }
    return (
        <Fragment>
            <div className="screenCenter pt-5">
                <LogoWidget></LogoWidget>
                <LoadingSpinner isShow={isSpinning}></LoadingSpinner>
                <SimpleBox>
                    <div className="text-center   pr-5 pl-5  pt-5 ">
                        <h3 className='mb-5'>Sign Up</h3>
                        {
                            alertComponent.component != null ? alertComponent.component : null
                        }
                        <form action="" method="post">
                            {
                                !isOtpSend ? (
                                    <div>
                                        <InputOne value={firstName} state={firstNameUpdate} onChange={inputChange} name="firstName" type="text" placeholder="Enter first name" isRequired={true} icon={<i class="uil uil-user lgn_icon"></i>}  ></InputOne>
                                        <InputOne value={lastName} state={lastNameUpdate} onChange={inputChange} name="lastName" type="text" placeholder="Enter last name" isRequired={true} icon={<i class="uil uil-user lgn_icon"></i>}  ></InputOne>

                                        <InputOne value={email} state={emailUpdate} onChange={inputChange} name="email" type="email" placeholder="Enter email address" isRequired={true} icon={<i class="uil uil-envelope-alt lgn_icon"></i>}  ></InputOne>
                                        <InputOne value={phoneNumber} state={phoneUpdate} onChange={inputChange} name="phone" type="number" placeholder="Enter phone number" isRequired={true} icon={<i class="uil uil-calling lgn_icon"></i>}  ></InputOne>

                                        <div className="mt-2">
                                            <Button1 onClick={sendOTP} type="button" isFullWidth={true} element_type="b" title="Send OTP"></Button1>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <InputOne value={password} state={passwordUpdate} onChange={inputChange} name="password" type="password" placeholder="Enter password" isRequired={true} icon={<i class="uil uil-padlock lgn_icon"></i>}  ></InputOne>
                                        <InputOne value={cpassword} state={cpasswordUpdate} onChange={inputChange} name="cpassword" type="password" placeholder="Enter confirm password" isRequired={true} icon={<i class="uil uil-padlock lgn_icon"></i>}  ></InputOne>

                                        <InputOne value={otp} state={otpUpdater} onChange={inputChange} name="otp" type="number" placeholder="Enter OTP number" isRequired={true} icon={<i class="uil uil-padlock lgn_icon"></i>}  ></InputOne>


                                        <div className="mt-2">
                                            <Button1 onClick={verifyOTP} isFullWidth={true} type="button" element_type="b" title="Verify OTP"></Button1>
                                        </div>
                                    </div>
                                )
                            }



                        </form>
                    </div>
                    <div className="alertSignUp mt-3">
                        <a href="" className='anchorWhite'>Already have an account?  </a>
                        <BlackButton type="a" href={"/login"} title="Sign in now"></BlackButton>
                    </div>
                </SimpleBox>
                <div className="text-center">
                    <CopyRight></CopyRight>
                </div>
            </div>
        </Fragment>
    )
}

export default UserSignup
