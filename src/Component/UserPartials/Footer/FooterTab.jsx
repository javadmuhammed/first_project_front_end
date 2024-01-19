import React from 'react'
import { Link } from 'react-router-dom'

function FooterTab(props) {
    console.log(props.link)
    return (
        <div className="second-row-item">
            <h4>{props.title}</h4>
            <ul>
                {
                    props.link.map(function(item){
                        return <li><Link to={item.link}>{item.title}</Link></li>
                    })
                }
            </ul>
        </div>
    )
}

export default FooterTab
