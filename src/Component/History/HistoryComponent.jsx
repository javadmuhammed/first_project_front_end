import React from 'react'

function HistoryComponent({ title, subHeading, footer, tile, tileData }) {
    return (
        <div class="purchase-history">
            <div class="purchase-history-left">
                <h4>{title}</h4>
                <p>{subHeading}</p>
                <span>{footer}</span>
            </div>
            <div class="purchase-history-right">
                <span>{tile}</span>
                {tileData}
            </div>
        </div>
    )
}

export default HistoryComponent
