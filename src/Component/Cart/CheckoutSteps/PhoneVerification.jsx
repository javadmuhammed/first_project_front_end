import React, { Fragment, useEffect, useRef, useState } from 'react'
import OTPInput from 'react-otp-input';
import { invoicePhoneNumberUpdate, invoicePhoneVerification, resendCheckoutVerificationOtp } from '../../../API/api_request';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PhoneVerification() {

    const [otp, setOtp] = useState("");
    let allStateCheckout = useSelector((state) => state.userCheckout);
    let phoneNumber = useSelector((state) => state.userCheckout.phoneNumber);
    let invoiceID = useSelector((state) => state.userCheckout.invoice_id);
    let navigate = useNavigate()
    let [resendOtpAvailable, setReSendOtp] = useState(false);
    let [timer, setTimer] = useState(30);

    let newPhoneNumber = useRef();

    let otpHandle1 = useRef();
    let otpHandle2 = useRef();
    let otpHandle3 = useRef();
    let otpHandle4 = useRef();


    useEffect(() => {
        let interval;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else {
            setReSendOtp(true);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timer]);






    function updateInvoicePhone() {

        let newNumber = newPhoneNumber.current.value;
        const phoneNumberPattern = /^[0-9]{10}$/;

        if (phoneNumberPattern.test(newNumber)) {
            invoicePhoneNumberUpdate(newNumber, invoiceID).then((data) => {
                let responseData = data.data;
                if (responseData?.status) {
                    console.log(responseData)
                    toast.success("Phone number updated success")
                } else {
                    toast.error("Something went wrong")
                }
            }).catch((err) => {
                toast.error("Something went wrong")
            })
        } else {
            toast.error("Phone number is not valid")
        }
    }

    const handleOtpChange = (e) => {

        console.log(invoiceID)

        let otp1 = otpHandle1.current.value;
        let otp2 = otpHandle2.current.value;
        let otp3 = otpHandle3.current.value;
        let otp4 = otpHandle4.current.value;

        let otp = `${otp1}${otp2}${otp3}${otp4}`;
        setOtp(otp);
        if (otp.length == 4) {
            invoicePhoneVerification(otp, phoneNumber, invoiceID).then((dt) => {
                let resultData = dt.data;
                if (resultData?.status) {
                    toast.success("OTP Verification success")
                } else {
                    toast.error(resultData.msg)
                }
            }).catch((err) => {
                toast.error("OTP Verification Failed")
            })
        }

    };


    function resendCheckoutOTP() {
        resendCheckoutVerificationOtp(phoneNumber, invoiceID).then((data) => {
            let response_data = data?.data;
            if (response_data) {
                if (response_data?.status) {
                    toast.success("OTP Resended")
                    setTimer(30);
                    setReSendOtp(false);
                } else {
                    toast.error("OTP Resended Failed")
                }
            } else {
                toast.error("Something went wrong")
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }



    useEffect(() => {
        otpHandle1.current.addEventListener("input", handleOtpChange)
        otpHandle2.current.addEventListener("input", handleOtpChange)
        otpHandle3.current.addEventListener("input", handleOtpChange)
        otpHandle4.current.addEventListener("input", handleOtpChange)
    }, [])


    return (
        <Fragment>
            <div class="checkout-card" id="headingOne">
                <span class="checkout-step-number">1</span>
                <h4 class="checkout-step-title">
                    <button class="wizard-btn" type="button" data-toggle="collapse"
                        data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Phone Number Verification</button>
                </h4>
            </div>
            <div id="collapseOne" class="collapse in show" data-parent="#checkout_wizard">
                <div class="checkout-step-body">
                    <p>We need your phone number so we can inform you about any delay or problem.
                    </p>
                    <p class="phn145">4 digits code send your phone <span>+91{phoneNumber}</span><a
                        class="edit-no-btn hover-btn" data-toggle="collapse"
                        href="#edit-number">Edit</a></p>
                    <div class="collapse" id="edit-number">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="checkout-login">

                                    <div class="login-phone">
                                        <input type="text" class="form-control" ref={newPhoneNumber}
                                            placeholder="Phone Number" />
                                    </div>
                                    <button class="chck-btn hover-btn"
                                        href="#" onClick={updateInvoicePhone}>Send
                                        Code</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="otp-verifaction">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group mb-0">
                                    <label class="control-label">Enter Code</label>
                                    <div className="otpField d-flex" style={{ gap: "10px" }}>
                                        <input ref={otpHandle1} style={{ textAlign: 'center', maxWidth: "50px" }} type="text" placeholder="" class="form-control input-md" required=""></input>
                                        <input ref={otpHandle2} style={{ textAlign: 'center', maxWidth: "50px" }} type="text" placeholder="" class="form-control input-md" required=""></input>
                                        <input ref={otpHandle3} style={{ textAlign: 'center', maxWidth: "50px" }} type="text" placeholder="" class="form-control input-md" required=""></input>
                                        <input ref={otpHandle4} style={{ textAlign: 'center', maxWidth: "50px" }} type="text" placeholder="" class="form-control input-md" required=""></input>
                                    </div>
                                    {
                                        resendOtpAvailable ? <button   class="resend-link bg-white" onClick={resendCheckoutOTP}>Resend Code </button> : <button   class="resend-link bg-white" >Please wait for {timer} seconds</button>
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

export default PhoneVerification
