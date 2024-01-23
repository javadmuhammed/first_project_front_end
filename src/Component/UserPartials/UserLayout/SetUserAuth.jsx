import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserWishlist } from '../../../redux/slice/Wishlist';
import instance from '../../../axios/instance';
import { const_data } from '../../../CONST/const_data';
import authHelper from '../../../helper/AuthHelper';
import { getUserByJwtToken, userAction } from '../../../redux/slice/UserSlicer';
import { fetchCartDetails } from '../../../redux/slice/CartItems';

function SetUserAuth({ children }) {



    let dispatch = useDispatch();
    let isLogged = useSelector((state) => state.userAuth.isLogged)
    let cartData = useSelector((state) => state.userCart);
    let wishListItems = useSelector((state) => state.userWishlist) 

    useEffect(() => {
        if (isLogged) {
            dispatch(fetchCartDetails());
        }
    }, [cartData?.cart_update, isLogged])


    useEffect(()=>{ 
        dispatch(fetchUserWishlist())
    },[wishListItems.refresh_required])

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
        // let profileData;

        try {
            userData = JSON.parse(localStorage.getItem("auth"));
            // let profileData = JSON.parse(localStorage.getItem("profile"))
        } catch (e) {
            userData = {}
            // profileData = {}
        }


        authData.jwt = userData?.jwt;
        authData.reference = userData?.reference;


        if (userData?.jwt) { 
            authHelper.setHeaderRequest(authData.jwt, authData.reference)
            dispatch(await getUserByJwtToken({ jwt: authData.jwt })) 
        } else {
            console.log("Do not have valid JWT Auth")
            dispatch(userAction.userLogout())
        }
    }

    if (!isLogged) {
        // authHelper.setHeaderRequest(authData.jwt, authData.reference);
        setUser()
    }

    return (
        <>
            {children}
        </>
    )
}

export default SetUserAuth