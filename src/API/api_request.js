
import instance from "../axios/instance.js";
import { const_data } from "../CONST/const_data.js";

export async function userSignUpRequest(data) {
    return await instance.post(const_data.API_ENDPOINT.signup_user, data)
}


export async function userOtpValidationForSignup(data) {
    return await instance.post(const_data.API_ENDPOINT.verify_user_otp, data)
}


export async function userLoginRequest(user) {
    return await instance.post(const_data.API_ENDPOINT.loggin_user, user)
}

export async function wishlistToCart(variation,product_id) {
    return await instance.post(const_data.API_ENDPOINT.loggin_user, { 
        variation: variation,
        product_id
    })
}

export async function getUserByJwt(jwt) {
    return await instance.get(const_data.API_ENDPOINT.wishlist_to_cart, {

    })
}

export async function passwordResetRequest(email) {
    return await instance.post(const_data.API_ENDPOINT.password_rest, email)
}

export async function UpdatePassword(token, password) {
    return await instance.post(const_data.API_ENDPOINT.password_update, { token, password })
}

export async function BasicProfileUpdate(userData) {
    return await instance.put(const_data.API_ENDPOINT.profile_update, userData)
}

export async function updatePhoneNumberRequest(phone_number) {
    return await instance.post(const_data.API_ENDPOINT.update_phone_number,
        {
            phone_number
        })
}

export async function updatePhoneNumberConfirmation(otp_number) {
    return await instance.post(const_data.API_ENDPOINT.phone_number_update_otp, {
        otp_number
    })
}

export async function updateEmailAddressEndPoint(email_address) {
    return await instance.post(const_data.API_ENDPOINT.update_email_address, {
        email_address
    })
}

export async function updateEmailTokenEndPoint(token) {
    return await instance.get(const_data.API_ENDPOINT.update_email_token + "/" + token);
}

export async function getSingleOrderByNumber(order_number) {
    return await instance.get(const_data.API_ENDPOINT.get_order_by_number + "/" + order_number);
}

export async function downloadInvoiceEndPoint(order_id) {
    return await instance.post(const_data.API_ENDPOINT.download_invoice, { invoice_id: order_id }, {
        responseType: "blob"
    })
}

export async function updateOrderInvoice(order_id, invoice_id, invoice_data, order_data) {
    return await instance.post(const_data.API_ENDPOINT.update_order_invoice, {
        order_id, invoice_id, invoice_data, order_data
    });
}


export async function GetUserOrdersMethod() {
    return await instance.get(const_data.API_ENDPOINT.get_orders);
}

export async function getUserOrderPagination(page, limit) {
    return await instance.get(const_data.API_ENDPOINT.get_orders_pagination + "/" + page + "/" + limit);
}

export async function getSingleOrder(order_id) {
    return await instance.get(const_data.API_ENDPOINT.get_single_order + "/" + order_id);
}

export async function getUserWalletHistory() {
    return await instance.get(const_data.API_ENDPOINT.get_user_wallet_history)
}

export async function getUserWishList() {
    return await instance.get(const_data.API_ENDPOINT.get_wishlist)
}

export async function userPasswordUpdater(password, current_password) {
    return await instance.put(const_data.API_ENDPOINT.user_password_update, { password, current_password })
}





