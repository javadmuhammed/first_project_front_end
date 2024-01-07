import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { const_data } from '../../../CONST/const_data';
import { profilePictureUpdate } from '../../../API/api_request';
import { userAction } from '../../../redux/slice/UserSlicer';
import UserProfile from './UserProfile';

function DashboardTitle() {

     let userData = useSelector((state) => state.userAuth.user);

    return (
        <div class="dashboard-group">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="user-dt">
                            {/* <div class="user-img">
                                <img src={profileImage} alt="" />
                                <div class="img-add">
                                    <input type="file" onChange={(e) => { onProfileImageChange(e.target.files[0]) }} id="file" />
                                    <label for="file"><i class="uil uil-camera-plus"></i></label>
                                </div>
                            </div> */}
                            <UserProfile />
                            <h4>{userData?.username}</h4>
                            <p>{userData?.mobile}<a href="#"><i class="uil uil-edit"></i></a></p>
                            <div class="earn-points"><img src="images/Dollar.svg" alt="" />Super Coin : <span>{userData?.wallet_amount}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardTitle
