import React, { useEffect, useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import DashboardSectionTitle from '../../../Component/Util/Title/DashboardSectionTitle'
import { useSelector } from 'react-redux'
import FullBox from '../../../Component/Util/Box/FullBox'
import { Link, useNavigate } from 'react-router-dom'
import { getUserWalletHistory } from '../../../API/api_request'


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
            <div className="row">
                <div className="col-md-6">
                    <FullBox title={<h4>My Wallet</h4>} footer={<Link to="/manage_wallet">Wallet & Details</Link>}>
                        <h2>{userData?.wallet_amount} Wallet</h2>
                        <ul>
                            {
                                latestWalletUpdate.forEach((item) => {
                                    <li>
                                        <a href="#" class="small-reward-dt hover-btn">{"Credit" + item.amount}</a>
                                    </li>
                                })
                            }


                        </ul>
                    </FullBox>
                </div>
                <div className="col-md-6">
                    <FullBox title={<h4>My Orders</h4>} footer={<Link to="/my_orders">All Orders</Link>}>
                        <h2>2 Recently Purchases</h2>
                        <ul class="order-list-145">
                            <li>
                                <div class="smll-history">
                                    <div class="order-title">2 Items <span data-inverted="" data-tooltip="2kg broccoli, 1kg Apple" data-position="top center">?</span></div>
                                    <div class="order-status">On the way</div>
                                    <p>$22</p>
                                </div>
                            </li>
                        </ul>
                    </FullBox>
                </div>
            </div>
        </DashBoardLayout>
    )

}

export default Dashboard
