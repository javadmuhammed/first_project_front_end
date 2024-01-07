import React from 'react'
import { useState } from 'react'
import { const_data, getAvtarImage } from '../../../CONST/const_data'
import { useDispatch, useSelector } from 'react-redux'
import { profilePictureUpdate } from '../../../API/api_request';
import { userAction } from '../../../redux/slice/UserSlicer';
import authHelper from '../../../helper/AuthHelper';

function UserProfile() {

    let userData = useSelector((state) => state.userAuth.user);
    let dispatch = useDispatch();

    let [profileImage, profileStateUpdate] = useState(userData?.profile_pic ?? getAvtarImage())
     

    function onProfileImageChange(profile) {
        let formData = new FormData();
        formData.append("profile", profile);



        profilePictureUpdate(formData).then((data) => {

            console.log(data)
            if (data.data?.status) {
                let dpImage = data.data?.profileImage;
                console.log("Profile Picture Update Success")
                let profileImageUrl = const_data.user_profile_path + "/" + dpImage;
                profileStateUpdate(profileImageUrl)
                let updateDate = { ...userData };
                updateDate.profile = profileImageUrl;
                dispatch(userAction.updateUser({ user: updateDate }))
                authHelper.setUserToLocalStorage(updateDate)
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div class="user-img">
            <img src={profileImage} alt="" />

            <div class="img-add">
                <input type="file" onChange={(e) => { onProfileImageChange(e.target.files[0]) }} id="file" />
                <label for="file"><i class="uil uil-camera-plus"></i></label>
            </div>
        </div>
    )
}

export default UserProfile
