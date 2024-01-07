import React from 'react'

function Promo({ promoImage }) {
    return (
        <div className='promoContent'>
            <img width={'100%'} src={promoImage} alt="" />
        </div>
    )
}

export default Promo
