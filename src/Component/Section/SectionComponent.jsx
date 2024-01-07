import React, { Fragment } from 'react'

function SectionComponent(props) {
    return (
        <Fragment>
            <div className="row mb-5">
                <div class="col-md-12">
                    <div class="main-title-tt mb-2">
                        <div class="main-title-left">
                            <span>{props.subhead}</span>
                            <h2>{props.mainhead}</h2>
                        </div>
                        {
                            props.right && (
                                <div class="main-title-right">
                                    <span>{props.right}</span>
                                </div>
                            )
                        }

                    </div>
                </div>

                <div class="col-md-12">
                    {
                        props.children
                    }
                </div>
            </div>

        </Fragment>
    )
}

export default SectionComponent
