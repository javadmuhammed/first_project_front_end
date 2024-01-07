import React from 'react'
import { Link } from 'react-router-dom'

function BlackButton({ title, type, onClickAction, href }) {
    return (
        type == "a" ? <Link className='blackButton' to={href} onClick={onClickAction}>{title}</Link> : <button  className='blackButton' onClick={onClickAction}>{title}</button>
    )
}

export default BlackButton
