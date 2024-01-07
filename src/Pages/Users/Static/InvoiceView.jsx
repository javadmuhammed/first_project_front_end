import React from 'react'
import { useParams } from 'react-router-dom';
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout';
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas';
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser';
import FullBox from '../../../Component/Util/Box/FullBox';
import InvoiceSection from '../../../Component/Util/Box/InvoiceSection';
import { useState } from 'react';
import { useEffect } from 'react';
import { downloadInvoiceEndPoint, getSingleOrderByNumber, invoice_update, razorpayeOrderCreate, updateOrderInvoice, verifyRazorpay } from '../../../API/api_request';
import CartItem from '../../../Component/Cart/CartItem';
import OrderTracking from '../../../Component/OrdersRelated/OrderTracking';
import Summary from '../../../Component/Util/Checkout/Summary';
import Button1 from '../../../Component/Util/Buttons/Button1';
import WhiteBox from '../../../Component/Util/Box/WhiteBox';
import { const_data } from '../../../CONST/const_data';
import { toast } from 'react-toastify'

function InvoiceView() {

    let { order_id } = useParams();
    let [thisOrder, setThisOrder] = useState();

    useEffect(() => {
        getSingleOrderByNumber(order_id).then((order_data) => {
            let response = order_data.data;
            setThisOrder(response.order[0])
            console.log(response.order[0])
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    function downloadInvoice() {

        downloadInvoiceEndPoint(thisOrder?._id).then((downloadUrl) => {

            console.log(downloadUrl.data)
            let blob = new Blob([downloadUrl.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'example.pdf';
            a.click();
        }).catch((err) => {
            console.log(err)
        })
    }

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
                        updateOrderInvoice(thisOrder?._id, thisOrder?.invoice_id, {
                            payment_method: const_data.PAYMENT_METHOD.RAZORPAY,
                            payment_status: "PAID",
                            payment_id,
                            payment_date: new Date(),
                        }, {
                            payment_type: const_data.PAYMENT_METHOD.RAZORPAY
                        }).then((placedOrder) => {
                            let data = placedOrder.data;
                            console.log(data)
                            if (data?.status) {
                                toast.success("Payment update success");
                            } else {
                                toast.error("Something went wrong3");
                            }
                        }).catch((err) => {
                            console.log(err)
                            toast.error("Something went wrong2");
                        })
                    } else {
                        console.log(paymentData)
                        toast.error("Something went wrong1");
                    }

                }).catch((err) => {
                    console.log(err)
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


    function payInvoice() {
        razorpayeOrderCreate(thisOrder?.invoice_number).then((order) => {
            console.log(order)
            let response = order?.data;
            if (response?.status) {
                initRazorPay(response.order);
            } else {
                toast.error("Something went wrong");
            }
        }).catch((err) => {
            console.log(err)
            toast.error("Something went wrong");
        })
    }

    return (
        <UserLayout>
            <CartUserOverCanvas></CartUserOverCanvas>
            <CategoryModalUser></CategoryModalUser>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">

                        <div className='mt-3'>

                            <div className="MarginLessContainer">

                                <FullBox title={<h4>Product Details</h4>} footer={""} withoutFooter={true}  >
                                    <InvoiceSection title={"Product Details Title"} >
                                        <div className='productDetailsInvoice'>Product Name :  <span>{thisOrder?.product?.name}</span></div>
                                        <div className='productDetailsInvoice'>Product ID :  <span>{thisOrder?.product?._id}</span></div>
                                        <div className='productDetailsInvoice'>Product Description :  <span>{thisOrder?.product?.small_description}</span></div>
                                        <div className='productDetailsInvoice'>Product Price :  <span>{thisOrder?.product?.sale_price}</span></div>
                                        <div className='productDetailsInvoice'>Product Original Price :  <span>{thisOrder?.product?.original_price}</span></div>

                                    </InvoiceSection>
                                </FullBox>

                                <FullBox title={<h4>Shippig Address</h4>} footer={""} withoutFooter={true}  >
                                    <InvoiceSection title={"Shipper Details"} >
                                        <div class="delivery-man">
                                            <div>
                                                <span>Deliver to:</span>
                                                <h6 className='mt-2'>{thisOrder?.shipper_name}</h6>
                                                <h6>{thisOrder?.address?.address}</h6>
                                            </div>
                                        </div>
                                    </InvoiceSection>
                                </FullBox>


                                <FullBox title={<h4>Current Status</h4>} footer={""} withoutFooter={true}  >
                                    <InvoiceSection title={""}>
                                        <OrderTracking title={""} currentStatus={thisOrder?.status}></OrderTracking>
                                    </InvoiceSection>
                                </FullBox>


                                <Summary title={"Order Summary"} list={[{
                                    title: "Total",
                                    value: thisOrder?.products?.quantity * thisOrder?.product?.original_price,
                                },
                                {
                                    title: "Discount",
                                    value: thisOrder?.products?.quantity * (thisOrder?.product?.original_price - thisOrder?.product?.sale_price),
                                }, {
                                    title: "Sub total",
                                    value: thisOrder?.products?.quantity * thisOrder?.product?.sale_price,
                                }]}

                                    total={thisOrder?.total ?? 0}></Summary>




                                <WhiteBox >

                                    <div className="row justify-content-end">
                                        <div className="d-flex" style={{ gap: "10px" }}>
                                            {
                                                thisOrder?.payment_type == const_data.PAYMENT_METHOD.COD ? (
                                                    <Button1 element_type="button" onClick={payInvoice} title="Pay Now" ></Button1>
                                                ) : (<Button1 element_type="button" onClick={() => { }} title="Invoice Paid" ></Button1>)
                                            }

                                            <Button1 element_type="button" onClick={downloadInvoice} title="Download Invoice" ></Button1>
                                        </div>
                                    </div>
                                </WhiteBox>

                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </UserLayout>
    )
}

export default InvoiceView
