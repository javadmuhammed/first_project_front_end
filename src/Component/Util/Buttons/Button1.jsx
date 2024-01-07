import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

function Button1(props) {
    let isFullWidth = props.isFullWidth;
    return (
        <Fragment>
            {
                (props.element_type == "a") ? <Link style={{ width: isFullWidth ? "100%" : "auto" }} type={props.type} to={props.url} className="cart-checkout-btn text-center hover-btn">{props.title}</Link> : <button style={{ width: isFullWidth ? "100%" : "auto" }}  type={props.type} onClick={props.onClick} className="cart-checkout-btn hover-btn">{props.title}</button>
            }

        </Fragment>
    )
}

export default Button1
