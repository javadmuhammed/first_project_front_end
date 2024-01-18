import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productSearchAction } from '../../../redux/slice/ProductSearching'
import { const_data } from '../../../CONST/const_data';

function ProductFiltterSearch({ title, options, state_filed }) {
    const [optionList, setOptionList] = useState([]);
    const [tempOptionList, setTempOptionList] = useState([]);
    let productSearchData = useSelector((state) => state.productSearching);
    let [selectedItem, setSelectedItems] = useState(productSearchData?.category ?? []);
     let dispatch = useDispatch();


    function onItemSelect(e) {
        let value = e.target.value;
        if (selectedItem.includes(value)) {
            setSelectedItems(selectedItem.filter((item) => item !== value))
        } else {
            setSelectedItems([...selectedItem, value])
        }
    }

    useEffect(() => { 
        switch (state_filed) {
            case const_data.PRODUCT_SEARCHING.CATEGORY: 
                dispatch(productSearchAction.setCategory({ category: selectedItem }))
                break
            case const_data.PRODUCT_SEARCHING.PRICE_BETWEEN:
                dispatch(productSearchAction.setPriceBetween({ price_between: selectedItem }))
                break;
            case const_data.PRODUCT_SEARCHING.STOCK_FILTER:
                dispatch(productSearchAction.setStockFilter({ stock_filter: selectedItem }))
                break; 
        }
    }, [selectedItem])

    useEffect(() => {
        setOptionList(options);
        setTempOptionList(options);
    }, [options]);

    function onSearchOptions(e) {
        const value = e.target.value;
        let newSearch = tempOptionList.filter((each) => each.name.toLowerCase().includes(value.toLowerCase()));
        console.log(newSearch)
        setOptionList(newSearch);
    }

    return (
        <div className="filter-items">
            <div className="filtr-cate-title">
                <h4>{title}</h4>
            </div>
            <div className="search-by-catgory mt-3">
                <div className="ui search">
                    <div className="ui left icon input swdh10">
                        <input
                            className="prompt srch10"
                            onChange={onSearchOptions}
                            type="text"
                            placeholder={`Search by ${title}..`}
                        />
                        <i className="uil uil-search-alt icon icon1"></i>
                    </div>
                </div>
            </div>
            <div className="other-item-body scrollstyle_4">
                <div className="brand-list">
                    {

                        optionList.map((each, index) => (
                            <div className="custom-control custom-checkbox pb2">
                                <input
                                    onChange={onItemSelect}
                                    type="checkbox"
                                    value={each?.value}
                                    className="custom-control-input"
                                    id={index + state_filed}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor={index + state_filed}
                                >
                                    {each?.name}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductFiltterSearch;
