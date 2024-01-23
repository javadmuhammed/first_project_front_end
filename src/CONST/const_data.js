
export const const_data = {
    CURRENCY_ICON: "₹",
    CURRENCY_TYPE: "INR",
    // API_URL: "https://api.veguess.shop",
    API_URL: "http://localhost:7000",
    FRONT_END_DOMAIN: "https://veguess.shop",
    ADMIN_PATH: "/admin",
    // user_profile_path: "https://api.veguess.shop/images/userProfile",
    // public_image_url: "https://api.veguess.shop/images/web_images",
    user_profile_path: "http://localhost:7000/images/userProfile",
    public_image_url: "http://localhost:7000/images/web_images",
    API_ENDPOINT: {
        signup_user: "/sign_up",
        verify_user_otp: "/otp_validation",
        loggin_user: "/login",
        get_user_by_jwt: "/get_user_by_jwt",
        validate_jwt: "/validate_jwt",
        refresh_jwt: "/re_generate_token",
        password_rest: "/forget_password",
        password_update: "/new_password",
        profile_update: "/update_profile",
        update_phone_number: "/update_phone_number",
        phone_number_update_otp: "/phone_number_update_otp",
        update_email_token: "/update_email_token",
        update_email_address: "/update_email_address",
        get_orders: "/get_orders",
        get_orders_pagination: "/get_orders_pagination",
        get_order_by_number: "/get_order_by_number",
        get_single_order: "/get_single_order",
        get_user_wallet_history: "/user_wallet",
        get_wishlist: "/get_wishlist",
        add_wishlist: "/add_wishlist",
        wishlist_to_cart: "/wishlist_to_cart",
        delete_wishlist: "/delete_wishlist",
        user_password_update: "/update_password",
        profile_pic_update: "/update_profile_image",
        add_new_address: "/add_addresses",
        edit_addresses: "/edit_addresses",
        get_user_address: "/get_addresses",
        get_single_address: "/get_single_address",
        delete_address: "/delete_address",
        get_all_product: "/get_all_product",
        get_product_option: "/get_product_option",
        add_to_cart: "/add_to_cart",
        get_cart_items: "/get_cart_items",
        cart_quanity_update: "/cart_quanity_update",
        remove_cart_item: "/remove_cart_item",
        create_invoice: "/create_invoice",
        invoice_phone_verification: "/invoice_phone_verification",
        invoice_update: "/invoice_update",
        get_invoice_summary: "/get_invoice_summary",
        buy_single_product: "/buy_single_product",
        get_single_invoice: "/get_single_invoice",
        apply_coupen: "/apply_coupen",
        resend_checkout_otp: "/resend_checkout_otp",
        set_address_primary: "/set_address_primary",
        add_new_address_type: "/add_new_address_type",
        razorpay_order: "/razorpay_order",
        verify_razorpay: "/verify_razorpay",
        cancel_order: "/cancel_order",
        product_return_request: "/product_return_request",
        get_all_category: "/get_all_category",
        update_invoice_phone: "/update_invoice_phone",
        cart_variation_update: "/cart_variation_update",
        download_invoice: "/download_invoice",
        get_single_product: "/get_single_product",
        get_category_product: "/get_category_product",
        update_order_invoice: "/update_order_invoice",
        get_category_minimize: "/get_category_minimize",
        get_top_category_product: "/get_top_category_product",
        get_banners: "/get_banners",
        create_wallet_order: "/create_wallet_order",
        verify_wallet_order: "/verify_wallet_order",
        get_user_coupen_code: "/get_user_coupen_code"
    },
    PRODUCT_OPTION: {
        FRESH_VEGETABLES: 'FRESH VEGETABLES',
        FRESH_FRUITS: 'FRESH FRUITS',
        MEAL_KITS: 'MEAL KITS',
        ORGANIC_PRODUCTS: 'ORGANIC PRODUCTS',
        SALADS: 'SALADS',
        SMOOTHIES: 'SMOOTHIES',
        HEALTHY_SNACKS: 'HEALTHY SNACKS',
        READY_TO_COOK: 'READY-TO-COOK MEALS',
        JUICES: 'JUICES',
        FARM_TO_TABLE: 'FARM-TO-TABLE PRODUCE',
        EXOTIC_FRUITS: 'EXOTIC FRUITS',
        GOURMET_MEALS: 'GOURMET MEALS',
        GLUTEN_FREE: 'GLUTEN-FREE OPTIONS',
        VEGAN_CHOICES: 'VEGAN SELECTIONS',
    },
    ADDRESS_TYPE: {
        HOME: "HOME",
        OFFICE: "OFFICE",
        OTHER: "OTHER"
    },
    ALERT_TYPE: {
        ERROR: "ERROR",
        SUCCESS: "SUCCESS",
        WARNING: "WARNING"
    },
    PAYMENT_METHOD: {
        RAZORPAY: "Razorpay",
        COD: "CASH ON DELIVERY",
        WALLET: "Wallet",
        // SUPER_COIN: "SUPER COIN"
    },
    DEFAULT_ALERT_DATA: {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    },
    DELIVERY_TIME_SLOAT: [
        "8.00AM - 10.00AM",
        "10.00AM - 12.00PM",
        "12.00PM - 2.00PM",
        "2.00PM - 4.00PM",
        "4.00PM - 6.00PM"
    ],
    RAZORPAY_CRED: {
        KEY: "rzp_test_pNwP40SbPGEBq5",
        SECRET: "I2Gef5UldOntfIHZv8wWoKLZ"
    },
    LOCAL_STORAGE_CART: "LOCAL_STORAGE_CART",
    UNAVAILABLE_PRODUCT: {
        name: "UNAVAILABLE PRODUCT",
        small_description: "UNAVAILABLE DESCRIPTION",
        sale_price: "0",
        original_price: "0",
        images: ["web_images_no_image.jpg"],
        category: "NO_CATEGORY",
        extra_description: "NO_EXTRA_DESCRIPTION",
        description: "DESCRIPTION",
        key_features: ["NO"],
        specifications: [],
        stock: 120,
        uploaded_by: "",
        uploader_id: "",
        uploader_name: "",
        status: true,
        option: false,
        isDelete: false,
    },
    PRODUCT_VARIATION: {
        "2kg": 2.00,
        "1kg": 1.00,
        "500gm": 0.50,
        "250gm": 0.25,
    },
    ORDER_STATUS: {
        // PENDING: "PENDING",
        // PROCESSING: "PROCESSING",
        // SHIPPED: "SHIPPED",
        // DELIVERED: "DELIVERED",
        // CANCEL_REQUEST: "CANCEL_REQUEST",
        // CANCELED: "CANCELLED",
        // RETURNED: "RETURNED",
        // REFUND: "REFUND",
        // ONHOLD: "ONHOLD",
        ORDER_RECEIVED: "ORDER RECEIVED",
        PREPARING_ORDER: "PREPARING YOUR ORDER",
        READY_FOR_PICKUP: "ORDER READY FOR PICKUP",
        PICKED: "PICKED",
        DELIVERED: "DELIVERED",
        CANCELED: "CANCELLED",
        RETURNED: "RETURNED",
        RETURNED_REQUEST: "RETURNED REQUEST",
        REFUND: "REFUND"
    },

    ORDER_STATUS_DISPLAY: {
        ORDER_RECEIVED: "ORDER RECEIVED",
        PREPARING_ORDER: "PREPARING YOUR ORDER",
        READY_FOR_PICKUP: "ORDER READY FOR PICKUP",
        PICKED: "PICKED",
        DELIVERED: "DELIVERED",
    },
    MIN_STOCK: 10,
    PRODUCT_SEARCHING: {
        CATEGORY: "category",
        DISCOUNT: "discount",
        PRICE_RANGE: "price_range",
        STOCK_FILTER: "stock_filter",
        PRICE_BETWEEN: "price_between"
    },
    PRODUCT_SEARCHING_OPTION: {
        PRICE_RANGE: {
            HIGH_TO_LOW: "HIGH TO LOW",
            LOW_TO_HIGH: "LOW TO HIGH"
        },
        STOCK_FILTER: {
            IN_STOCK: "IN_STOCK",
            OUT_OF_STOCK: "OUT_OF_STOCK"
        }
    }
}

export function getAvtarImage() {
    return const_data.API_URL + "/images/other/avatar.jpg"
}

export function productVariationFindKey(value) {
    for (const key of Object.keys(const_data.PRODUCT_VARIATION)) {
        if (const_data.PRODUCT_VARIATION[key] == value) {
            return key;
        }
    }

    return false;
}
