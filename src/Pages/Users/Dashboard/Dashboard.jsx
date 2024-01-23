import React, { useEffect, useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import DashboardSectionTitle from '../../../Component/Util/Title/DashboardSectionTitle'
import { useSelector } from 'react-redux'
import FullBox from '../../../Component/Util/Box/FullBox'
import { Link, useNavigate } from 'react-router-dom'
import { getUserWalletHistory } from '../../../API/api_request'
import { const_data } from '../../../CONST/const_data'
import {toast} from 'react-toastify'


function Dashboard() {

    let userData = useSelector((state) => state.userAuth.user)


    let [latestWalletUpdate, walletUpdate] = useState([]);

    useEffect(() => {
        console.log("User Data", userData)
    }, [])



    return (

        <DashBoardLayout currentPage="Dashboard">
            <DashboardSectionTitle icon="uil-apps" title="Overview" ></DashboardSectionTitle>
            <h2>Hello {userData?.first_name} {userData?.last_name} </h2>
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading"><i class="uil uil-megaphone"> </i> Refer & Earn</h4>
                <p>Aww yeah, Grow your wallet balance by introducing our service to your family and friends! When they sign up, you're sure to receive a guaranteed referral bonus. Start spreading the word and watch your rewards increase!</p>
                <hr />
                <p class="mb-0" onClick={() => {
                    let referalLink = const_data.FRONT_END_DOMAIN + "/sign_up/" + userData.referal_code
                    navigator.clipboard.writeText(referalLink)
                    toast.success("Referal link copied")
                }}>Click here to copy referal link</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FullBox title={<h4>My Wallet</h4>} footer={<Link to="/manage_wallet">Wallet & Details</Link>}>
                        <h2>{userData?.wallet_amount} Wallet</h2> 
                    </FullBox>
                </div>
                <div className="col-md-6">
                    <FullBox title={<h4>My Orders</h4>} footer={<Link to="/my_orders">All Orders</Link>}>
                        <h2>{userData?.number_orders_placed} Total Purchases</h2>
                         
                    </FullBox>
                </div>
            </div>
        </DashBoardLayout>
    )

}

export default Dashboard
