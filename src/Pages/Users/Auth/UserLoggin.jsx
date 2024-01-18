import React, { Fragment, useState } from 'react'
import LogoWidget from '../../../Component/Util/Logo/LogoWidget'
import SimpleBox from '../../../Component/Util/Box/SimpleBox'
import InputOne from '../../../Component/Util/Input/InputOne'
import Button1 from '../../../Component/Util/Buttons/Button1'
import BlackButton from '../../../Component/Util/Buttons/BlackButton'
import CopyRight from '../../../Component/UserPartials/Footer/CopyRight'
import { userLoginRequest } from '../../../API/api_request'
import authHelper from '../../../helper/AuthHelper'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserByJwtToken, userAction } from '../../../redux/slice/UserSlicer'
import { const_data } from '../../../CONST/const_data'
import ComponentHelper from '../../../helper/ComponentHelper'
import * as Yup from 'yup'
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner'

function UserLoggin() {

    let [username, userNameUpdater] = useState();
    let [password, passwordUpdater] = useState();
    let [alert, alertUpdate] = useState({ component: null });
    let [isSpinning, setIsSpinning] = useState(false);


    let loginValidation = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required")
    })

    let dispatcher = useDispatch()

    let navigate = useNavigate()

    function inputOnChange(e, state) {
        state(e.target.value)
    }

    function loginSubmit() {
        setIsSpinning(true)
        loginValidation.validate({ username, password }).then(() => {

            userLoginRequest({ username, password }).then(async (user) => {
                console.log(user)
                if (user.data?.status) {

                    let loggedUser = user.data?.user;

                    let userLocalData = {
                        username: loggedUser?.username,
                        email: loggedUser?.email,
                        mobile: loggedUser?.mobile,
                        firstName: loggedUser?.first_name,
                        lastName: loggedUser?.last_name,
                        profile_pic: loggedUser?.profile_pic,
                        wallet_amount: loggedUser?.wallet_amount,
                        total_wallet_credit: loggedUser?.total_wallet_credit,
                        last_wallet_update: loggedUser?.last_wallet_update, 
                        referal_code: loggedUser?.referal_code, 
                    }

                    authHelper.setJWTToken(user.data.user.access_token, user.data.user._id)
                     authHelper.setUserToLocalStorage(userLocalData)
                    dispatcher(await getUserByJwtToken({ jwt: loggedUser?.access_token}))
                    setIsSpinning(false)
                    navigate("/")
                } else {
                    setIsSpinning(false)
                    alertUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, user.data?.msg) })
                }
            }).catch((err) => {
                setIsSpinning(false)
                alertUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, err?.msg) })
            })
        }).catch((validateError) => {
            setIsSpinning(false)
            alertUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, validateError.message) })
        })

    }


    return (
        <Fragment>
            <div className="screenCenter">
                <LogoWidget></LogoWidget>
                <LoadingSpinner isShow={isSpinning}></LoadingSpinner>
                <SimpleBox>
                    <div className="text-center   pr-5 pl-5  pt-5 ">

                        <h3 className='mb-5'>Sign in</h3>
                        {
                            alert.component != null ? alert.component : null
                        }
                        <InputOne value={username} state={userNameUpdater} onChange={inputOnChange} name="username" type="text" placeholder="Enter username/email address" isRequired={true} icon={<i class="uil uil-mobile-android-alt lgn_icon"></i>}  ></InputOne>
                        <InputOne value={password} state={passwordUpdater} onChange={inputOnChange} name="password" type="password" placeholder="Enter password" isRequired={true} icon={<i class="uil uil-padlock lgn_icon"></i>}  ></InputOne>

                        <div className="mt-2">
                            <Button1 onClick={loginSubmit} isFullWidth={true} type="b" title="Sign in now"></Button1>
                        </div>
                    </div>
                    <div className="p-4  text-center" style={{ marginBottom: "0px" }}>
                        <Link to={"/forget_password"} className='anchorText'>Forget Password</Link>
                    </div>
                    <div className="alertSignUp">
                        <Link to={"/sign_up"} className='anchorWhite'>Don't have an account? - </Link>
                        <BlackButton type={"a"} href={"/sign_up"} title="Sign up now"></BlackButton>
                    </div>
                </SimpleBox>
                <div className="text-center">
                    <CopyRight></CopyRight>
                </div>
            </div>
        </Fragment>
    )
}

export default UserLoggin
