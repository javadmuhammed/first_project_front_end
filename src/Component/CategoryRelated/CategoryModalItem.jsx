import React, { Fragment } from 'react'

function CategoryModalItem(props) {
    return (
        <Fragment>
            <a href={props.url} className="single-cat-item">
                <div className="icon">
                    <img src={props.image} alt="" />
                </div>
                <div className="text"> {props.title} </div>
            </a>
        </Fragment>
    )
}

export default CategoryModalItem
