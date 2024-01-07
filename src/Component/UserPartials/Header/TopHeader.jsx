import React, { Fragment } from 'react'

import HeaderProductSearch from '../../Other/HeaderProductSearch'
import HeaderUserIcon from './HeaderUserIcon'
import LogoWidget from '../../Util/Logo/LogoWidget'
import { useSelector } from 'react-redux'

function TopHeader() {



    return (
        <Fragment>
            <div className="top-header-group">

                <div className="top-header">
                    <div className="container">

                        <LogoWidget></LogoWidget>
                        <HeaderProductSearch />


                        <div className="header_right">
                            <ul>
                                <li>
                                    <a href="#" className="offer-link"><i className="uil uil-phone-alt"></i>1800-000-000</a>
                                </li>
                                <li>
                                    <a href="offers.html" className="offer-link"><i className="uil uil-gift"></i>Offers</a>
                                </li>
                                <li>
                                    <a href="dashboard_my_wishlist.html" className="option_links" title="Wishlist"><i className='uil uil-heart icon_wishlist'></i><span className="noti_count1">3</span></a>
                                </li>
                                <li className="ui dropdown">
                                    <HeaderUserIcon></HeaderUserIcon>

                                </li>
                               


                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default TopHeader
