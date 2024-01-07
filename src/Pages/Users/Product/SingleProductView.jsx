import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCategoryProduct, getSingleProduct } from '../../../API/api_request';
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

function SingleProductView() {

    let { product_id } = useParams();
    let [thisProduct, setThisProduct] = useState({});
    let [categoryProduct, setCategoryProduct] = useState([]);


    useEffect(() => {

        getSingleProduct(product_id).then((response) => {
            console.log(response)
            let data = response?.data;
            if (data?.status) {
                let product = data?.product;
                setThisProduct(product)
                console.log(product)


                getCategoryProduct(product?.category).then((categoryProduct) => {
                    let responseData = categoryProduct?.data;
                    console.log(responseData)
                    if (responseData?.status) {
                        let categoryProduct = responseData?.products;
                        setCategoryProduct(categoryProduct)
                    }
                }).catch((err) => {

                })

            }
        }).catch((e) => { })
    }, [])



    return (
        <UserLayout>
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
                                            <div className="item">
                                                <SingleProductImage src={"http://localhost:7000/images/web_images/web_images_lemon.webp"} />
                                            </div>
                                            <div className="item">
                                                <SingleProductImage src={"http://localhost:7000/images/web_images/web_images_lemon.webp"} />
                                            </div>
                                            <div className="item">
                                                <SingleProductImage src={"http://localhost:7000/images/web_images/web_images_lemon.webp"} />
                                            </div>
                                        </SliderComponent>
                                    </div>
                                    <div class="col-lg-8 col-md-8">
                                        <div class="product-dt-right">
                                            <h2>{thisProduct?.name}</h2>
                                            <div class="no-stock">
                                                <p class="pd-no">Product ID.<span>{thisProduct?._id}</span></p>
                                                <p class="stock-qty">Available<span>{
                                                    !isStockAvailable(thisProduct?.stock) ? "Out of stock" : typeof (isStockAvailable(thisProduct?.stock)) != 'boolean' ? isStockAvailable(thisProduct?.stock) : "Product in Stock"
                                                }</span></p>
                                            </div>
                                            <ProductVariation></ProductVariation>
                                            {/* <div class="product-radio">
                                                <ul class="product-now">
                                                    <li>
                                                        <input type="radio" id="p1" name="product1" />
                                                        <label for="p1">500g</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="p2" name="product1" />
                                                        <label for="p2">1kg</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="p3" name="product1" />
                                                        <label for="p3">2kg</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="p4" name="product1" />
                                                        <label for="p4">3kg</label>
                                                    </li>
                                                </ul>
                                            </div> */}
                                            {/* <p class="pp-descp">
                                                {
                                                    thisProduct?.description
                                                }
                                            </p> */}
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
                                                    <li>
                                                        <ProductQuanityManager currentValue={1} product_id={thisProduct._id}></ProductQuanityManager>
                                                    </li>
                                                    <li>
                                                        <OrderNowButton></OrderNowButton>
                                                    </li>
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
        </UserLayout >
    )
}

export default SingleProductView
