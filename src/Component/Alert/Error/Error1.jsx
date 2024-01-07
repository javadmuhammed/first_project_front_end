import React from 'react'

function Error1Alert({ msg, visibility }) {
    console.log(msg,visibility)
    return (
        <div className={(visibility ? '' : 'd-none ') + 'alert alert-danger '}>
            {msg}
        </div>
    )
}

export default Error1Alert
