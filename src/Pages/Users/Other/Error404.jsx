import React from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas'
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser'

function Error404() {
   return (
      <UserLayout>
         <CartUserOverCanvas></CartUserOverCanvas>
         <CategoryModalUser></CategoryModalUser>

         <div>
            <h2>404 ERROR</h2>
         </div>
      </UserLayout>
   )
}

export default Error404
