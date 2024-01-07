import React from 'react'
import Banner from '../../assets/images/offers/img-1.jpg'
import { Link } from 'react-router-dom'

function BannerItem({ image, url }) {
    return (
        <div class="item">
            <div class="offer-item">
                <div class="offer-item-img">
                    <div class="gambo-overlay"></div>
                    <img src={image} alt="" />
                </div>
                <div class="offer-text-dt">
                    <Link to={url} class="Offer-shop-btn hover-btn">View More</Link>
                </div>
            </div>
        </div>
    )
}

export default BannerItem
