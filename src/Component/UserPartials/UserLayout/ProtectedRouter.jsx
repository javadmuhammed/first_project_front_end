import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRouter({ loggedComponent, }) {

    let isLogged = useSelector((state) => state.userAuth.isLogged)
    console.log(isLogged)
    let navigate = useNavigate();

    // useEffect(() => {
    //     if (!isLogged) {
    //         navigate("/login")
    //     }
    // })

    return (
        isLogged ? loggedComponent : <></>
    )
}

export default ProtectedRouter