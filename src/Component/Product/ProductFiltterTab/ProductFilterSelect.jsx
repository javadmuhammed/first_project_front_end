import React from 'react'
import { useDispatch } from 'react-redux';
import { productSearchAction } from '../../../redux/slice/ProductSearching';
import { const_data } from '../../../CONST/const_data';

function ProductFilterSelect({ title, options, state_filed }) {

    let dispatch = useDispatch();
    let onSelect = (e) => {
        let value = e.target.value;

        switch (state_filed) {
            case const_data.PRODUCT_SEARCHING.PRICE_RANGE:
                dispatch(productSearchAction.setPriceRange({ price_range: value }))
                break;
        }

    }




    return (
        <div class="filter-items">
            <div class="filtr-cate-title">
                <h4>{title}</h4>
            </div>

            <div class="other-item-body scrollstyle_4">
                <div class="brand-list">

                    <select class="ui search dropdown w-100" onChange={onSelect}>
                        <option>Select Price Range</option>
                        {
                            options?.map((each) => {
                                return (
                                    <option value={each}>{each}</option>
                                )
                            })
                        }
                    </select>

                </div>
            </div>
        </div>
    )
}

export default ProductFilterSelect