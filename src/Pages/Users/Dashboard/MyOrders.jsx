import React, { useEffect, useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import OrderedSingleItem from '../../../Component/OrdersRelated/OrderedSingleItem'
import { GetUserOrdersMethod, getUserOrderPagination } from '../../../API/api_request';
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas';
import { const_data } from '../../../CONST/const_data';
import PaginationComponent from '../../../Component/Util/Pagination/PaginationComponent';
import EmptyScreen from '../../../Component/Util/Box/EmptyScreen';

function MyOrders() {

    let [orders, ordersUpdate] = useState([]);
    let [totalOrders, setTotalOrders] = useState([])
    let [currentPage, setCurrentPage] = useState(1)
    let [orderPerPage, setOrderPerPage] = useState(5)

    useEffect(() => {
        getUserOrderPagination(currentPage, orderPerPage).then((orders) => {
            let responseData = orders.data;
            console.log(responseData)
            if (responseData?.status) {

                console.log(responseData)
                let orders_list = responseData.orders?.orders;
                let totalOrders = responseData.orders?.total_order;
                ordersUpdate(orders_list)
                setTotalOrders(totalOrders)
                console.log(orders_list)

            }
        }).catch((err) => {
            console.log(err)
        })
    }, [currentPage, orderPerPage])


    return (
        <DashBoardLayout currentPage="My Orders">
            <CartUserOverCanvas></CartUserOverCanvas>
            <div className="row">

                {
                    totalOrders > 0 ? <PaginationComponent totalOrders={totalOrders} currentPage={currentPage} pageState={setCurrentPage} pagePerPost={orderPerPage} >

                        {
                            orders?.map((orders) => {
                                console.log(orders)
                                let productData = orders?.product ?? const_data.UNAVAILABLE_PRODUCT
                                return (
                                    <OrderedSingleItem productImage={const_data.public_image_url + "/" + productData.images[0]} productData={{ id: orders._id, name: productData.name, status: orders?.status, quanity: orders.products.quantity, tooltip: "You just orderd " + orders.products.quantity + " items" }} deliveryTime={orders.delivery_time} ></OrderedSingleItem>
                                )
                            })
                        }
                    </PaginationComponent> : <EmptyScreen bgColor={"white"} title={"Your orders is empty"} content={"There's no orders in your accout! explore now"}></EmptyScreen>
                }

            </div>
        </DashBoardLayout >
    )
}

export default MyOrders
