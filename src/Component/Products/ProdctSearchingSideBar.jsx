import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import ProductFiltterSearch from '../Product/ProductFiltterTab/ProductFiltterSearch'
import {
    ReactiveBase,
    RangeSlider,
    SelectedFilters,
    ResultList,
    ReactiveList,
} from '@appbaseio/reactivesearch';
import ProductFilterSelect from '../Product/ProductFiltterTab/ProductFilterSelect';
import { getAllCategoryEndPoint } from '../../API/api_request';
import { useDispatch } from 'react-redux';
import { productSearchAction } from '../../redux/slice/ProductSearching';
import { const_data } from '../../CONST/const_data';
// import {getProdu} from '../../API/api_request';


function ProdctSearchingSideBar() {

    let [categoryList, setCategoryList] = useState([]);
    let discountPercentage = ['10', '15', '20', '25', '30', '35', '40', '45', '50', '70'];
    let [priceRange, setPriceRange] = useState([1, 150])
    let [discountRange, setDiscountRange] = useState([0, 100])
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(productSearchAction.setPriceBetween({ price_between: priceRange }))
     }, [priceRange])

     useEffect(() => {
        dispatch(productSearchAction.setDiscount({ discount: discountRange }))
     }, [discountRange])

    useEffect(() => {
        getAllCategoryEndPoint().then((data) => {
            let response = data?.data;
            if (response?.status) {
                let categoryList = response?.categorys;
                setCategoryList(categoryList)
            }
        }).catch((err) => {

        })
    }, [])


    return (
        <Fragment>
            <div class="side-cart-header p-3 w-100">
                <div class="d-inline-block  main-cart-title">Filters</div>
            </div>
            <div class="filter-body">

                <ProductFiltterSearch
                    state_filed="category"
                    title={"Category"}
                    options={
                        categoryList.map((item) => ({ value: item?._id, name: item?.name }))
                    }
                />


                {/* <ProductFiltterSearch
                    state_filed="discount"
                    title={"Discount"}
                    options={
                        discountPercentage?.map((item) => ({ value: item, name: (item + "%") }))
                    }
                /> */}

                <div>
                    <div className="filter-items">
                        <div class="filtr-cate-title mb-3">
                            <h4>Product Discount</h4>
                        </div>
                        <ReactiveBase
                            app="good-books-ds"
                            url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
                        >  <RangeSlider
                                dataField="ratings_count"
                                componentId="discountRange"
                                showHistogram={false}
                                range={{
                                    start: 0,
                                    end: 100,
                                }}
                                rangeLabels={{
                                    start: discountRange[0],
                                    end: discountRange[1],
                                }}
                                interval={1}
                                beforeValueChange={(value) => {
                                    setDiscountRange(value);
                                }}
                            />
                        </ReactiveBase>
                    </div>
                </div>

                <ProductFilterSelect state_filed="price_range" title={"Price Range"} options={Object.values(const_data.PRODUCT_SEARCHING_OPTION.PRICE_RANGE)}></ProductFilterSelect>
                <ProductFiltterSearch state_filed="stock_filter" title={"Stock"} options={[{ name: "In Stock" , value: const_data.PRODUCT_SEARCHING_OPTION.STOCK_FILTER.IN_STOCK }, { name: "Limited Stock", value: const_data.PRODUCT_SEARCHING_OPTION.STOCK_FILTER.OUT_OF_STOCK }]} ></ProductFiltterSearch>

                <div>
                    <div className="filter-items">
                        <div class="filtr-cate-title mb-3">
                            <h4>Price Between</h4>
                        </div>
                        <ReactiveBase
                            app="good-books-ds"
                            url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
                        >  <RangeSlider
                                dataField="ratings_count"
                                componentId="priceRanger"
                                showHistogram={false}
                                range={{
                                    start: 1,
                                    end: 150,
                                }}
                                rangeLabels={{
                                    start: priceRange[0],
                                    end: priceRange[1],
                                }}
                                interval={1}
                                beforeValueChange={(value) => {
                                    setPriceRange(value);
                                }}
                            />
                        </ReactiveBase>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default ProdctSearchingSideBar
