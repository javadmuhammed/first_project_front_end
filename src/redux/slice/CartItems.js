import React, { useState } from 'react'
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: instance } = require("../../axios/instance");
const { const_data } = require("../../CONST/const_data");
import { toast } from 'react-toastify'

export let fetchCartDetails = createAsyncThunk("cart/get_data", async (payload) => {

    try {
        let addToCart = await instance.get(const_data.API_ENDPOINT.get_cart_items)
      
        return addToCart;
    } catch (e) {
        return null;
    }
})

export let changeQuantity = createAsyncThunk("cart/change_quantity", async (payload) => {

    let { cart_id, quantity, product_id } = payload;
    console.log(payload)

    try {
        let updateQuantity = await instance.patch(const_data.API_ENDPOINT.cart_quanity_update, {
            cart_id, quantity, product_id
        });
        console.log(updateQuantity);
        return updateQuantity;
    } catch (e) {
        return null;
    }
})


export let removeFromCart = createAsyncThunk("cart/remove_cart", async (payload) => {
    try {
        let cart_id = payload.cart_id
        let product_id = payload.product_id

        let removeCart = await instance.delete(const_data.API_ENDPOINT.remove_cart_item + "/" + cart_id + "/" + product_id);
        return removeCart
    } catch (e) {
        return null;
    }
})

export let addToCartThunk = createAsyncThunk("cart/add_item", async (payload, { dispacth }) => {

    const { product_id, user_id, variation } = payload;


    try {
        let addCartObject = {
            userid: user_id,
            variation: variation,
            product_id
        }
        let addToCart = await instance.post(const_data.API_ENDPOINT.add_to_cart, addCartObject)
        return addToCart;
    } catch (e) {
        return null;
    }

})

let CartSlicer = createSlice({
    name: "cart",
    initialState: {
        cart_update: true,
        numberOfItems: 0,
        cart: null,
        priceData: {
            "subTotal": 0,
            "total": 0,
            "discount": 0
        }
    },
    reducers: {
        addItems: (state, action) => {
            let cart_id = action.payload.cart_id;
            let quantity = action.payload.quantity;
            let product_id = action.payload.product_id;

            state.numberOfItems++;
            state.cart.push({
                product_id: product_id,
                quantity: quantity
            })
        },
        removeItem: (state, action) => {
            state.numberOfItems--
            let newCart = state.cart.filter((productItem) => productItem.product_id);
        },
        clearCart: (state, action) => {
            state.numberOfItems = 0;
            state.cart = null;
            state.priceData = {
                "subTotal": 0,
                "total": 0,
                "discount": 0
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCartThunk.fulfilled, (state, action) => {
            let data = action.payload;
            if (data?.data?.status) {
                toast.success(data?.data?.msg, const_data.DEFAULT_ALERT_DATA);
                state.cart_update = !state.cart_update;
            } else {
                toast.warning(data?.data?.msg);
            }
        }).addCase(fetchCartDetails.fulfilled, (state, action) => {
            let data = action?.payload?.data; 
             
            if (data?.status) {
                state.numberOfItems = data?.cart?.cartData?.length ?? 0;
                state.cart = data?.cart?.cartData
                state.priceData = data?.cart?.priceList
            }
        }).addCase(removeFromCart.fulfilled, (state, action) => {
            let data = action?.payload?.data;
            if (data?.status) {
                state.cart_update = !state.cart_update;
                toast.success("Cart item delete success")
            } else {
                toast.success("Something went wrong")
            }
        }).addCase(changeQuantity.fulfilled, (state, action) => {
            let data = action?.payload?.data;
            state.cart_update = !state.cart_update;
        })
    }
})




export let cartItemActions = CartSlicer.actions;
export default CartSlicer.reducer;