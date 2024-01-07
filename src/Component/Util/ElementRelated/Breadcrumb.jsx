import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function Breadcrumb({ pageName }) {
    return (
        <Fragment>
            <div class="gambo-Breadcrumb">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li class="breadcrumb-item active" aria-current="page">{pageName}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Breadcrumb
