import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { buySingleProductAPI, getCategoryProduct, getSingleProduct, getUserAddress } from '../../../API/api_request';
import Breadcrumb from '../../../Component/Util/ElementRelated/Breadcrumb';
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout';
import SliderComponent from '../../../Component/Slider/SliderComponent';
import SingleProductImage from './SingleProductImage';
import { findDiscountPercentage, isStockAvailable } from '../../../helper/HelperFunction';
import ProductVariation from '../../../Component/Cart/ProductVariation';
import { const_data } from '../../../CONST/const_data';
import ProductQuanityManager from '../../../Component/Other/ProductQuanityManager';
import OrderNowButton from '../../../Component/Other/OrderNowButton';
import WishListButton from '../../../Component/Other/WishListButton';
import CardBox from '../../../Component/Util/Box/CardBox';
import SideProduct from '../../../Component/Products/SideProduct';
import ListBox from '../../../Component/Util/ElementRelated/ListBox';
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner';
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas';
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutAction } from '../../../redux/slice/CartCheckout';
import SelectAddressOverlay from '../../../Component/OverLay/SelectAddress';
import VariationManager from '../../../Component/Product/VariationManager';
import AddressManageModel from '../../../Component/OverLay/AddressManageModel';

function SingleProductView() {

    let { product_id } = useParams();
    let [thisProduct, setThisProduct] = useState({});
    let [tempProduct, setTempProduct] = useState({});
    let [categoryProduct, setCategoryProduct] = useState([]);
    let [isLoading, setLoading] = useState(true);
    let navigate = useNavigate();
    let [allAddress, setAllAddress] = useState([])
    let [selectedAddress, setSelectedAddress] = useState(null)
    let isLogged = useSelector((state) => state.userAuth.isLogged)
    let [selectedVariation, setSelectedVariation] = useState(const_data.PRODUCT_VARIATION['1kg'])
    let dispatch = useDispatch();
    let userData = useSelector((state) => state.userAuth.user)

    useEffect(() => {

        if (thisProduct['_id'] != null && thisProduct['_id'] != "") {

            if (selectedVariation == const_data.PRODUCT_VARIATION['500gm']) {
                let product = JSON.parse(JSON.stringify(tempProduct))
                product.sale_price = product.sale_price / 2;
                product.original_price = product.original_price / 2;
                setThisProduct(product)
            } else if (selectedVariation == const_data.PRODUCT_VARIATION['250gm']) {
                let product = JSON.parse(JSON.stringify(tempProduct))
                product.sale_price = product.sale_price / 4;
                product.original_price = product.original_price / 4;
                setThisProduct(product)
            } else if (selectedVariation == const_data.PRODUCT_VARIATION['2kg']) {
                let product = JSON.parse(JSON.stringify(tempProduct))
                product.sale_price = product.sale_price * 2;
                product.original_price = product.original_price * 2;
                setThisProduct(product)
            } else {
                let product = JSON.parse(JSON.stringify(tempProduct))
                product.sale_price = product.sale_price;
                product.original_price = product.original_price
                setThisProduct(product)
            }
        }
    }, [selectedVariation])

    function buySingleProduct() {

        try {

            let phoneNumber = userData?.mobile


            if (selectedAddress == "" || selectedAddress == null) {
                toast.error("Please select valid address");
            } else {


                buySingleProductAPI(phoneNumber, selectedAddress, product_id, selectedVariation, 1).then((data) => {
                    let response = data?.data;
                    if (response?.status) {

                        let invoiceNumber = response?.invoice_number;
                        if (invoiceNumber != null) {
                            dispatch(checkoutAction.setInitData({ phoneNumber: phoneNumber, invoice_id: invoiceNumber }))
                            navigate("/checkout");
                        } else {
                            toast.error(dataResult.msg ?? "Something went wrong", const_data.DEFAULT_ALERT_DATA);
                        }
                    } else {
                        toast.error(dataResult.msg, const_data.DEFAULT_ALERT_DATA);
                    }
                }).catch((err) => { })
            }
        } catch (e) {
            console.log(e)
        }
    }





    async function fetchAddress() {

        try {
            let addressResponse = await getUserAddress()
            const responseData = addressResponse?.data;

            if (responseData && responseData?.status) {
                const addressList = responseData.address;
                setAllAddress(addressList)
            }
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {

        if (selectedAddress != "" && selectedAddress != null) {
            buySingleProduct()
        }
    }, [selectedAddress])

    useEffect(() => {
        if (isLogged) {
            fetchAddress();
        }
    }, [isLogged])


    useEffect(() => {


        getSingleProduct(product_id).then((response) => {
            console.log(response)
            let data = response?.data;
            if (data?.status) {
                let product = data?.product;
                if (product) {
                    setThisProduct(product)
                    setTempProduct(product)
                    console.log(product)
                    setLoading(false)

                    getCategoryProduct(product?.category).then((categoryProduct) => {
                        let responseData = categoryProduct?.data;
                        console.log(responseData)
                        if (responseData?.status) {
                            let categoryProduct = responseData?.products;
                            setCategoryProduct(categoryProduct)

                        }
                    }).catch((err) => {

                    })

                } else {
                    navigate("/404")
                }
            } else {
                navigate("/404")
            }
        }).catch((e) => {
            navigate("/404")
        })


    }, [])



    return (

        <UserLayout>
            {
                isLoading ? <LoadingSpinner isShow={true}></LoadingSpinner> : (


                    <Fragment>
                        <AddressManageModel state={setAllAddress}></AddressManageModel>
                        <SelectAddressOverlay confirmButton={true} allAddress={allAddress} state={setSelectedAddress}></SelectAddressOverlay>
                        <CartUserOverCanvas />
                        <CategoryModalUser></CategoryModalUser>
                        <Breadcrumb pageName={`Product View / ${thisProduct?.name}`}></Breadcrumb>

                        <div class="all-product-grid">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="product-dt-view">
                                            <div class="row">
                                                <div class="col-lg-4 col-md-4">
                                                    <SliderComponent settings={{
                                                        className: "singleProductSliderMain",
                                                        speed: 2000,
                                                        slidesToShow: 1,
                                                        slidesToScroll: 1,
                                                        infinite: false
                                                    }}>
                                                        {
                                                            thisProduct?.images?.map((image) => {
                                                                return (
                                                                    <div className="item">
                                                                        <SingleProductImage src={const_data.public_image_url +"/"+ image} />
                                                                    </div>
                                                                )
                                                            })
                                                        }
 
                                                    </SliderComponent>
                                                </div>
                                                <div class="col-lg-8 col-md-8">
                                                    <div class="product-dt-right">
                                                        <h2>{thisProduct?.name}</h2>
                                                        <div class="no-stock">
                                                            <p class="stock-qty">Available<span>{
                                                                !isStockAvailable(thisProduct?.stock) ? "Out of stock" : typeof (isStockAvailable(thisProduct?.stock)) != 'boolean' ? isStockAvailable(thisProduct?.stock) : "Product in Stock"
                                                            }</span></p>
                                                            <p class="stock-qty">Category<span>{
                                                                thisProduct?.category?.name ?? ""
                                                            }</span></p>
                                                        </div>
                                                        <VariationManager product_id={thisProduct?._id} setSelectedVariation={setSelectedVariation} selected_variation={selectedVariation}></VariationManager>

                                                        <div class="product-group-dt">
                                                            <ul>
                                                                <li><div class="main-price color-discount">Discount Price<span>{
                                                                    const_data.CURRENCY_ICON + thisProduct.sale_price
                                                                }</span></div></li>
                                                                <li><div class="main-price mrp-price">MRP Price<span>{const_data.CURRENCY_ICON + thisProduct.original_price}</span></div></li>
                                                            </ul>
                                                            <ListBox property={[{
                                                                icon: "pricetag-alt",
                                                                title: `Avail the special category offer of ${thisProduct?.category?.offer}%`
                                                            },
                                                            {
                                                                icon: "pricetag-alt",
                                                                title: `Avail the product  offer of ${thisProduct?.original_price - thisProduct?.sale_price + const_data.CURRENCY_ICON}`
                                                            },
                                                            {
                                                                icon: "pricetag-alt",
                                                                title: `Cashback and coupen code for selected users`
                                                            }]}>

                                                            </ListBox>
                                                            <ul class="gty-wish-share">
                                                                {
                                                                    !isStockAvailable(thisProduct?.stock) ? (
                                                                        <li>
                                                                            <div className='text-center w-100'> <p>Not available<span>(Out of stock)</span></p> </div>
                                                                        </li>
                                                                    ) : (
                                                                        <>
                                                                            <li>
                                                                                <ProductQuanityManager currentValue={1} product_id={thisProduct._id}></ProductQuanityManager>
                                                                            </li>
                                                                            <li>
                                                                                <OrderNowButton ></OrderNowButton>
                                                                            </li>
                                                                        </>
                                                                    )
                                                                }

                                                                <li>
                                                                    <WishListButton product_id={thisProduct?._id}></WishListButton>
                                                                </li>
                                                            </ul>

                                                        </div>
                                                        <div class="pdp-details">
                                                            <ul>
                                                                <li>
                                                                    <CardBox icon={<i class="uil uil-usd-circle"></i>} title={"Lowest Price Guaranteed"} paragraph={"Get difference refunded if you find it cheaper anywhere else"} ></CardBox>
                                                                </li>
                                                                <li>
                                                                    <CardBox icon={<i class="uil uil-cloud-redo"></i>} title={"Easy Returns & Refunds"} paragraph={"Return products at doorstep and get refund in seconds."} ></CardBox>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4 col-md-12">
                                        <div class="pdpt-bg">
                                            <div class="pdpt-title">
                                                <h4>More Like This</h4>
                                            </div>
                                            <div class="pdpt-body scrollstyle_4">
                                                {
                                                    categoryProduct?.map((eachItem) => {
                                                        let offer = findDiscountPercentage(eachItem?.original_price, eachItem?.sale_price)
                                                        return (
                                                            <SideProduct product_id={eachItem._id} offer={offer} onAddtoCart={() => {

                                                            }} onDelete={() => { }} originalPrice={eachItem?.original_price} productImage={const_data.public_image_url + "/" + eachItem?.images[0]} sale_price={eachItem?.sale_price} title={eachItem?.name} ></SideProduct>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                        <div class="pdpt-bg">
                                            <div class="pdpt-title">
                                                <h4>Product Details</h4>
                                            </div>
                                            <div class="pdpt-body scrollstyle_4">
                                                <div class="pdct-dts-1">
                                                    <div class="pdct-dt-step">
                                                        <h4>Description</h4>
                                                        <p>{thisProduct.description}</p>
                                                    </div>
                                                    <div class="pdct-dt-step">
                                                        <h4>Key Features</h4>
                                                        <div class="product_attr">
                                                            <ul>
                                                                {
                                                                    thisProduct?.key_features?.map((eachItem) => {
                                                                        return (
                                                                            <li>{eachItem}</li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="pdct-dt-step">
                                                        <h4>Specification</h4>
                                                        <div class="product_attr">
                                                            <ul>
                                                                {
                                                                    thisProduct?.specifications?.map((eachItem) => {
                                                                        return (
                                                                            <li>{eachItem}</li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>                                            </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </UserLayout>
    )
}

export default SingleProductView