export async function profilePictureUpdate(profile) {
    return await instance.put(const_data.API_ENDPOINT.profile_pic_update, profile, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}


export async function updateAddress(address, address_id) {
    return await instance.put(const_data.API_ENDPOINT.edit_addresses, {
        address, address_id
    })
}


export async function addNewAddress(address) {
    return await instance.post(const_data.API_ENDPOINT.add_new_address, address)
}

export async function getUserAddress() {
    return await instance.get(const_data.API_ENDPOINT.get_user_address)
}

export async function get_single_address(address_id) {
    return await instance.get(const_data.API_ENDPOINT.get_single_address + "/" + address_id)
}


export async function deleteAddress(address_id) {
    return await instance.delete(const_data.API_ENDPOINT.delete_address + "/" + address_id)
}

export async function AddressAsPrimaryApi(address_id) {
    return await instance.put(const_data.API_ENDPOINT.set_address_primary, { address_id })
}

export async function resendCheckoutVerificationOtp(phoneNumber, invoice_id) {
    return await instance.patch(const_data.API_ENDPOINT.resend_checkout_otp, { phone: phoneNumber, invoice_id })
}

export async function applyCoupenCode(coupen_code, invoice_id) {
    return await instance.post(const_data.API_ENDPOINT.apply_coupen + "/" + coupen_code + "/" + invoice_id)
}

export async function getBanners() {
    return await instance.get(const_data.API_ENDPOINT.get_banners)
}


export async function getCartItems() {
    return await instance.get(const_data.API_ENDPOINT.get_cart_items);
}

export async function cartQuantityUpdate(cart_id, quantity, product_id) {
    return await instance.patch(const_data.API_ENDPOINT.cart_quanity_update, {
        cart_id, quantity, product_id
    });
}

export async function deleteCartItem(cart_id) {
    return await instance.delete(const_data.API_ENDPOINT.remove_cart_item + "/" + cart_id);
}

export async function cartVariationUpdate(cart_id, product_id, variation) {
    return await instance.patch(const_data.API_ENDPOINT.cart_variation_update, {
        cart_id, product_id, variation
    });
}

export async function getSingleProduct(product_id) {
    return await instance.get(const_data.API_ENDPOINT.get_single_product + "/" + product_id);
}

export async function getCategoryProduct(category) {
    return await instance.get(const_data.API_ENDPOINT.get_category_product + "/" + category)
}

export async function getAllProduct() {
    return await instance.get(const_data.API_ENDPOINT.get_all_product);
}



export async function createInvoice(phone, selectedAddress) {
    return await instance.post(const_data.API_ENDPOINT.create_invoice, { phone, selected_address: selectedAddress });
}

export async function invoicePhoneVerification(otpField, phone, invoiceId) {
    return await instance.patch(const_data.API_ENDPOINT.invoice_phone_verification, {
        otp: otpField,
        phone: phone,
        invoice_id: invoiceId
    });
}

export async function invoice_update(invoice_id, update_data) {
    return await instance.patch(const_data.API_ENDPOINT.invoice_update, { invoice_id, update_data });
}

export async function invoicePhoneNumberUpdate(number, invoice_id) {

    return await instance.post(const_data.API_ENDPOINT.update_invoice_phone, {
        phone_number: number,
        invoice_id
    });
}

export async function addAddressType(type) {
    return await instance.put(const_data.API_ENDPOINT.add_new_address_type, { address_type: type })
}

export async function productReturnRequest(order_id) {
    return await instance.post(const_data.API_ENDPOINT.product_return_request, { order_id })
}

export async function getSingleInvoice(invoice_id) {
    return await instance.get(const_data.API_ENDPOINT.get_single_invoice + "/" + invoice_id)
}

export async function cancelOrderEndPoint(order_id) {
    return await instance.patch(const_data.API_ENDPOINT.cancel_order, { order_id: order_id })
}

export async function razorpayeOrderCreate(invoice_id) {
    return await instance.post(const_data.API_ENDPOINT.razorpay_order, { invoice_id });
}

export async function verifyRazorpay({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    return await instance.post(const_data.API_ENDPOINT.verify_razorpay, { razorpay_order_id, razorpay_payment_id, razorpay_signature });
}

export async function getAllCategoryEndPoint() {
    return await instance.get(const_data.API_ENDPOINT.get_all_category);
}

export async function getAllBanner() {
    return await instance.get(const_data.API_ENDPOINT.get_banners);
}

export async function addToWishlist(product_id) {
    return await instance.post(const_data.API_ENDPOINT.add_wishlist, { product_id })
}

export async function deleteFromWishlist(wishlistId) {
    return await instance.delete(const_data.API_ENDPOINT.delete_wishlist, { wishlistId })
}

export async function getAllWishlist() {
    return await instance.get(const_data.API_ENDPOINT.get_banners);
}


export async function getCategoryMinimize(count, skip) {

    let params = (count ? count : 0) + "/" + (skip ? skip : 0)

    return await instance.get(const_data.API_ENDPOINT.get_category_minimize + "/" + urlParams);

}


export async function getTopCategoryProduct(category_limit, product_limit) {

    let params = (category_limit ? category_limit : 0) + "/" + (product_limit ? product_limit : 0)
    return await instance.get(const_data.API_ENDPOINT.get_top_category_product + "/" + params)
}

export async function createWalletOrder(amount, name, phone) {
    return await instance.post(const_data.API_ENDPOINT.create_wallet_order,
        {
            amount, name, phone
        })
}

export async function verifyWalletOrder(razorpay_payment_id, razorpay_order_id, razorpay_signature) {
    return await instance.post(const_data.API_ENDPOINT.verify_wallet_order,
        {
            razorpay_payment_id, razorpay_order_id, razorpay_signature
        })
}

