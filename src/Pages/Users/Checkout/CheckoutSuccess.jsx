import React from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import Breadcrumb from '../../../Component/Util/ElementRelated/Breadcrumb'
import { useSelector } from 'react-redux'
import Button1 from '../../../Component/Util/Buttons/Button1'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner'
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas'
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser'

function CheckoutSuccess() {

    let userState = useSelector((state) => state.userAuth.user)
    let { invoice_id } = useParams();

    return (
        <div>
            <LoadingSpinner></LoadingSpinner>

            <CartUserOverCanvas />
            <CategoryModalUser></CategoryModalUser>
            <UserLayout>
                <Breadcrumb pageName={"Order success"} ></Breadcrumb>
                <div className="container">
                    <div className='cartEmpty' style={{ backgroundColor: "white", border: "1px solid green" }}>
                        <img width={"200px"} src="assets/images/other/checkout_success.png" alt="" />
                        <h2>Thank you for you order!</h2>
                        <p>Thank you {userState?.name ?? ""}! Thank you for purchasing from our store, Your Invoice ID: {invoice_id}</p>
                        <div style={{ gap: "10px", display: "flex" }}>
                            <Button1 element_type="a" type="button" url="/" title="Download Invoice" ></Button1>
                            <Button1 element_type="a" type="button" url="/my_orders" title="View Orders" ></Button1>
                        </div>

                    </div>
                </div>
            </UserLayout>
        </div>
    )
}

export default CheckoutSuccess
