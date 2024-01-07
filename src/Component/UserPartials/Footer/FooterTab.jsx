import React from 'react'

function FooterTab(props) {
    console.log(props.link)
    return (
        <div className="second-row-item">
            <h4>{props.title}</h4>
            <ul>
                {
                    props.link.map(function(item){
                        return <li><a href={item.link}>{item.title}</a></li>
                    })
                }
            </ul>
        </div>
    )
}

export default FooterTab
