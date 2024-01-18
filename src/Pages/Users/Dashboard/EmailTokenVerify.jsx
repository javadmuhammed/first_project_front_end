import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout';
import Breadcrumb from '../../../Component/Util/ElementRelated/Breadcrumb';
import FullBox from '../../../Component/Util/Box/FullBox';
import Button1 from '../../../Component/Util/Buttons/Button1';
import { updateEmailTokenEndPoint } from '../../../API/api_request';
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner';
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas';
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser';


function EmailTokenVerify() {

    let { token } = useParams();
    let [isEmailReseted, setIsEmailReseted] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        updateEmailTokenEndPoint(token).then((data) => {
            let response = data?.data;
            console.log(response)
            if (response?.status) {
                setIsEmailReseted(true)
            } else {
                //navigate("/404123")
            }
        }).catch((err) => {
            // navigate("/404")
        })
    })

    return (
        <div>
            <LoadingSpinner></LoadingSpinner>

            <CartUserOverCanvas />
            <CategoryModalUser></CategoryModalUser>
            <UserLayout>
                <Breadcrumb pageName={"Email address updation"}></Breadcrumb>

                <div className="container">
                    {
                        isEmailReseted ? (
                            <FullBox title={<h4>Email address reseted</h4>} footer={<Button1 element_type="a" to="/" title="Go to home page" />}>
                                <h1 style={{ color: "#f55d2c" }}>E-mail address successfully reset</h1>
                                <p>When a user updates their email address on a website, several actions or considerations might follow. Here's an unordered list (ul) outlining potential steps or impacts after an email address update on a website:</p>
                                <ul  >
                                    <li>Verification Process: The system might trigger an email verification to confirm the new email address.</li>
                                    <li>Notification: Users might receive a confirmation email informing them about the change.</li>
                                    <li>Account Access: The updated email becomes the new login credential for accessing the account.</li>
                                    <li>Data Migration: Any correspondence or history tied to the old email might need to be migrated to the new one.</li>
                                    <li>Communication Updates: The website might update its communication preferences and start sending notifications to the new email.</li>
                                    <li>Security Measures: Users may need to reauthenticate or update security settings tied to the new email.</li>
                                    <li>Backup: Creating a backup or log of the previous email address for reference purposes.</li>
                                    <li>User Support: Providing help or guidance to users who might encounter issues during or after the email update process.</li>
                                </ul>
                            </FullBox>
                        ) : null
                    }

                </div>

            </UserLayout>
        </div>
    )
}

export default EmailTokenVerify
