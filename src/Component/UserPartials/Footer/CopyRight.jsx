import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function CopyRight() {
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="footer-bottom-links">
                        <ul>
                            <li><Link href="">About</Link></li>
                            <li><Link href="">Contact</Link></li>
                            <li><Link href="">Privacy Policy</Link></li>
                            <li><Link href="">Term & Conditions</Link></li>
                            <li><Link href="">Refund & Return Policy</Link></li>
                        </ul>
                    </div>
                    <div className="copyright-text">
                        <i className="uil uil-copyright"></i>Copyright 2020 <b>Gambolthemes</b> . All rights reserved
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CopyRight
