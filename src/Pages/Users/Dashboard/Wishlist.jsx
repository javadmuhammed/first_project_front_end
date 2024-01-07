import React, { useEffect, useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import Wishlist_item from '../../../Component/Products/Wishlist_item'
import { const_data } from '../../../CONST/const_data'
import { getUserWishList } from '../../../API/api_request';
import { useSelector } from 'react-redux';
import { findDiscountPercentage } from '../../../helper/HelperFunction';

function Wishlist() {

  let userData = useSelector((state) => state.userAuth.user)
  let [wishListItems, setWishlistItems] = useState([]);
  useEffect(() => {

    getUserWishList().then((data) => {
      let response = data?.data;
      console.log(response)
      if (response?.status) {
        let wishlistItems = response?.wishlist;
        setWishlistItems(wishlistItems)
        console.log(response)
      }
    }).catch((err) => { })

    console.log(wishListItems)
  }, [])


  function onDelete(product_id) {
    setWishlistItems(wishListItems?.filter((items) => items?.product_id?._id != product_id))
  }

  return (
    <DashBoardLayout>

      {
        wishListItems?.map((wishItems) => {
          return <Wishlist_item
            offer={findDiscountPercentage(wishItems?.product_id?.original_price, wishItems?.product_id?.sale_price)}
            product_id={wishItems?.product_id?._id}
            onDelete={onDelete}
            originalPrice={const_data.CURRENCY_ICON + wishItems?.product_id?.original_price}
            productImage={const_data.public_image_url + "/" + wishItems?.product_id?.images[0]}
            sale_price={const_data.CURRENCY_ICON + wishItems?.product_id?.sale_price}
            title={wishItems?.product_id?.name
            }>
          </Wishlist_item>
        })
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
