import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../Util/ElementRelated/LoadingSpinner';

function ProtectedRouter({ loggedComponent }) {
    const [isLoading, setIsLoading] = useState(true);
    const userAuth = useSelector((state) => state.userAuth);
    const navigate = useNavigate();
    const [moveToLogin, setMoveToLogin] = useState(false);

    useEffect(() => {
        if (!userAuth.isLoading) {
            setIsLoading(false);

            if (!userAuth.isLogged) {
                setMoveToLogin(true);
            }
        }
    }, [userAuth.isLoading, userAuth.isLogged]);

    useEffect(() => {
        if (moveToLogin) { 
            navigate('/login', { replace: true });
        }
    }, [moveToLogin, navigate]);

    if (isLoading) {
        return <LoadingSpinner isShow={true}></LoadingSpinner>;
    }

    return <>{loggedComponent}</>;
}

export default ProtectedRouter;
