import React from 'react'

function SingleProductImage({ src }) {
    return (
        <div className='singleImageView'>
            <img src={src} alt="" />
        </div>
    )
}

export default SingleProductImage
