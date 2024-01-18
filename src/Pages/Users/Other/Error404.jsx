import React from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas'
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser'
import CartEmpty from '../../../Component/Cart/CartEmpty'

function Error404() {
   return (
      <UserLayout>
         <CartUserOverCanvas></CartUserOverCanvas>
         <CategoryModalUser></CategoryModalUser>

         <div className="container">
            <div className='cartEmpty' style={{ backgroundColor: "white" }}>
               <img width={"200px"} src="assets/images/error-404.png" alt="" srcset="" />
               <h2>404!</h2>
               <p>We have found something went wrong</p>
            </div>
         </div>
      </UserLayout>
   )
}

export default Error404
