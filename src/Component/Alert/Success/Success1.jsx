import React from 'react'

function Success1Alert({ msg,visibility }) {
    return (
        <div className={(visibility ? '' : 'd-none ') + 'alert alert-success '}>
            {msg}
        </div>
    )
}

export default Success1Alert
