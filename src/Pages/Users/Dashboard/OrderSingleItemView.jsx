import React, { useEffect, useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import OrderedSingleItem from '../../../Component/OrdersRelated/OrderedSingleItem'
import OrderdDetailView from '../../../Component/OrdersRelated/OrderdDetailView'
import FullBox from '../../../Component/Util/Box/FullBox'
import OrderTracking from '../../../Component/OrdersRelated/OrderTracking'
import WhiteBox from '../../../Component/Util/Box/WhiteBox'
import Button1 from '../../../Component/Util/Buttons/Button1'
import { useNavigate, useParams } from 'react-router-dom'
import { cancelOrderEndPoint, downloadInvoiceEndPoint, getSingleOrder, productReturnRequest } from '../../../API/api_request'
import { const_data } from '../../../CONST/const_data'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function OrderSingleItemView({ productData }) {

    let { order_id } = useParams();
    let [thisOrder, setThisOrder] = useState(null);
    // let [thisProduct, setThisPro]
    let [currentOrderStatus, setCurrentOrderStatus] = useState("");
    let [shippingHistory, setShippingHistory] = useState(new Set());
    let navigate = useNavigate();

    useEffect(() => {
        console.log(shippingHistory)
    }, [shippingHistory])


    useEffect(() => {
        getSingleOrder(order_id).then((order) => {
            let response = order?.data;
            if (response?.status) {
                let order = response?.order;
                if (order) {
                    console.log(response, order)
                    // alert("fsdf")
                    setThisOrder(response?.order)
                    setCurrentOrderStatus(response?.order?.status);
                    setShippingHistory(response?.order?.shipping_history)
                } else {
                    navigate("/my_orders")
                }
            } else {
                navigate("/my_orders")
            }
        }).catch((err) => {
            navigate("/my_orders")
        })
    }, [currentOrderStatus])

    function cancelOrder() {



        confirmAlert({
            title: "Cancel order",
            message: "Are you sure want to cancel this order?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        cancelOrderEndPoint(order_id).then((data) => {
                            let response = data?.data;
                            if (response?.status) {
                                toast.success("Order cancel success")
                                setCurrentOrderStatus(const_data.ORDER_STATUS.CANCELED)
                                // setShippingHistory([...shippingHistory, const_data.ORDER_STATUS.CANCELED])
                            } else {
                                toast.error(response.msg)
                            }
                        }).catch((err) => {
                            toast.error("Something went wrong")
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return;
                    }
                }
            ]
        })

    }

    function returnRequest() {
        productReturnRequest(order_id).then((data) => {
            let response = data?.data;
            if (response?.status) {
                toast.success("Product return request submitted")
                setCurrentOrderStatus(const_data.ORDER_STATUS.RETURNED_REQUEST)
                // setShippingHistory([...shippingHistory, const_data.ORDER_STATUS.RETURNED_REQUEST])
            } else {
                toast.error(response?.msg)
            }
        }).catch((err) => { })
    }


    function downloadInvoice() {

        downloadInvoiceEndPoint(thisOrder?._id).then((downloadUrl) => {
            console.log(downloadUrl.data)
            let data = downloadUrl.data;
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            let objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = 'product_invoice.pdf';
            a.click();
        }).catch((err) => {
            console.log(err)
        })

    }
    console.log(thisOrder)

    return (
        <div>

            <DashBoardLayout currentPage={"Product"}>
                <OrderedSingleItem productImage={const_data.public_image_url + "/" + thisOrder?.products?.product?.images[0]} productData={{ id: thisOrder?.products?.product?._id, name: thisOrder?.products?.product?.name, status: thisOrder?.status, quanity: thisOrder?.products?.product?.quantity, tooltip: "You just orderd " + thisOrder?.products?.quantity + " items" }} deliveryTime={thisOrder?.delivery_time} ></OrderedSingleItem>
                <OrderdDetailView deliveryCharge={"Free"} discount={thisOrder?.products?.discount} total={(thisOrder?.products?.total)} subTotal={(thisOrder?.products?.sub_total)}></OrderdDetailView>
                <div className="col-md-12">
                    {
                        thisOrder == null ? null : (
                            <FullBox footer={
                                <div>
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-md-6">
                                             
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex justify-content-end">
                                                <Button1 element_type="button" onClick={() => { downloadInvoice() }} title="Download Invoice" ></Button1>
                                                {
                                                    currentOrderStatus == const_data.ORDER_STATUS.ORDER_RECEIVED ? <Button1 element_type="button" onClick={() => { cancelOrder() }} title="Cancel Order" ></Button1> : null
                                                }

                                                {
                                                    currentOrderStatus == const_data.ORDER_STATUS.DELIVERED ? <Button1 element_type="button" onClick={() => { returnRequest() }} title="Return Product" ></Button1> : null
                                                }


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            } title={<h4>Track Order</h4>}>
                                <OrderTracking shippingHistory={shippingHistory} currentStatus={currentOrderStatus} />
                                <p>Cashback  will be credit to Gambo Super Market wallet 6-12 hours of delivery.</p>

                                {/* <h4>Don't worry your product will reach to you very soon </h4> */}
                            </FullBox>
                        )
                    }


                    {/* <button onClick={btnCLick}>Refresh</button> */}

                </div>

            </DashBoardLayout>
        </div>
    )
}

export default OrderSingleItemView
