import { createSlice } from "@reduxjs/toolkit";


let CartCheckoutSlicer = createSlice({
    name: "cart_checkout",
    initialState: {
        phoneNumber: null,
        invoice_id: null,
    },
    reducers: {
        setInitData: (state, action) => {
            state.phoneNumber = action.payload.phoneNumber;
            state.invoice_id = action.payload.invoice_id; 
        }
    }
})



export let checkoutAction = CartCheckoutSlicer.actions;
export default CartCheckoutSlicer.reducer;