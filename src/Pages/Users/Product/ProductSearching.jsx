import React, { useEffect, useState } from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import Breadcrumb from '../../../Component/Util/ElementRelated/Breadcrumb'
import ProdctSearchingSideBar from '../../../Component/Products/ProdctSearchingSideBar'
import { getAllProduct } from '../../../API/api_request';
import ProductItem from '../../../Component/Product/ProductItem';
import { const_data } from '../../../CONST/const_data';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner';
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas';
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser';

function ProductSearching() {

    let [productList, setProductList] = useState([]);
    let [tempProductList, setTempProductList] = useState([]);

    let productSearchData = useSelector((state) => state.productSearching);

    let [queryInstance, setQueryInstance] = useSearchParams();
    let pname = queryInstance.get("pname");


    useEffect(() => {
        getAllProduct().then((data) => {
            let response = data?.data;
            if (response?.status) {
                let products = response?.products;
                setTempProductList(products)
            }
        }).catch((err) => { })
    }, [])

    useEffect(() => {

        console.log(productSearchData)
        let newProductList = tempProductList;



        if (productSearchData?.category?.length != 0) {
            let categoryList = productSearchData?.category ?? []
            newProductList = newProductList.filter((each) => categoryList.includes(each?.category?._id))
        }

        if (productSearchData?.discount?.length == 2) {
            let [discountFrom, discountTo] = productSearchData?.discount
            console.log(productSearchData?.discount)
            newProductList = newProductList.filter((each) => {
                {

                    let discountPercentage = ((each.original_price - each.sale_price) / each.original_price) * 100;
                    console.log(discountPercentage)
                    return discountPercentage >= discountFrom && discountPercentage <= discountTo
                }
            }
            )
        }

        if (productSearchData?.price_range) {
            let priceRange = productSearchData?.price_range;
            if (priceRange == const_data.PRODUCT_SEARCHING_OPTION.PRICE_RANGE.HIGH_TO_LOW) {
                newProductList = [...newProductList.sort((a, b) => b.sale_price - a.sale_price)]
            } else if (priceRange == const_data.PRODUCT_SEARCHING_OPTION.PRICE_RANGE.LOW_TO_HIGH) {
                newProductList = [...newProductList.sort((a, b) => a.sale_price - b.sale_price)]
            }
        }

        if (productSearchData?.stock_filter?.length != 0) {
            let stock_filter = productSearchData?.stock_filter ?? []
            console.log(stock_filter)
            if (stock_filter.includes(const_data.PRODUCT_SEARCHING_OPTION.STOCK_FILTER.IN_STOCK) && stock_filter.includes(const_data.PRODUCT_SEARCHING_OPTION.STOCK_FILTER.OUT_OF_STOCK)) {

            } else if (stock_filter.includes(const_data.PRODUCT_SEARCHING_OPTION.STOCK_FILTER.IN_STOCK)) {

                newProductList = [...newProductList.filter((each) => each?.stock >= 1)]
            } else {
                newProductList = [...newProductList.filter((each) => each?.stock <= const_data.MIN_STOCK)]
            }
        }



        if (productSearchData?.price_between?.length == 2) {
            let [price_from, price_to] = productSearchData?.price_between
            newProductList = newProductList.filter((each) => each.sale_price > price_from && each.sale_price < price_to)
        }

        if (pname != '' && pname != null) {
            newProductList = newProductList.filter((each) => each.name.toLowerCase().includes(pname.toLowerCase()));
        }


        setProductList(newProductList)

    }, [tempProductList, productSearchData])


    return (
        <div>
            <LoadingSpinner></LoadingSpinner>

            <CartUserOverCanvas />
            <CategoryModalUser></CategoryModalUser>
            <UserLayout>
                <Breadcrumb pageName={"Product Searching"}></Breadcrumb>
                <div className="container mt-5">
               
                    <div className="row">
                        <div className="col-md-3">
                       
                            <ProdctSearchingSideBar></ProdctSearchingSideBar>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                {
                                    productList?.map((item) => {
                                        return (
                                            <div className="col-md-4">
                                                <ProductItem _id={item?._id} original_price={item?.original_price} sale_price={item?.sale_price} product_image={const_data.public_image_url + "/" + item?.images[0]} stock={item?.stock} title={item?.name} key={item?._id} ></ProductItem>
                                            </div>
                                        )
                                    })

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
        </div>
    )
}

export default ProductSearching
