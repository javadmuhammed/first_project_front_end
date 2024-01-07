import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function ButtonWithoutBg(props) {
    return (
        <Fragment> 
            {
                props.type == "a" ? <Link to={props.url} className="promo-code">{props.title}</Link> : 
                <button type='button' onClick={props.onClick} className="promo-code">{props.title}</button>
            }

        </Fragment>
    )
}

export default ButtonWithoutBg
