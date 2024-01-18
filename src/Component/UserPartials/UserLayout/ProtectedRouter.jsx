import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../Util/ElementRelated/LoadingSpinner'

function ProtectedRouter({ loggedComponent, }) {

    let [isAuth, setIsAuth] = useState(false);
    let isLogged = useSelector((state) => state.userAuth.isLogged)
    let navigate = useNavigate();


    useEffect(() => {
        if (isLogged) {
            setIsAuth(true)
        }  
    }, [isLogged])




    return (
        <>
            {isAuth ? loggedComponent : <LoadingSpinner isShow={true}></LoadingSpinner>}
        </>

    )
}

export default ProtectedRouter