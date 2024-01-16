import React from 'react'
import { useDispatch } from 'react-redux';
import instance from '../../../axios/instance';
import { const_data } from '../../../CONST/const_data';
import { userAction } from '../../../redux/slice/UserSlicer';

function AdminCover({ children }) {


  let dispatch = useDispatch()


  let userData;

  try {
    userData = JSON.parse(localStorage.getItem("auth"));
    console.log(userData)
  } catch (e) {
    userData = {}
  }

  let authData = {
    jwt: userData?.jwt,
    reference: userData?.reference,
    isAdmin: userData?.isAdmin
  }

  instance.interceptors.request.use(function (config) {

    const jwtHeaderValue = "Bearer " + encodeURIComponent(authData.jwt);
    const referenceHeaderValue = encodeURIComponent(authData.reference);

    config.headers.authorization = jwtHeaderValue;
    config.headers.reference = referenceHeaderValue;


    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status == 403) {
        if (authData.isAdmin) {
          instance.post(const_data.API_ENDPOINT.admin_jwt_regenarate, { refresh_token: authData.reference }).then((refreshData) => {

            if (refreshData.data?.status) {
              console.log(refreshData)
              authData.jwt = refreshData.data.token;
              console.log(authData)
              // localStorage.setItem('auth', JSON.stringify(authData))
              authHelper.setJWTToken(authData.jwt, authData.reference, true)
              setAdmin()
            } else {
              dispatch(userAction.userLogout())
            }
          }).catch((err) => {
            dispatch(userAction.userLogout())
          })
        } else {
          dispatch(userAction.userLogout())
        }
      }
    }
  )


  function setAdmin() {

    try {
      userData = JSON.parse(localStorage.getItem("auth"));
      console.log(userData)
    } catch (e) {
      userData = {}
    }

    authData.jwt = userData?.jwt;
    authData.reference = userData?.reference



    if (authData?.jwt) {
      instance.post(const_data.API_ENDPOINT.admin_jwt_validate, authData).then((data) => {
        if (data.data?.status) {
          let userData = data?.data?.user;
          dispatch(userAction.setUserAsLogged({ user: userData }))
        }
      }).catch((err) => {
        dispatch(userAction.userLogout())
      })
    } else {
      console.log("Do not have JWT")
    }
  }

  setAdmin();


  return (
    <div>
      {children}
    </div>
  )
}

export default AdminCover
