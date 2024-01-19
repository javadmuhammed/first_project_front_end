import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartDetails } from '../../../redux/slice/CartItems';
import { fetchUserWishlist } from '../../../redux/slice/Wishlist';
import instance from '../../../axios/instance';
import { const_data } from '../../../CONST/const_data';
import authHelper from '../../../helper/AuthHelper';
import { getUserByJwtToken, userAction } from '../../../redux/slice/UserSlicer';

function SetUserAuth({ children }) {



   


    let dispatch = useDispatch();
    let isLogged = useSelector((state) => state.userAuth.isLogged)
    let cartData = useSelector((state) => state.userCart);



    async function updateUserWishlist() {
        dispatch(await fetchUserWishlist())
    }

    useEffect(() => {
        if (isLogged) {
            updateUserWishlist() 
        }
    }, [])



    let userData;


    try {
        userData = JSON.parse(localStorage.getItem("auth"));
    } catch (e) {
        userData = {}
    }

    let authData = {
        jwt: userData?.jwt,
        reference: userData?.reference
    }

    
     
    

   



    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error?.response?.status == 403) {


                // alert("Worked")

                try {
                    userData = JSON.parse(localStorage.getItem("auth"));

                    // alert(userData.jwt)

                    let authData = {
                        jwt: userData?.jwt,
                        reference: userData?.reference
                    }


                    instance.post(const_data.API_ENDPOINT.refresh_jwt, { refresh_token: authData.reference }).then((refreshData) => {

                        if (refreshData.data?.status) {
                            authData.jwt = refreshData.data.token;
                            authHelper.setJWTToken(authData.jwt, authData.reference)
                            // alert("Hello world")
                            setUser()
                        } else {
                            dispatch(userAction.userLogout())
                        }
                    }).catch((err) => {
                        dispatch(userAction.userLogout())
                    })

                } catch (e) {
                    userData = {}
                }

            } else {
                dispatch(userAction.userLogout())
            }
        }
    )


    async function setUser() {



        let userData;
        let profileData;

        try {
            userData = JSON.parse(localStorage.getItem("auth"));
            profileData = JSON.parse(localStorage.getItem("profile"))
        } catch (e) {
            userData = {}
            profileData = {}
        }


        authData.jwt = userData?.jwt;
        authData.reference = userData?.reference;




        if (userData?.jwt) {

            // console.log("Profile data :",profileData)

            let userLocalData = {
                username: profileData?.user?.username,
                email: profileData?.user?.email,
                mobile: profileData?.user?.mobile,
                firstName: profileData?.user?.firstName,
                lastName: profileData?.user?.lastName,
                profile_pic: profileData?.user?.profile,
                wallet_amount: profileData?.user?.wallet_amount,
                total_wallet_credit: profileData?.user?.total_wallet_credit,
                last_wallet_update: profileData?.user?.last_wallet_update,
            }

            // alert("This work")
            authHelper.setHeaderRequest(authData.jwt , authData.reference)
            dispatch(await getUserByJwtToken({ jwt: authData.jwt }))
            // dispatch(userAction.setUserAsLogged())
        } else {
            console.log("Do not have valid JWT Auth")
            dispatch(userAction.userLogout())
        }
    }

    if (!isLogged) {
        authHelper.setHeaderRequest(authData.jwt, authData.reference);
        setUser()
    }

    return (
        <>
            {children}
        </>
    )
}

export default SetUserAuth