import React, { Fragment, useEffect, useState } from 'react'
import MessurementSelector from '../Other/MessurementSelector'
import CanvasCartItem from '../Other/CanvasCartItem'
import SampleImage from '../../assets/images/product/big-1.jpg'
import Button1 from '../Util/Buttons/Button1'
import ButtonWithoutBg from '../Util/Buttons/ButtonWithoutBg'
import { const_data } from '../../CONST/const_data'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartDetails, removeFromCart } from '../../redux/slice/CartItems'
import EmptyScreen from '../Util/Box/EmptyScreen'

function CartUserOverCanvas() {

    let cartData = useSelector((state) => state.userCart);
    let dispatch = useDispatch();


    return (
        <Fragment>

            <div className="bs-canvas bs-canvas-left position-fixed bg-cart h-100">
                <div className="bs-canvas-header side-cart-header p-3 ">
                    <div className="d-inline-block  main-cart-title">My Cart <span>({cartData?.cart?.length} Items)</span></div>
                    <button type="button" className="bs-canvas-close close" aria-label="Close"><i className="uil uil-multiply"></i></button>
                </div>
                <div className="bs-canvas-body">
                    <div className="side-cart-items h-100">

                        {
                            (cartData?.cart?.length < 1 || !cartData?.cart?.length) ? (
                                <EmptyScreen bgColor={"white"} content={"Explore our wide selection and find something you like"} title={"Your cart is empty!"}></EmptyScreen>
                            ) : (
                                cartData?.cart?.map((item, index) => {

                                    return (<CanvasCartItem
                                        onDelete={async () => {
                                            dispatch(await removeFromCart({ cart_id: item._id, product_id: item.product_id }));
                                            // dispatch(await fetchCartDetails());
                                        }}

                                        key={index}
                                        variation={item.variation}
                                        cart_id={item._id}
                                        product={item.productDetails}
                                        currentQuanity={item.quantity}
                                    />)
                                }))
                        }
                    </div>
                </div>
                <div className="bs-canvas-footer">
                    <div className="cart-total-dil saving-total ">
                        <h4>Total Saving</h4>
                        <span>{const_data.CURRENCY_ICON}{cartData?.priceData?.discount ?? 0}</span>
                    </div>
                    <div className="main-total-cart">
                        <h2>Sub Total</h2>
                        <span>{const_data.CURRENCY_ICON}{cartData?.priceData?.subTotal ?? 0}</span>
                    </div>
                    <div className="checkout-cart">
                        <ButtonWithoutBg type="a" url="#" title="Apply Promo Code" onClick={() => { }}></ButtonWithoutBg>
                        <Button1 element_type="a" type="button" url="/cart" title="View Cart" onClick={() => { }} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CartUserOverCanvas
