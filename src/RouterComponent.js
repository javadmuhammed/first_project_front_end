import React from 'react'
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom'
import UserHome from './Pages/Users/UserHome'
import UserLoggin from './Pages/Users/Auth/UserLoggin'
import UserSignup from './Pages/Users/Auth/UserSignup'
import PasswordReset from './Pages/Users/Auth/PasswordReset'
import NewPasswordSet from './Pages/Users/Auth/NewPasswordSet'
import Dashboard from './Pages/Users/Dashboard/Dashboard'
import MyOrders from './Pages/Users/Dashboard/MyOrders'
import ManageWallet from './Pages/Users/Dashboard/ManageWallet'
import Wishlist from './Pages/Users/Dashboard/Wishlist'
import ManageAddress from './Pages/Users/Dashboard/ManageAddress'
import OrderSingleItemView from './Pages/Users/Dashboard/OrderSingleItemView'
import ProfileUpdate from './Pages/Users/Dashboard/ProfileUpdate'
import Cart from './Pages/Users/Checkout/Cart'
import Checkout from './Pages/Users/Checkout/Checkout'
import CheckoutSuccess from './Pages/Users/Checkout/CheckoutSuccess'
import Error404 from './Pages/Users/Other/Error404'
import CoupenList from './Pages/Users/Static/CoupenList'
import InvoiceView from './Pages/Users/Static/InvoiceView'
import SingleProductView from './Pages/Users/Product/SingleProductView'
import EmailTokenVerify from './Pages/Users/Dashboard/EmailTokenVerify'
import ProductSearching from './Pages/Users/Product/ProductSearching'
import ViewAllCategory from './Pages/Users/Category/ViewAllCategory'
import ProtectedRouter from './Component/UserPartials/UserLayout/ProtectedRouter'
import RestrictedRouter from './Component/UserPartials/UserLayout/RestrictedRouter'

function RouterComponent() {

    return (
        <Routers>
            <Routes>

                <Route path="/404" element={<Error404 />}> </Route>

                <Route path="/" element={<UserHome />}> </Route>

                <Route path="/login" element={<RestrictedRouter component=<UserLoggin></UserLoggin> />}> </Route>
                <Route path="/sign_up/:referal_code?" element={<RestrictedRouter component=<UserSignup/> />}> </Route>
                <Route path="/forget_password" element={<RestrictedRouter component=<PasswordReset/> />}> </Route>
                <Route path="/reset_password/:token" element={<RestrictedRouter component=<NewPasswordSet/> />}> </Route>
                <Route path="/reset_email_address/:token" element={<RestrictedRouter component=<EmailTokenVerify/> />}> </Route>


                <Route path="/dashboard" element={<ProtectedRouter loggedComponent={<Dashboard />} />}> </Route>
                <Route path="/my_orders" element={<ProtectedRouter loggedComponent=<MyOrders/> />}> </Route>
                <Route path="/manage_wallet" element={<ProtectedRouter loggedComponent=<ManageWallet/>  />}> </Route>
                <Route path="/wishlist" element={<ProtectedRouter loggedComponent=<Wishlist/>  />}> </Route>
                <Route path="/address" element={<ProtectedRouter loggedComponent=<ManageAddress/>  />}> </Route>
                <Route path="/order_single_item/:order_id" element={<ProtectedRouter loggedComponent=<OrderSingleItemView/>  />}> </Route>
                <Route path="/profile_update" element={<ProtectedRouter loggedComponent=<ProfileUpdate/>  />}> </Route>

                <Route path="/product_view/:product_id" element={<SingleProductView />}> </Route>
                <Route path="/product_searching" element={<ProductSearching />}> </Route>

                <Route path="/cart" element={<ProtectedRouter loggedComponent=<Cart/>  />}> </Route>
                <Route path="/checkout" element={<ProtectedRouter loggedComponent=<Checkout/>  />}> </Route>
                <Route path="/order_success/:invoice_id" element={<ProtectedRouter loggedComponent=<CheckoutSuccess/>  />}> </Route>
                <Route path="/invoice_view/:order_id" element={<InvoiceView />}> </Route>

                <Route path="/coupen_list" element={<CoupenList />}> </Route>


                <Route path="/category_list" element={<ViewAllCategory />}> </Route>
                <Route path="*" element={<Error404 />} status={404}> </Route>


            </Routes>
        </Routers>
    )
}






export default RouterComponent
