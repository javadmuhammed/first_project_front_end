import React from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas'
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser'

function CoupenList() {
    return (
        <div>
            <UserLayout>
                <CartUserOverCanvas></CartUserOverCanvas>
                <CategoryModalUser></CategoryModalUser>

                <div>
                    <h2>Coupen list</h2>
                </div>
            </UserLayout>
        </div>
    )
}

export default CoupenList
