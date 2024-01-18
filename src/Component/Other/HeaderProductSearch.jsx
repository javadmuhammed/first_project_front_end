import { Field, Formik, Form } from 'formik';
import React, { Fragment, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

function HeaderProductSearch() {

    let searchRef = useRef();
    let navigate = useNavigate()

    let productSearch = function (values) {
        let search = values.search
        // let searchHolder = searchRef.current.value;
        navigate("/product_searching?pname=" + search)
    }

    let searchValidation = Yup.object().shape({
        search: Yup.string("Please enter valid name").required("Please enter valid name")
    })



    return (
        <Fragment>
            <div className="search120">
                <Formik innerRef={searchRef} validationSchema={searchValidation} initialValues={{ search: "" }} onSubmit={productSearch}>
                    <Form>
                        <div className="ui search">
                            <div className="ui right icon input swdh10">

                                <Field onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        searchRef.current.submitForm()
                                    }
                                }} type="search" name="search" id="search" className="prompt srch10" placeholder="Search for products" ></Field>
                                {/* <input className="prompt srch10" type="text" placeholder="Search for products" /> */}
                                <i type="submit" style={{ pointerEvents: "unset", cursor: "pointer" }} className='uil uil-search-alt icon icon1'></i>
                            </div>
                        </div>
                    </Form>
                </Formik>

            </div>
        </Fragment>
    )
}

export default HeaderProductSearch
