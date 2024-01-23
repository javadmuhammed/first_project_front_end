import React, { Fragment } from 'react'

import HeaderProductSearch from '../../Other/HeaderProductSearch'
import HeaderUserIcon from './HeaderUserIcon'
import LogoWidget from '../../Util/Logo/LogoWidget'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function TopHeader() {

    let wishListItems = useSelector((state) => state.userWishlist.wishlist_items) ?? []

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
                                    <i className="uil uil-phone-alt"></i>+91 9744727684
                                </li>
                                <li>
                                    <Link to="/coupens" className="offer-link"><i className="uil uil-gift"></i>Coupens</Link>
                                </li>
                                <li>
                                    <Link to="/wishlist" className="option_links" title="Wishlist"><i className='uil uil-heart icon_wishlist'></i>
                                        {
                                            wishListItems.length == 0 ? "" : <span class="noti_count1">{wishListItems.length}</span>
                                        }

                                    </Link>
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
