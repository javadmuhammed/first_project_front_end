import React from 'react'

function EmptyScreen({ bgColor,title,content }) {
    return (
        <div className='cartEmpty w-100' style={{ backgroundColor: bgColor }}>
            <img width={"200px"} src="assets/images/other/empty.png" alt="" srcset="" />
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    )
}

export default EmptyScreen
