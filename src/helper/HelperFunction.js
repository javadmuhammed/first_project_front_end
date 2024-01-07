import { toast } from "react-toastify";
import { addToWishlist, deleteCartItem, getCartItems } from "../API/api_request";
import { const_data } from "../CONST/const_data";
import instance from "../axios/instance";
import CartStack from "../ds/cartStack";



export async function addToCart(product_id, user_id, quanity) {
    let addCartObject = {
        quantity: quanity,
        userid: user_id,
        product_id
    }

    try {
        let cartStack = new CartStack();
        cartStack.push(product_id, quanity)
        console.log("Cart inserted success on local")
    } catch (e) {
        console.log("Cart insertion failed on local")
    }

    return await instance.post(const_data.API_ENDPOINT.add_to_cart, addCartObject)
}


export async function removeCartItem(cart_id, product_id, onCartUpdate) {

    try {
        let cartStack = new CartStack();
        cartStack.removeItem(product_id)
    } catch (e) {

    }

    deleteCartItem(cart_id).then((removed) => {
        toast.success("Cart item deleted", const_data.DEFAULT_ALERT_DATA);
        onCartUpdate();
    }).catch((err) => {
        toast.error("Something went wrong", const_data.DEFAULT_ALERT_DATA);
    })
}

export async function getCartItemsMerg() {
    return new Promise((resolve, reject) => {
        let cartStack = new CartStack();
        let localCartData = cartStack.getAll()

        getCartItems().then((cartData) => {
            console.log(cartData)
            let cartStatus = cartData?.status;
            if (cartStatus) {
                let cartItems = cartStatus.cart;
                let mergeCartItems = [...localCartData, ...cartItems];
                console.log(mergeCartItems)
            }
        }).catch((err) => {
            console.log(err)
        })
    })
}

export function findDiscountPercentage(original_price, sales_price) {
    const discountPercentage = ((original_price - sales_price) / original_price) * 100;
    return Math.ceil(discountPercentage)
}

export function isStockAvailable(stock_count) {
    if (stock_count <= 0) {
        return false;
    } else if (stock_count <= const_data.MIN_STOCK) {
        return "Limited Stock"
    } else {
        return true;
    }
}

export async function addToWishListHelper(product_id) {
    try {
        let data = await addToWishlist(product_id)
        let response = data?.data;
        if (response?.status) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }

}

export function getValidDateFormat(date) {

    let valid_date;

    try {
        valid_date = new Date(date);
    } catch (err) {
        valid_date = new Date();
    }

    return (valid_date.getFullYear()) + "-" + (valid_date.getMonth() + 1) + "-" + valid_date.getDate()
}