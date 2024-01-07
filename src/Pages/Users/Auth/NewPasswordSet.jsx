import React, { Fragment, useState } from 'react'
import LogoWidget from '../../../Component/Util/Logo/LogoWidget'
import SimpleBox from '../../../Component/Util/Box/SimpleBox'
import InputOne from '../../../Component/Util/Input/InputOne'
import Button1 from '../../../Component/Util/Buttons/Button1'
import BlackButton from '../../../Component/Util/Buttons/BlackButton'
import CopyRight from '../../../Component/UserPartials/Footer/CopyRight'
import { useParams } from 'react-router-dom'
import { UpdatePassword } from '../../../API/api_request'
import ComponentHelper from '../../../helper/ComponentHelper'
import { const_data } from '../../../CONST/const_data'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner'

function NewPasswordSet() {

    let { token } = useParams();
    let [password, passwordUpdate] = useState();
    let [cpassword, cpasswordUpdate] = useState();
    let [alertComponent, alertComponetUpdate] = useState({ component: null })
    let navigate = useNavigate()
    let [isSpinning,setIsSpinning] = useState(false);

    let newPasswordValidation = Yup.object().shape({
        password: Yup.string().required("Password is required").min(6, 'Password must be at least 6 characters'),
        cpassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password"), null], 'Password should be match').min(6, 'Password must be at least 6 characters'),
    })


    function onPasswordsChanges(e, state) {
        state(e.target.value)
    }

    function passwordUpdateAction() {
        setIsSpinning(true)
        newPasswordValidation.validate({ password: password, cpassword: cpassword }).then(() => {
            UpdatePassword(token, password).then((data) => {
                let response = data.data;
                if (response?.status) {
                    setIsSpinning(false)
                    toast.success("Password update success, you can loggin now")
                    setTimeout(() => {
                        navigate("/login")
                    }, 5000)

                    // alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.SUCCESS, "Password update success, you can loggin now") })
                } else {
                    setIsSpinning(false)
                    alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, response?.msg) })
                }
            }).catch((err) => {
                setIsSpinning(false)
                alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, "Something went wrong") })
            })
        }).catch((err) => {
            setIsSpinning(false)
            alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, err.message) })
        })

    }

    return (
        <Fragment>
            <div className="screenCenter">
                <LogoWidget></LogoWidget>
                <LoadingSpinner isShow={isSpinning}></LoadingSpinner>
                <SimpleBox>
                    <div className="text-center   pr-5 pl-5  pt-5 ">
                        <h3 className='mb-5'>Reset Password</h3>
                        {
                            alertComponent.component != null ? alertComponent.component : null
                        }
                        <form action="" method="post">
                            <InputOne value={password} state={passwordUpdate} onChange={onPasswordsChanges} name="password" type="password" placeholder="Enter password" isRequired={true} icon={<i class="uil uil-mobile-android-alt lgn_icon"></i>}  ></InputOne>
                            <InputOne value={cpassword} state={cpasswordUpdate} onChange={onPasswordsChanges} name="cpassword" type="password" placeholder="Enter confirm password" isRequired={true} icon={<i class="uil uil-mobile-android-alt lgn_icon"></i>}  ></InputOne>

                            <div className="mt-2">
                                <Button1 isFullWidth={true} onClick={passwordUpdateAction} type="button" title="Reset Password"></Button1>
                            </div>

                        </form>
                    </div>
                    <div className="alertSignUp mt-3">
                        <a href="" className='anchorWhite'>Don't have an account? - </a>
                        <BlackButton type="a" href={"/sign_up"} title="Sign up now"></BlackButton>
                    </div>
                </SimpleBox>
                <div className="text-center">
                    <CopyRight></CopyRight>
                </div>
            </div>
        </Fragment>
    )
}

export default NewPasswordSet
