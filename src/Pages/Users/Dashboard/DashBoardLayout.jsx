import React from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import { useSelector } from 'react-redux'
import DashboardTitle from '../../../Component/Util/ElementRelated/DashboardTitle'
import DashboardNavbar from '../../../Component/Other/DashboardNavbar'
import Breadcrumb from '../../../Component/Util/ElementRelated/Breadcrumb'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner'
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas'
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser'

function DashBoardLayout({ children, currentPage }) {
    let userData = useSelector((state) => state.userAuth.user);
    // let isLogged = useSelector((state) => state.userAuth.isLogged)
    let navigate = useNavigate();

    // if (!isLogged) {
    //     navigate("/login")
    // }


    return (



        <div>
            <LoadingSpinner></LoadingSpinner>

            <CartUserOverCanvas />
            <CategoryModalUser></CategoryModalUser>
            <UserLayout>
                <Breadcrumb pageName={currentPage}></Breadcrumb>
                <DashboardTitle onProfileUpdate={() => { }} phoneNumber={userData?.mobile} profileImage={""} userName={userData?.name} walletAmount={"100rs"}   ></DashboardTitle>
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-md-3">
                            <DashboardNavbar ></DashboardNavbar>
                        </div>
                        <div className="col-md-9">
                            {children}
                        </div>
                    </div>
                </div>
            </UserLayout>
        </div>
    )
}

export default DashBoardLayout
