import React, { Fragment, useEffect, useState } from 'react'
import CartUserOverCanvas from '../../Component/OverLay/CartUserOverCanvas'
import CategoryModalUser from '../../Component/OverLay/CategoryModalUser'
import UserLayout from '../../Component/UserPartials/UserLayout/UserLayout'
import HomeBanner from '../../Component/Banner/HomeBanner'
import SectionComponent from '../../Component/Section/SectionComponent'
import SliderComponent from '../../Component/Slider/SliderComponent'
import CategoryHomeItem from '../../Component/CategoryRelated/CategoryHomeItem'
import ProductSection from '../../Component/Product/ProductSection'
import Promo from '../../Component/Promo/Promo'
import PromoImage1 from '../../assets/images/best-offers/offer-1.jpg'
import PromoImage2 from '../../assets/images/best-offers/offer-2.jpg'
import PromoImage3 from '../../assets/images/best-offers/offer-3.jpg'
import PromoImage4 from '../../assets/images/best-offers/offer-4.jpg'
import { const_data } from '../../CONST/const_data'
import { getAllCategoryEndPoint } from '../../API/api_request'
import LoadingSpinner from '../../Component/Util/ElementRelated/LoadingSpinner'
import ButtonWithoutBg from '../../Component/Util/Buttons/ButtonWithoutBg'




function UserHome() {


    let [categoryModalItems, categoryModalItemUpdate] = useState([])


    useEffect(() => {
        getAllCategoryEndPoint().then((response) => {
            console.log(response)
            let response_data = response?.data;

            if (response_data?.status) {
                categoryModalItemUpdate(response_data.categorys)
            }
        }).catch((err) => { })
    }, [])



    return (
        <Fragment>

            <LoadingSpinner></LoadingSpinner>

            <CartUserOverCanvas />
            <CategoryModalUser></CategoryModalUser>
            <UserLayout>
                <HomeBanner></HomeBanner>
                <div className="container mt-5">


                    <SectionComponent right={<ButtonWithoutBg type="a" url="/category_list" title="View more" ></ButtonWithoutBg>} subhead="Shop By" mainhead="Categories">
                        <SliderComponent settings={{
                            className: "categorySlider",
                            speed: 2000,
                            slidesToShow: 6,
                            slidesToScroll: 1,
                            infinite: false
                        }}>

                            {
                                categoryModalItems.map(function (categoryItem) {
                                    return (
                                        <CategoryHomeItem id={categoryItem._id} name={categoryItem.name} image={categoryItem.image} title={categoryItem.name}></CategoryHomeItem>
                                    )
                                })

                            }


                        </SliderComponent>
                    </SectionComponent>


                    <div className='mt-5'>
                        {
                            Object.values(const_data.PRODUCT_OPTION).map((productSections) => {
                                return (
                                    <ProductSection key={productSections} product_endpoint={productSections} subhead={"For you " + productSections} mainhead={productSections} settings={{
                                        className: "Product " + productSections,
                                        speed: 2000,
                                        slidesToShow: 4,
                                        slidesToScroll: 1,
                                        infinite: false
                                    }} />
                                )
                            })
                        }

                    </div>

                    <div className="mt-5">
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



                </div>
            </UserLayout >
        </Fragment >
    )
}

export default UserHome
