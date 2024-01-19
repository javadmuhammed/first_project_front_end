import React, { useEffect, useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import Wishlist_item from '../../../Component/Products/Wishlist_item'
import { const_data } from '../../../CONST/const_data'
import { getUserWishList } from '../../../API/api_request';
import { useDispatch, useSelector } from 'react-redux';
import { findDiscountPercentage } from '../../../helper/HelperFunction';
import { removeFromWishlistThunk } from '../../../redux/slice/Wishlist';
import { toast } from 'react-toastify';
import DashboardSectionTitle from '../../../Component/Util/Title/DashboardSectionTitle';
import EmptyScreen from '../../../Component/Util/Box/EmptyScreen';

function Wishlist() {

  let userData = useSelector((state) => state.userAuth.user)
  let dispatch = useDispatch();
  // let [wishListItems, setWishlistItems] = useState([]);
  let wishListItems = useSelector((state) => state.userWishlist.wishlist_items) ?? []




  async function onDelete(product_id) {
    
    dispatch(await removeFromWishlistThunk({ product_id: product_id }))
    toast.success("Item removed from wishlist")
    //setWishlistItems(wishListItems?.filter((items) => items?.product_id?._id != product_id))
  }

  return (
    <DashBoardLayout>
      <div className='mb-3'>
        <DashboardSectionTitle icon="uil-apps" title="Wishlist" ></DashboardSectionTitle>
      </div>

      {
        wishListItems?.length > 0 ? (
          wishListItems?.map((wishItems) => {
            return <Wishlist_item
              offer={findDiscountPercentage(wishItems?.product_id?.original_price, wishItems?.product_id?.sale_price)}
              product_id={wishItems?.product_id?._id}
              onDelete={() => { onDelete(wishItems?.product_id?._id) }}
              originalPrice={const_data.CURRENCY_ICON + wishItems?.product_id?.original_price}
              productImage={const_data.public_image_url + "/" + wishItems?.product_id?.images[0]}
              sale_price={const_data.CURRENCY_ICON + wishItems?.product_id?.sale_price}
              title={wishItems?.product_id?.name
              }>
            </Wishlist_item>
          })
        ) :  <EmptyScreen bgColor={"white"} content={"Your wishlist is empty! Explore more"} title={"Wishlist is empty"}></EmptyScreen>
      }

       

      {/* <Wishlist_item offer={"5"} onAddtoCart={() => { }} onDelete={() => { }} originalPrice={const_data.CURRENCY_ICON + '2500'} productImage={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRydhrW26Zy62MDZVMT_Yd2oI8qDbWw62AN1g&usqp=CAU"} sale_price={const_data.CURRENCY_ICON + '2100'} title={"Product Name"}></Wishlist_item>
      <Wishlist_item offer={"5"} onAddtoCart={() => { }} onDelete={() => { }} originalPrice={const_data.CURRENCY_ICON + '2500'} productImage={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRydhrW26Zy62MDZVMT_Yd2oI8qDbWw62AN1g&usqp=CAU"} sale_price={const_data.CURRENCY_ICON + '2100'} title={"Product Name"}></Wishlist_item>
      <Wishlist_item offer={"5"} onAddtoCart={() => { }} onDelete={() => { }} originalPrice={const_data.CURRENCY_ICON + '2500'} productImage={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRydhrW26Zy62MDZVMT_Yd2oI8qDbWw62AN1g&usqp=CAU"} sale_price={const_data.CURRENCY_ICON + '2100'} title={"Product Name"}></Wishlist_item>
      <Wishlist_item offer={"5"} onAddtoCart={() => { }} onDelete={() => { }} originalPrice={const_data.CURRENCY_ICON + '2500'} productImage={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRydhrW26Zy62MDZVMT_Yd2oI8qDbWw62AN1g&usqp=CAU"} sale_price={const_data.CURRENCY_ICON + '2100'} title={"Product Name"}></Wishlist_item>
      <Wishlist_item offer={"5"} onAddtoCart={() => { }} onDelete={() => { }} originalPrice={const_data.CURRENCY_ICON + '2500'} productImage={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRydhrW26Zy62MDZVMT_Yd2oI8qDbWw62AN1g&usqp=CAU"} sale_price={const_data.CURRENCY_ICON + '2100'} title={"Product Name"}></Wishlist_item> */}

    </DashBoardLayout >
  )
}

export default Wishlist
