import React, { Fragment, useEffect, useState } from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import Breadcrumb from '../../../Component/Util/ElementRelated/Breadcrumb'
import PhoneVerification from '../../../Component/Cart/CheckoutSteps/PhoneVerification'
import DeliveryTime from '../../../Component/Cart/CheckoutSteps/DeliveryTime'
import Payment from '../../../Component/Cart/CheckoutSteps/Payment'
import SelectAddress from '../../../Component/Cart/CheckoutSteps/SelectAddress'
import Summary from '../../../Component/Util/Checkout/Summary'
import { getSingleInvoice, getUserByJwt, get_single_address, invoiceSummary as invoiceSummaryApi, invoice_update, razorpayeOrderCreate, verifyRazorpay } from '../../../API/api_request'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { const_data } from '../../../CONST/const_data'
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas'
import CoupenCodeApply from '../../../Component/Cart/CoupenCodeApply'
import { getUserByJwtToken } from '../../../redux/slice/UserSlicer'
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner'
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser'

function Checkout() {

    // let [priceList, setPriceList] = useState({});
    // let [selectedAddress, setSelectedAddress] = useState(null);
    let userData = useSelector((state) => state.userAuth.user)
    let [selectedDeliveryTime, setSelectedDeliveryTime] = useState(null);
    let [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    let phoneNumber = useSelector((state) => state.userCheckout.phoneNumber);
    let invoiceID = useSelector((state) => state.userCheckout.invoice_id);
    let navigate = useNavigate();
    let [thisInvoice, setThisInvoice] = useState({})
    let [stateUpdate, setStateUpdate] = useState(true);
    let dispatch = useDispatch()
    let [isReadyToPlace, setIsReadyToPlace] = useState(false);
    let [invoiceSummary, setInvoiceSummary] = useState({});


    // let cartData = useSelector((state) => state.userCart);
    // console.log(cartData)

    useEffect(() => {
        invoiceSummaryApi(invoiceID).then((data) => {
            let response = data?.data 
            if (response?.status) {
                setInvoiceSummary(response?.summery)
                setIsReadyToPlace(true)
            } else {
                navigate("/cart", { replace: true })
            }
        }).catch((err) => {
            navigate("/cart", { replace: true })
        })
    }, [])

    useEffect(() => {
        if (invoiceID == null || phoneNumber == null) {
            navigate("/cart", { replace: true })
        }

        getSingleInvoice(invoiceID).then((data) => {
            let response = data?.data;
            if (response?.status) {
                let invoice = response?.invoice;
                setThisInvoice(invoice)
            }
        }).catch((err) => { })
    }, [stateUpdate])

    function initRazorPay(order) {

        let optionRazorPay = {
            key: const_data.RAZORPAY_CRED.KEY,
            amount: order.amount,
            currency: order.currency,
            name: "Veguess Checkout",
            description: "Final Checkout",
            order_id: order.id,
            handler: async (response) => {
                verifyRazorpay(response).then((data) => {

                    let paymentData = data?.data;
                    if (paymentData?.status) {

                        let { payment_id } = paymentData.payment_data;
                        invoice_update(invoiceID, {
                            delivery_time: selectedDeliveryTime,
                            payment_method: selectedPaymentMethod,
                            payment_status: " PAID",
                            payment_id,
                            payment_date: new Date(),
                            order_placed: true,
                        }).then(async (placedOrder) => {
                            let data = placedOrder.data;
                            if (data?.status) {
                                let is_coupen = data?.coupen;
                                if (is_coupen) {
                                    alert("You won a coupen")
                                }

                                toast.success("Order placed success");
                                navigate("/order_success/" + invoiceID)
                            } else {
                                toast.error(data.msg);
                            }
                        }).catch((err) => {
                            console.log(err)
                            toast.error("Something went wrong");
                        })
                    } else {
                        toast.error("Something went wrong");
                    }

                }).catch((err) => {
                    console.log(err);
                    toast.error("Payment Failed")
                })
            },
            theme: {
                color: "#3399cc",
            },
        }
        const rzp1 = new window.Razorpay(optionRazorPay)
        rzp1.open();
    }

    function placeOrder() {

        if (isReadyToPlace) {

            if (selectedPaymentMethod == const_data.PAYMENT_METHOD.RAZORPAY) {

                razorpayeOrderCreate(invoiceID).then((order_data) => {
                    let response = order_data?.data;
                    if (response?.status) {
                        let order = response.order;
                        initRazorPay(order)
                    } else {
                        console.log(response)
                        toast.error("Something went wrong")
                    }
                }).catch((err) => {
                    console.log(err)
                    toast.error("Something went wrong")
                })
            } else {
                invoice_update(invoiceID, {
                    delivery_time: selectedDeliveryTime,
                    payment_method: selectedPaymentMethod,
                    payment_status: "POST PAID",
                    payment_date: new Date(),
                    order_placed: true,
                }).then(async (placedOrder) => {
                    let data = placedOrder.data;

                    if (data?.status) {
                        let is_coupen = data?.coupen;
                        if (is_coupen) {
                            alert("You won a coupen")
                        }
                        toast.success("Order placed success");
                        navigate("/order_success/" + invoiceID)
                        dispatch(await getUserByJwtToken({ jwt: userData.access_token }))
                    } else {
                        toast.error(data.msg);
                    }
                }).catch((err) => {
                    toast.error("Something went wrong");
                })
            }
        }
    }


    return (
        <Fragment>
            <LoadingSpinner isShow={!isReadyToPlace}></LoadingSpinner>

            <CartUserOverCanvas />
            <CategoryModalUser></CategoryModalUser>
            <UserLayout>
                <Breadcrumb pageName={"Checkout"}></Breadcrumb>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8">
                            <div id="checkout_wizard" class="checkout accordion left-chck145">
                                <div class="checkout-step">

                                    <PhoneVerification></PhoneVerification>
                                </div>
                                <div class="checkout-step">
                                    <DeliveryTime stateField={setSelectedDeliveryTime}></DeliveryTime>
                                </div>
                                <div class="checkout-step">
                                    <Payment sub_total={(invoiceSummary?.subTotal - Math.floor(thisInvoice?.original_amount - thisInvoice?.total_amount))} stateField={setSelectedPaymentMethod}></Payment>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Summary title={"Cart Summary"} list={[{
                                title: "Total",
                                value: invoiceSummary?.total ?? 0,
                            },
                            {
                                title: "Discount",
                                value: invoiceSummary?.discount ?? 0,
                            },
                            {
                                title: "Coupen Discount",
                                value: Math.floor(thisInvoice?.original_amount - thisInvoice?.total_amount) ?? 0,
                            }, {
                                title: "Sub total",
                                value: (invoiceSummary?.subTotal - Math.floor(thisInvoice?.original_amount - thisInvoice?.total_amount)) ?? 0,
                            }]}

                                total={(invoiceSummary?.subTotal - Math.floor(thisInvoice?.original_amount - thisInvoice?.total_amount)) ?? 0}></Summary>
                            <div class="payment-secure bg-white">
                                <i class="uil uil-padlock"></i>Secure checkout
                            </div>
                            <CoupenCodeApply onSubmit={() => { setStateUpdate(!stateUpdate) }} invoice_id={invoiceID}></CoupenCodeApply>
                            <div class="checkout-safety-alerts">
                                <p><i class="uil uil-sync"></i>100% Replacement Guarantee</p>
                                <p><i class="uil uil-check-square"></i>100% Genuine Products</p>
                                <p><i class="uil uil-shield-check"></i>Secure Payments</p>
                            </div>
                            <button onClick={placeOrder} class="mt-2 w-100 next-btn16 hover-btn">Place Order</button>

                        </div>
                    </div>
                </div>
            </UserLayout>
        </Fragment>
    )
}

export default Checkout
