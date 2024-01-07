import React, { Fragment } from 'react'

function CopyRight() {
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="footer-bottom-links">
                        <ul>
                            <li><a href="about_us.html">About</a></li>
                            <li><a href="contact_us.html">Contact</a></li>
                            <li><a href="privacy_policy.html">Privacy Policy</a></li>
                            <li><a href="term_and_conditions.html">Term & Conditions</a></li>
                            <li><a href="refund_and_return_policy.html">Refund & Return Policy</a></li>
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
