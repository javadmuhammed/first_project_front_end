import React, { useEffect, useState } from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import Breadcrumb from '../../../Component/Util/ElementRelated/Breadcrumb'
import { getAllCategoryEndPoint, getCategoryMinimize, getTopCategoryProduct } from '../../../API/api_request';
import CategoryHomeItem from '../../../Component/CategoryRelated/CategoryHomeItem';
import SectionComponent from '../../../Component/Section/SectionComponent';
import Promo from '../../../Component/Promo/Promo';
import PromoImage1 from '../../../assets/images/best-offers/offer-1.jpg'
import PromoImage2 from '../../../assets/images/best-offers/offer-2.jpg'
import PromoImage3 from '../../../assets/images/best-offers/offer-3.jpg'
import PromoImage4 from '../../../assets/images/best-offers/offer-4.jpg'
import ProductItem from '../../../Component/Product/ProductItem';
import { const_data } from '../../../CONST/const_data';


function ViewAllCategory() {

    let [categoryListFirstRow, setCategoryListFirstRow] = useState([]);
    let [categoryListSecondRow, setCategoryListSecondRow] = useState([]);
    let [topCategoryProduct, setTopCategoryProduct] = useState([]);



    useEffect(() => {
        getAllCategoryEndPoint().then((data) => {
            let response = data?.data;
            if (response?.status) {
                let category = response?.categorys;
                // setCategoryList(response?.categorys)
                setCategoryListFirstRow(category?.slice(0, 12))
                setCategoryListSecondRow(category?.slice(12))
            }
        }).catch((err) => { })


        getTopCategoryProduct(0, 4).then((data) => {
            let response = data?.data;
            if (response?.status) {
                let category_product = response?.products
                setTopCategoryProduct(category_product)
            }
        }).catch((err) => {

        })
    }, [])


    return (
        <UserLayout>
            <Breadcrumb pageName={"Category list"}></Breadcrumb>

            <div className="container mt-3">
                <SectionComponent subhead="" mainhead="Top categorys">
                    <div className="row mt-1">
                        {
                            categoryListFirstRow?.map((eachCategory) => {
                                return (
                                    <div className="col-md-2 mb-5">
                                        <CategoryHomeItem name={""} image={eachCategory?.image} title={eachCategory?.name}></CategoryHomeItem>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="mt-2">
                        <SectionComponent subhead="Offers" mainhead="Best Values">
                            <div className="row">
                                <div className="col-md-4">
                                    <Promo promoImage={PromoImage1}></Promo>
                                </div>
                                <div className="col-md-4">
                                    <Promo promoImage={PromoImage2}></Promo>
                                </div>
                                <div className="col-md-4">
                                    <Promo promoImage={PromoImage3}></Promo>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    <Promo promoImage={PromoImage4}></Promo>
                                </div>
                            </div>
                        </SectionComponent>
                    </div>

                    <div className="row mt-1">
                        {
                            categoryListSecondRow?.map((eachCategory) => {
                                return (
                                    <div className="col-md-2 mb-5">
                                        <CategoryHomeItem name={""} image={eachCategory?.image} title={eachCategory?.name}></CategoryHomeItem>
                                    </div>
                                )
                            })
                        }
                    </div>


                    {
                        topCategoryProduct?.map((eachCategorySection) => {
                            return (
                                eachCategorySection?.products?.length <= 0 ? null : (
                                    <SectionComponent subhead="Top product's of" mainhead={eachCategorySection?.category_name}>
                                        <div className="row">
                                            {
                                                eachCategorySection?.products?.map((eachProduct) => {
                                                    return (
                                                        <div className="col-md-3">
                                                            <ProductItem currentQuantity={1} key={eachProduct._id} product_image={const_data.public_image_url + "/" + eachProduct.images[0]} stock={eachProduct.stock} _id={eachProduct._id} title={eachProduct.name} sale_price={eachProduct.sale_price} original_price={eachProduct.original_price} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </SectionComponent>

                                )
                            )
                        })
                    }




                </SectionComponent>
            </div>


        </UserLayout >
    )
}

export default ViewAllCategory
