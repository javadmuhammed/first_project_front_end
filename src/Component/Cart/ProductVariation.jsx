import React, { useEffect, useState } from 'react'
import { const_data, productVariationFindKey } from '../../CONST/const_data'
import { cartVariationUpdate } from '../../API/api_request';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchCartDetails } from '../../redux/slice/CartItems';

function ProductVariation({ product_id, cart_id, selected_variation = const_data.PRODUCT_VARIATION['1kg'], code }) {

    //selected_variation will be number

    let [selectedVariation, setSelectedVariation] = useState(selected_variation);
    let dispatch = useDispatch();


     

    async function updateCartVariation(variation) {

        let valueVariation = const_data.PRODUCT_VARIATION[variation];


        if (valueVariation) {

            try {

                let variationData = await cartVariationUpdate(cart_id, product_id, variation)
                let response = variationData.data;

                if (!response?.status) {
                    setSelectedVariation(variation)
                } else {
                    setSelectedVariation(valueVariation)
                    dispatch(await fetchCartDetails())
                }
            } catch (e) {
                setSelectedVariation(valueVariation)
            }

        } else {
            // alert("Hello world")
        }
    }



    return (
        <div class="cart-radio">

            <ul class="kggrm-now">
                {
                    Object.keys(const_data.PRODUCT_VARIATION).map((items, index) => {

                        let isChecked = const_data.PRODUCT_VARIATION[items] === selectedVariation;


                        return (
                            <li>

                                <input type="radio" checked={isChecked} id={"a1_crt_" + code + index + product_id + cart_id} name={"a1_crt_" + code + index + product_id + cart_id} onClick={() => {
                                    updateCartVariation(items)
                                }} />
                                <label for={"a1_crt_" + code + index + product_id + cart_id}>{items + " -  " + selectedVariation}</label>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ProductVariation
