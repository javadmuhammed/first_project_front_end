import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../Util/ElementRelated/LoadingSpinner'

function RestrictedRouter({ component, }) {

    let [isLoading, setIsLoading] = useState(true);
    let userAuth = useSelector((state) => state.userAuth)
    let navigate = useNavigate();

    useEffect(() => {
        if ((!userAuth.isLoading && userAuth.isLogged)) {
            navigate(-1)
        }else{
            setIsLoading(false)
        } 
    }, [userAuth.isLoading])




    return (
        <>
            {isLoading ? <LoadingSpinner isShow={true}></LoadingSpinner> : component}
        </>

    )
}

export default RestrictedRouter