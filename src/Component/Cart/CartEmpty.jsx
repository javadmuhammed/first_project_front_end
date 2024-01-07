import React from 'react'

function CartEmpty({ bgColor }) {
    return (
        <div className='cartEmpty' style={{ backgroundColor: bgColor }}>
            <img width={"200px"} src="assets/images/other/empty-cart.png" alt="" srcset="" />
            <h2>Your cart is empty!</h2>
            <p>Explore our wide selection and find something you like</p>
        </div>
    )
}

export default CartEmpty
