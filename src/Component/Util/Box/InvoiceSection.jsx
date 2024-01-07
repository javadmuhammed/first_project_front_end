import React from 'react'
import WhiteBox from './WhiteBox'

function InvoiceSection({ title, children }) {
    return (
        <div>
            <p className='mb-0'>{title}</p>
            <div className='mt-3'>
                <span>{
                    children}
                </span>
            </div>
        </div>
    )
}

export default InvoiceSection
