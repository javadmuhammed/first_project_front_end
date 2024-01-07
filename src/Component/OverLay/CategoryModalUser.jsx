import React, { Fragment, useState } from 'react';
import Image from '../../assets/images/category/icon-1.svg'
import Image2 from '../../assets/images/category/icon-2.svg'
import CategoryModalItem from '../CategoryRelated/CategoryModalItem';

function CategoryModalUser() {


    let [categoryModalItems, categoryModalItemUpdate] = useState([{
        url: "#",
        image: Image,
        title: "Sample Category"
    }, {
        url: "#",
        image: Image2,
        title: "Sample Category 2"
    }, {
        url: "#",
        image: Image2,
        title: "Sample Category 2"
    }])
    return (
        <Fragment>
            <div id="category_model" className="header-cate-model main-gambo-model modal fade" tabIndex="-1" role="dialog" aria-modal="false">
                <div className="modal-dialog category-area" role="document">
                    <div className="category-area-inner">
                        <div className="modal-header">
                            <button type="button" className="close btn-close" data-dismiss="modal" aria-label="Close">
                                <i className="uil uil-multiply"></i>
                            </button>
                        </div>
                        <div className="category-model-content modal-content">
                            <div className="cate-header">
                                <h4>Select Category</h4>
                            </div>
                            <ul className="category-by-cat">
                                {
                                    categoryModalItems.map(function (categoryItem) {
                                        return (
                                            <li>
                                                <CategoryModalItem url={categoryItem.url} image={categoryItem.image} title={categoryItem.title} />
                                            </li>
                                        )
                                    })

                                }

                            </ul>
                            <a href="#" className="morecate-btn"><i className="uil uil-apps"></i>More Categories</a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CategoryModalUser;
