import React from 'react'

function CardBox({ title, paragraph, icon }) {
    return (
        <div class="pdp-group-dt">
            <div class="pdp-icon">
                {icon}
            </div>
            <div class="pdp-text-dt">
                <span>{title}</span>
                <p>{paragraph}</p>
            </div>
        </div>
    )
}

export default CardBox
