import React, { useEffect, useState } from 'react'
import { const_data, productVariationFindKey } from '../../CONST/const_data'
import { cartVariationUpdate } from '../../API/api_request';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchCartDetails } from '../../redux/slice/CartItems';

function VariationManager({ product_id, selected_variation = const_data.PRODUCT_VARIATION['1kg'], setSelectedVariation }) {


    return (
        <div class="cart-radio"> 
       
        
            <ul class="kggrm-now">
                {
                    Object.keys(const_data.PRODUCT_VARIATION).map((items, index) => {


                        let isChecked = selected_variation == const_data.PRODUCT_VARIATION[items];

                        return (
                            <li> 
                                <input type="radio" checked={isChecked} id={"a1" + index } name={"cart1" + product_id} onClick={() => {
                                    setSelectedVariation(const_data.PRODUCT_VARIATION[items])
                                }} />
                                <label for={"a1" + index }>{items + " -  " + const_data.PRODUCT_VARIATION[items]}</label>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default VariationManager
