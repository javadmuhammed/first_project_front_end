import React from 'react'

function AddtoCartBtn({ onClick }) {
    return (
        <button onClick={onClick} class="add-cart-btn hover-btn"><i class="uil uil-shopping-cart-alt"></i>Add to Cart</button>
    )
}

export default AddtoCartBtn
