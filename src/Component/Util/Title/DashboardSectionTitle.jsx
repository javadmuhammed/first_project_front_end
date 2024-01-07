import React from 'react'

function DashboardSectionTitle({ title, icon }) {
    return (
        <div class="main-title-tab">
            <h4><i class={icon + " uil"}></i>{title}</h4>
        </div>
    )
}

export default DashboardSectionTitle
