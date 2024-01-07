import React, { Fragment, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

function HeaderProductSearch() {

    let searchRef = useRef();
    let navigate = useNavigate()

    let productSearch = function (e) {
        let searchHolder = searchRef.current.value;
        navigate("/product_searching?pname=" + searchHolder)
    }

    return (
        <Fragment>
            <div className="search120">
                <div className="ui search">
                    <div className="ui right icon input swdh10">
                        <input ref={searchRef} className="prompt srch10" type="text" placeholder="Search for products" />
                        <i type="button" onClick={productSearch} style={{ pointerEvents: "unset", cursor: "pointer" }} className='uil uil-search-alt icon icon1'></i>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default HeaderProductSearch
