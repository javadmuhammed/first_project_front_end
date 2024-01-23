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

        return wishlist;
    } catch (e) {
        return null;
    }
})


export let wishlistSendToCartThunk = createAsyncThunk("user/send_to_cart", async (payload) => {
    try {
        let product_id = payload.product_id;
        let variation = payload.variation;

        let sentToCart = await instance.post(const_data.API_ENDPOINT.wishlist_to_cart, {
            variation,
            product_id
        })
        return sentToCart;
    } catch (e) {
        return null;
    }
})

export let fetchUserWishlist = createAsyncThunk("user/fetch_wishlist", async (payload, { dispatch }) => {
    try {
        let wishlist = await instance.get(const_data.API_ENDPOINT.get_wishlist)

        return wishlist;
    } catch (e) {
        return null;
    }
})


export let WishlistSlicer = createSlice({
    name: "wishlist",
    initialState: {
        wishlist_items: [],
        refresh_required: true,
    },
    reducers: {
        clearWishlist: (state, action) => {
            state.wishlist_items = [] 
        }
    },
    extraReducers: (builder) => {
        builder.addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
            let payload = action.payload;
            let response = payload?.data;
            let product_id = response?.product_id;
            if (response?.status) {
                let filtter = state.wishlist_items.filter(function (each) {
                    return each?.product_id?._id != product_id
                });

                state.wishlist_items = filtter;
            }
        }).addCase(fetchUserWishlist.fulfilled, (state, action) => {
            let payload = action.payload;
            let response = payload?.data;
            if (response?.status) {
                let wishlist = response?.wishlist;
                state.wishlist_items = wishlist;
                state.refresh_required = false;
            }
        }).addCase(addToWishListThunk.fulfilled, (state, action) => {
            state.refresh_required = true;
        }).addCase(wishlistSendToCartThunk.fulfilled, (state, action) => {
            let payload = action.payload;
            let response = payload?.data;
            if (response?.status) {
                let deleted_item = response?.product_id;


                let wish_products = state.wishlist_items.filter((each) => each.product_id._id != deleted_item);
                state.wishlist_items = wish_products;
            }
        })
    }
})



export let wishlistAction = WishlistSlicer.actions;

export default WishlistSlicer.reducer