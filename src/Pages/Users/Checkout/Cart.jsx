import React, { useEffect, useState } from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import Breadcrumb from '../../../Component/Util/ElementRelated/Breadcrumb'
import CartItem from '../../../Component/Cart/CartItem'
import Summary from '../../../Component/Util/Checkout/Summary'
import Button1 from '../../../Component/Util/Buttons/Button1'
import instance from '../../../axios/instance'
import { createInvoice, getCartItems, getUserAddress } from '../../../API/api_request'
import { const_data } from '../../../CONST/const_data'
import CartEmpty from '../../../Component/Cart/CartEmpty'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutAction } from '../../../redux/slice/CartCheckout'
import SelectAddress from '../../../Component/Cart/CheckoutSteps/SelectAddress'
import SelectAddressOverlay from '../../../Component/OverLay/SelectAddress'
import SelectAddressBar from '../../../Component/Other/SelectAddressBar'
import AddressManageModel from '../../../Component/OverLay/AddressManageModel'
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas'
import { getCartItemsMerg } from '../../../helper/HelperFunction'
import ListBox from '../../../Component/Util/ElementRelated/ListBox'

function Cart() {


    //let [cartItems, setCartItems] = useState([]);
    //let [priceList, setPriceList] = useState({});



    let [checkout, setCheckout] = useState(false)
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let cartData = useSelector((state) => state.userCart);

    let [selectedAddress, setSelectedAddress] = useState(null);
    let [allAddress, selectAllAddress] = useState([]);
    let [currentAddress, setCurrentAddress] = useState(null);

    let userData = useSelector((state) => state.userAuth.user)


    useEffect(() => {
 
        if (allAddress?.length == 1) { 
            let findPrimary = allAddress[0] 
            if (findPrimary) { 
                setCurrentAddress(findPrimary)
                setSelectedAddress(findPrimary?._id)
            }  
        }
    }, [allAddress])




    function updateSelectedAddress(newAddress) {
        setSelectedAddress(newAddress)

        const selectedAddressFind = allAddress.find((address) => address._id == newAddress);

        if (selectedAddressFind) {
            setCurrentAddress(selectedAddressFind);
            console.log(selectedAddressFind)
        }
    }



    // useEffect(() => {
    //     let findPrimary = allAddress?.find((fp) => fp.is_primary == true);
    //     if (findPrimary) {
    //         console.log(findPrimary)
    //         setCurrentAddress(findPrimary)
    //     } else {
    //         console.log(allAddress)
    //     }

    // }, [allAddress])

    useEffect(() => {



        getUserAddress()
            .then((data) => {

                const responseData = data.data;

                if (responseData && responseData?.status) {
                    const addressList = responseData.address;
                    const findPrimary = addressList?.find((items) => items.is_primary);

                    if (findPrimary) {
                        setCurrentAddress(findPrimary);
                        setSelectedAddress(findPrimary._id)
                        selectAllAddress(addressList)
                    }
                }
            })
            .catch((err) => {
            });
    }, [checkout]);





    function createInvoiceAction() {


        let phoneNumber = userData?.mobile


        if (selectedAddress == null || selectedAddress == "") {
            toast.error("Please select valid address");
            return;
        } else {
            if (phoneNumber) {

                createInvoice(phoneNumber, selectedAddress).then((data) => {
                    let dataResult = data?.data;
                    console.log(dataResult)




                    if (dataResult?.status) {
                        let invoiceNumber = dataResult?.invoice_number;
                        if (invoiceNumber) {
                            dispatch(checkoutAction.setInitData({ phoneNumber: phoneNumber, invoice_id: invoiceNumber }))
                            navigate("/checkout");
                        } else {
                            toast.error(dataResult.msg ?? "Something went wrong", const_data.DEFAULT_ALERT_DATA);
                        }
                    } else {
                        toast.error(dataResult.msg, const_data.DEFAULT_ALERT_DATA);
                    }
                }).catch((err) => {
                    toast.error("Something went wrong", const_data.DEFAULT_ALERT_DATA);
                })

            } else {
                navigate("/login")
            }
        }

    }


    function onCartUpdate() {
        setCheckout(!checkout)
    }

    return (
        <UserLayout>
            <SelectAddressOverlay allAddress={allAddress} state={updateSelectedAddress}></SelectAddressOverlay>
            <Breadcrumb pageName="Cart Items"></Breadcrumb>
            <AddressManageModel state={selectAllAddress} ></AddressManageModel>
            <CartUserOverCanvas></CartUserOverCanvas>
            <div className="container">

                {

                    (
                        cartData?.cart?.length <= 0 || !cartData?.cart?.length) ? (
                        <CartEmpty bgColor={"white"} />
                    ) : (
                        <div className="row mt-5">

                            <div className="col-md-8">
                                <div class="bg-white mb-3">
                                    <SelectAddressBar address={currentAddress}></SelectAddressBar>
                                </div>
                                {
                                    cartData?.cart?.map((cartProduct) => {
                                        return (
                                            <CartItem stock={cartProduct?.productDetails?.stock} selected_variation={cartProduct.variation} cart_id={cartProduct._id} onCartUpdate={onCartUpdate} original_price={cartProduct?.productDetails?.original_price} sale_price={cartProduct?.productDetails?.sale_price} productImage={const_data.public_image_url + "/" + cartProduct?.productDetails?.images[0]} productQuanity={cartProduct?.quantity} productTitle={cartProduct?.productDetails?.name} product_id={cartProduct?.productDetails?._id}></CartItem>
                                        )
                                    })
                                }

                            </div>
                            <div className="col-md-4">
                                <Summary title={"Cart Summary"} list={[{
                                    title: "Total",
                                    value: cartData?.priceData?.total ?? 0,
                                },
                                {
                                    title: "Discount",
                                    value: cartData?.priceData?.discount ?? 0,
                                }, {
                                    title: "Sub total",
                                    value: cartData?.priceData?.subTotal ?? 0,
                                }]}

                                    total={cartData?.priceData?.subTotal ?? 0}></Summary>

                                <div className='mt-3'>
                                    <Button1 isFullWidth={true} onClick={createInvoiceAction} element_type="button" type="button" url="/checkout" title="Proceed to checkout">

                                    </Button1>
                                    {/* <div class="checkout-safety-alerts">
                                        <p><i class="uil uil-sync"></i>100% Replacement Guarantee</p>
                                        <p><i class="uil uil-check-square"></i>100% Genuine Products</p>
                                        <p><i class="uil uil-shield-check"></i>Secure Payments</p>
                                    </div> */}

                                    <ListBox property={[{
                                        title: "100% Replacement Guarantee",
                                        icon: "sync"
                                    },
                                    {
                                        title: "100% Genuine Products",
                                        icon: "check-square"
                                    }, {
                                        title: "Secure Payments",
                                        icon: "shield-check"
                                    }]}>

                                    </ListBox>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </UserLayout>
    )
}

export default Cart
