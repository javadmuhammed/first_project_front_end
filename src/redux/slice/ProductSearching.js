import { createSlice } from "@reduxjs/toolkit";

let productSearchSlicer = createSlice({
    name: "productSearching",
    initialState: {
        category: [],
        discount: [0,100],
        price_range: null,
        stock_filter: [],
        price_between: []
    },
    reducers: {
        setCategory: (state, action) => {
            let category = action.payload.category;
            state.category = category;
        },
        setDiscount: (state, action) => {
            let discount = action.payload.discount;
            state.discount = discount;
        },
        setPriceRange: (state, action) => {
            let price_range = action.payload.price_range;
            state.price_range = price_range
        },
        setStockFilter: (state, action) => {
            let stock_filter = action.payload.stock_filter; 
            console.log(stock_filter)
            state.stock_filter = stock_filter
        },
        setPriceBetween: (state, action) => {
            let price_between = action.payload.price_between;
            state.price_between = price_between
        }
    }
})

export let productSearchAction = productSearchSlicer.actions;
export default productSearchSlicer.reducer;