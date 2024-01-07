import React, { Fragment } from 'react'

function MessurementSelector(props) {
    return (
        <Fragment>
            <input type="radio" onChange={props.onChange} id={props.key} name={props.name} />
            <label htmlFor={props.key}>{props.value}</label>
        </Fragment>
    )
}

export default MessurementSelector
