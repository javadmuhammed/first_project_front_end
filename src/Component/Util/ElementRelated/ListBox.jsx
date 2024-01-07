import React from 'react'

function ListBox({ property }) {
    return (
        <div class="checkout-safety-alerts">
            {
                property?.map((eachItem) => {
                    return (
                        <p><i class={`uil uil-${eachItem?.icon}`} ></i>{eachItem?.title}</p>
                    )
                })
            }
        </div>
    )
}

export default ListBox