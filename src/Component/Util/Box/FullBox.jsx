import React from 'react'

function FullBox({ title, children, footer, withoutFooter }) {
    return (
        <div class="pdpt-bg">
            <div class="pdpt-title">
                {title}
            </div>
            <div class="ddsh-body">
                {children}
            </div>
            {
                !withoutFooter ? (
                    <div class="more-link14">
                        {footer}
                    </div>
                ) : null
            }

        </div>
    )
}

export default FullBox
