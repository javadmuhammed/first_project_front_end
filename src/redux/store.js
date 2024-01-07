import { connect } from 'react-redux'
import { configureStore, createSlice, } from '@reduxjs/toolkit'
import userSlicer from './slice/UserSlicer'
import CartCheckoutSlicer from './slice/CartCheckout'
import CartItemsSlicer from './slice/CartItems'
import WishListSlicer from './slice/Wishlist'
import ProductSearching from './slice/ProductSearching'

let AppStore = configureStore(
    {
        reducer: {
            userAuth: userSlicer,
            userCheckout: CartCheckoutSlicer,
            userCart: CartItemsSlicer,
            userWishlist: WishListSlicer,
            productSearching: ProductSearching
        }
    }
)

export default AppStore