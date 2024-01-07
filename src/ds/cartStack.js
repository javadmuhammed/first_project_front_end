const { const_data } = require("../CONST/const_data");

class CartStack {

    constructor() {
        this.storage = localStorage;
    }

    push(product_id, quantity) {
        try {
            let allCartItems = JSON.parse(this.storage.getItem(const_data.LOCAL_STORAGE_CART)) ?? [];

            let existingCartItem = allCartItems.find((cartItem) => cartItem.product_id === product_id);

            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                allCartItems.push({ product_id, quantity });
            }

            this.storage.setItem(const_data.LOCAL_STORAGE_CART, JSON.stringify(allCartItems));
            return true;
        } catch (e) {
            console.log("Cart insertion error");
            return false;
        }
    }

    pop() {
        try {
            let allCartItems = JSON.parse(this.storage.getItem(const_data.LOCAL_STORAGE_CART)) ?? [];
            let newCart = allCartItems.pop();
            this.storage.setItem(const_data.LOCAL_STORAGE_CART, JSON.stringify(newCart))
            return true;
        } catch (e) {
            console.log("Cart pop error");
            return false;
        }
    }

    removeItem(product_id) {
        try {
            let allCartItems = JSON.parse(this.storage.getItem(const_data.LOCAL_STORAGE_CART)) ?? [];
            let newCart = allCartItems.filter((cartItems) => cartItems.product_id != product_id);
            this.storage.setItem(const_data.LOCAL_STORAGE_CART, JSON.stringify(newCart)) 
            return true;
        } catch (e) { 
            console.log("Cart pop error");
            return false;
        }
    }

    getAll() {
        try {
            let allCartItems = JSON.parse(this.storage.getItem(const_data.LOCAL_STORAGE_CART)) ?? [];
            return allCartItems;
        } catch (e) { 
            return false;
        }
    }

}

export default CartStack