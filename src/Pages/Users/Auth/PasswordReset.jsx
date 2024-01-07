import React, { Fragment, useState } from 'react'
import Button1 from '../../../Component/Util/Buttons/Button1'
import LogoWidget from '../../../Component/Util/Logo/LogoWidget'
import SimpleBox from '../../../Component/Util/Box/SimpleBox'
import InputOne from '../../../Component/Util/Input/InputOne'
import BlackButton from '../../../Component/Util/Buttons/BlackButton'
import CopyRight from '../../../Component/UserPartials/Footer/CopyRight'
import { passwordResetRequest } from '../../../API/api_request'
import { const_data } from '../../../CONST/const_data'
import ComponentHelper from '../../../helper/ComponentHelper'
import * as Yup from 'yup'
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner'

function PasswordReset() {

    let [emailUser, emailUserUpdater] = useState("");
    let [alertComponent, alertComponetUpdate] = useState({ component: null })
    let [isSpinnerShow, setIsSpinnerShow] = useState(false);

    let passwordResetValidation = Yup.object().shape({
        email: Yup.string().email().required("Email address is required")
    })

    function onEmailChange(e, state) {
        state(e.target.value)
    }

    function onForgetAction() {
        setIsSpinnerShow(true)
        passwordResetValidation.validate({ email: emailUser }).then(() => {
            setIsSpinnerShow(true)
            passwordResetRequest({ email: emailUser, domain: const_data.FRONT_END_DOMAIN }).then((data) => {
                let response = data.data;
                if (response?.status) {
                    alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.SUCCESS, "Reset link has sent to mail") })
                } else    {
                    alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, response?.msg) })
                }
                setIsSpinnerShow(false)
            }).catch((err) => {
                alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, "Something went wrong") })
                setIsSpinnerShow(false)
            })
        }).catch((err) => {
            alertComponetUpdate({ component: ComponentHelper.fetchComponent(const_data.ALERT_TYPE.ERROR, err.message) })
            setIsSpinnerShow(false)
        })
    }

    return (
        <Fragment>
            <LoadingSpinner isShow={isSpinnerShow}></LoadingSpinner>
            <div className="screenCenter">
                <LogoWidget></LogoWidget>
                <SimpleBox>
                    <div className="text-center   pr-5 pl-5  pt-5 ">
                        <h3 className='mb-5'>Forget Password</h3>
                        {
                            alertComponent.component != null ? alertComponent.component : null
                        }
                        <InputOne value={emailUser} state={emailUserUpdater} onChange={onEmailChange} name="phone" type="email" placeholder="Enter email address" isRequired={true} icon={<i class="uil uil-envelope-alt lgn_icon"></i>}  ></InputOne>

                        <div className="mt-2">
                            <Button1 type="button" onClick={onForgetAction} isFullWidth={true} title="Reset Password"></Button1>
                        </div>

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

export default PasswordReset
