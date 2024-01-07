import React from 'react'

function Warning1Alert({ msg, visibility }) {
    console.log(msg,visibility)
    return (
        <div className={(visibility ? '' : 'd-none ') + ' alert alert-warning '}>
            {msg}
        </div>
    )
}

export default Warning1Alert
