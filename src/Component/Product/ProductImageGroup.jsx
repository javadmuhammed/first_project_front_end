import React from 'react'
import { const_data } from '../../CONST/const_data'

function ProductImageGroup({ id, images = [] }) {
    return (
        <div id={id} class="owl-carousel owl-theme">
            {
                images?.map((eachImage) => {
                    return (
                        <div class="item">
                            <img src={`${const_data.public_image_url}/${eachImage}`} alt="" />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductImageGroup
