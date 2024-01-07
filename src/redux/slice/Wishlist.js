import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToWishlist } from "../../API/api_request";
import instance from "../../axios/instance";
import { const_data } from "../../CONST/const_data";


export let addToWishListThunk = createAsyncThunk("user/add_wishlist", async (payload, { dispatch }) => {
    try {
        let product_id = payload.product_id;
        let wishlist = await instance.post(const_data.API_ENDPOINT.add_wishlist, { product_id })
        return wishlist;
    } catch (e) {
        return null;
    }
})

export let removeFromWishlistThunk = createAsyncThunk("user/remove_wishlist", async (payload, { dispatch }) => {
    try {
        let product_id = payload.product_id;
        let wishlist = await instance.delete(const_data.API_ENDPOINT.delete_wishlist + "/" + product_id)
        console.log(wishlist)
        return wishlist;
    } catch (e) {
        return null;
    }
})


export let fetchUserWishlist = createAsyncThunk("user/fetch_wishlist", async (payload, { dispatch }) => {
    try {
        let wishlist = await instance.get(const_data.API_ENDPOINT.get_wishlist)
        console.log(wishlist)
        return wishlist;
    } catch (e) {
        return null;
    }
})


export let WishlistSlicer = createSlice({
    name: "wishlist",
    initialState: {
        wishlist_items: []
    },
    extraReducers: (builder) => {
        builder.addCase(addToWishListThunk.fulfilled, (state, action) => {

            let payload = action.payload;
            let response = payload?.data;
            console.log(response)
            let product_id = response?.product_id;
            if (response?.status) {
                state.wishlist_items = [...state.wishlist_items, product_id];
            }

        }).addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
            let payload = action.payload;
            let response = payload?.data;
            let product_id = response?.product_id;
            if (response?.status) {
                let isInclude = state.wishlist_items.includes(product_id);
                console.log(product_id)
                if (isInclude) {
                    let filtter = state.wishlist_items.filter((each) => each != product_id);
                    state.wishlist_items = filtter;
                }
            }
        }).addCase(fetchUserWishlist.fulfilled, (state, action) => {
            let payload = action.payload;
            let response = payload?.data;
            console.log(response)
            if (response?.status) {
                let wishlist = response?.wishlist;
                let wish_products = wishlist.map(item => item.product_id._id);
                state.wishlist_items = wish_products;
                console.log(wish_products)
            }
        })
    }
})



export let wishlistAction = WishlistSlicer.actions;

export default WishlistSlicer.reducer