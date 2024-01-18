import React, { Fragment, useEffect, useRef, useState } from 'react';
import Image from '../../assets/images/category/icon-1.svg'
import Image2 from '../../assets/images/category/icon-2.svg'
import CategoryModalItem from '../CategoryRelated/CategoryModalItem';
import { getAllCategoryEndPoint } from '../../API/api_request';
import CategoryHomeItem from '../CategoryRelated/CategoryHomeItem';
import { Link } from 'react-router-dom';

function CategoryModalUser() {

    let closeRef = useRef();

    let [categoryModalItems, categoryModalItemUpdate] = useState([]);

    useEffect(() => {
        getAllCategoryEndPoint().then((data) => {
            let response = data?.data;
            console.log(response)
            if (response?.status) {
                let categorys = response?.categorys?.slice(0, 9);
                categoryModalItemUpdate(categorys)
            }
        }).catch((err) => { })
    }, [])


    function onItemSelect() {
        closeRef.current.click()
    }

    return (
        <Fragment>
            <div id="category_model" className="header-cate-model main-gambo-model modal fade" tabIndex="-1" role="dialog" aria-modal="false">
                <div className="modal-dialog category-area" role="document">
                    <div className="category-area-inner">
                        <div className="modal-header">
                            <button ref={closeRef} type="button" className="close btn-close" data-dismiss="modal" aria-label="Close">
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
                                                {/* <CategoryHomeItem id={"123"} image={categoryItem?.image} name={"Name"} title={"Hello"}></CategoryHomeItem> */}
                                                <CategoryModalItem onSelect={onItemSelect} _id={categoryItem?._id} image={categoryItem.image} title={categoryItem.name} />
                                            </li>
                                        )
                                    })

                                }

                            </ul>
                            <Link to="/category_list" className="morecate-btn"><i className="uil uil-apps"></i>More Categories</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CategoryModalUser;
