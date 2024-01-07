import React, { useEffect, useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import OrderedSingleItem from '../../../Component/OrdersRelated/OrderedSingleItem'
import OrderdDetailView from '../../../Component/OrdersRelated/OrderdDetailView'
import FullBox from '../../../Component/Util/Box/FullBox'
import OrderTracking from '../../../Component/OrdersRelated/OrderTracking'
import WhiteBox from '../../../Component/Util/Box/WhiteBox'
import Button1 from '../../../Component/Util/Buttons/Button1'
import { useParams } from 'react-router-dom'
import { cancelOrderEndPoint, downloadInvoiceEndPoint, getSingleOrder, productReturnRequest } from '../../../API/api_request'
import { const_data } from '../../../CONST/const_data'
import { toast } from 'react-toastify'


function OrderSingleItemView({ productData }) {

    let { order_id } = useParams();
    let [thisOrder, setThisOrder] = useState({});
    let [currentOrderStatus, setCurrentOrderStatus] = useState("");
    let [shippingHistory, setShippingHistory] = useState(new Set());

    useEffect(()=>{
        console.log(shippingHistory)
    },[shippingHistory])


    useEffect(() => {
        getSingleOrder(order_id).then((order) => {
            let response = order?.data;
            if (response?.status) {
                setThisOrder(response?.order)
                setCurrentOrderStatus(response?.order?.status);
                setShippingHistory(response?.order?.shipping_history)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [currentOrderStatus])

    function cancelOrder() {

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

    function returnRequest() {
        productReturnRequest(order_id).then((data) => {
            let response = data?.data;
            if (response?.status) {
                toast.success("Product return request submitted")
                setCurrentOrderStatus(const_data.ORDER_STATUS.RETURNED_REQUEST)
                // setShippingHistory([...shippingHistory, const_data.ORDER_STATUS.RETURNED_REQUEST])
            } else {
                toast.success(response?.msg)
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
                <OrderedSingleItem productImage={const_data.public_image_url + "/" + thisOrder?.product?.images[0]} productData={{ id: thisOrder?.product?._id, name: thisOrder?.product?.name, status: thisOrder?.status, quanity: thisOrder?.products?.quantity, tooltip: "You just orderd " + thisOrder?.products?.quantity + " items" }} deliveryTime={thisOrder?.delivery_time} ></OrderedSingleItem>
                <OrderdDetailView deliveryCharge={"Free"} total={(thisOrder?.product?.original_price) * (thisOrder?.products?.quantity)} subTotal={(thisOrder?.product?.sale_price) * (thisOrder?.products?.quantity)}></OrderdDetailView>
                <div className="col-md-12">
                    <FullBox footer={
                        <div>
                            <div className="row justify-content-between align-items-center">
                                <div className="col-md-6">
                                    <div className="d-flex justify-content-start">
                                        <p className='mb-0'>Post Feedback</p>
                                    </div>
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


                    {/* <button onClick={btnCLick}>Refresh</button> */}

                </div>

            </DashBoardLayout>
        </div>
    )
}

export default OrderSingleItemView
