import React, { Fragment, useState, useEffect } from 'react'
import SliderComponent from '../Slider/SliderComponent'
import BannerItem from './BannerItem'
import { getBanners } from '../../API/api_request';
import { const_data } from '../../CONST/const_data';

function HomeBanner() {

    let [banners, setBanners] = useState([]);


    useEffect(() => {
        getBanners().then((data) => {
            let response = data?.data;
            if (response?.status) {
                let banners = response?.banners;
                setBanners(banners)
            }
        }).catch((err) => { })
    }, []);


    return (
        <Fragment>

            <div className="bannerSlider mt-3">
                <SliderComponent settings={{
                    dots: false,
                    infinite: true,
                    speed: 1000,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true
                }} >

                    {
                        banners?.map((each) => <BannerItem image={const_data.public_image_url + "/" + each?.images} url={each?.url}></BannerItem>)
                    }



                </SliderComponent>
            </div>
        </Fragment>
    )
}

export default HomeBanner
