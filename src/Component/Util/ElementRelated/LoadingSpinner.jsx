import React from 'react'
import { Fragment } from 'react'

function LoadingSpinner({ isShow = false }) {
    return (
        <Fragment>
            <div className={"loadingSpinnerWrapper " + (!isShow ? "d-none" : " ")} >
                <span class="loadingSpinner"></span>
            </div>
        </Fragment>
    )
}

export default LoadingSpinner
