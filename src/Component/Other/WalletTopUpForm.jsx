import React from 'react'
import FullBox from '../Util/Box/FullBox'
import InputWithLabel from '../Util/Input/InputWithLabel'
import Button1 from '../Util/Buttons/Button1'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { createWalletOrder, verifyRazorpay, verifyWalletOrder } from '../../API/api_request'
import { const_data } from '../../CONST/const_data'
import { toast } from 'react-toastify'

function WalletTopUpForm({ on_success }) {


    let initValues = {
        full_name: "",
        phone_number: "",
        amount: ""
    }

    function addBalance(values, { resetForm }) {
        createWalletOrder(values.amount, values.full_name, values.phone_number).then((data) => {
            let response = data?.data;
            console.log(response)
            if (response?.status) {
                let order_id = response?.order_id
                let options = {
                    "key": const_data.RAZORPAY_CRED.KEY,
                    "amount": amount,
                    "currency": "INR",
                    "name": full_name,
                    "description": "Wallet Reacharge",
                    "order_id": order_id,
                    "handler": function (response) {

                        verifyWalletOrder(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature).then((data) => {
                            let response = data?.data;
                            if (response?.status) {
                                toast.success("Wallet reacharge success")
                                on_success();
                                resetForm();
                            } else {
                                toast.error("Something went wrong ")
                            }
                        }).catch((err) => { 
                            toast.error("Something went wrong ")
                        })
                    },
                    "prefill": {
                        "name": full_name,
                    },
                };

                var rzp1 = new window.Razorpay(options);
                rzp1.open();
                rzp1.on('payment.failed', function (response) {
                    toast.error("Payment failed due to : " + response.error.reason)
                });

            } else {
                toast.error("Something went wrong ")
            }
        }).catch((err) => {
            console.log(err)
            toast.error("Something went wrong")
        })
    }

    let validateWallet = Yup.object().shape({
        full_name: Yup.string("Enter full name").required("Please enter full name"),
        phone_number: Yup.string("Enter full name").length(10,"Please enter 10 digit phone number").required("Please enter phone number"),
        amount: Yup.number("Enter amount name").min(10,"10-/ Minimum").max(10000,"Maximum 10000").required("Please enter amount"),
    })


    return (
        <FullBox title={<h4>Add Balance</h4>}  >

            <Formik initialValues={initValues} onSubmit={addBalance} validationSchema={validateWallet}>
                <Form>
                    <div className="mb-3">
                        <label>Enter full name</label>
                        <div className="form-group pos_rel mb-0">
                            <Field className="form-control lgn_input" name="full_name" id="full_name" type="text" placeholder="Enter full name"></Field>
                            <i className='uil uil-user lgn_icon'></i>
                        </div>
                        <ErrorMessage name='full_name' component="div" className="formValidateError" ></ErrorMessage>

                    </div>

                    <div className="mb-3">

                        <label>Enter phone number</label>
                        <div className="form-group pos_rel mb-0">
                            <Field className="form-control lgn_input" name="phone_number" id="phone_number" type="text" placeholder="Enter phone number"></Field>
                            <i className='uil uil-user lgn_icon'></i>
                        </div>
                        <ErrorMessage name='phone_number' component="div" className="formValidateError" ></ErrorMessage>

                    </div>

                    <div className="mb-3">
                        <label>Enter amount</label>
                        <div className="form-group pos_rel mb-0">
                            <Field className="form-control lgn_input" name="amount" id="amount" type="text" placeholder="Enter amount"></Field>
                            <i className='uil uil-user lgn_icon'></i>
                        </div>
                        <ErrorMessage name='amount' component="div" className="formValidateError" ></ErrorMessage>

                    </div>

                    <Button1 element_type="button" title="Add Wallet" type="submit"></Button1>

                </Form>
            </Formik>


        </FullBox>
    )
}

export default WalletTopUpForm