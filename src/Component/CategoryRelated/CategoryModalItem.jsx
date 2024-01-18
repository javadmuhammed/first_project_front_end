import React, { Fragment } from 'react'
import { const_data } from '../../CONST/const_data'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productSearchAction } from '../../redux/slice/ProductSearching';

function CategoryModalItem(props) {


    let dispatch = useDispatch();
    let navigate = useNavigate()


    function onItemClick() { 
        dispatch(productSearchAction.setCategory({ category: [props._id] }))
        navigate("/product_searching")
        props?.onSelect();
    }

    return (
        <Fragment>
            <span onClick={onItemClick} className="single-cat-item">
                <div className="icon">
                    <img src={const_data.public_image_url + "/" + props.image} alt="" />
                </div>
                <div className="text"> {props.title} </div>
            </span>
        </Fragment>
    )
}

export default CategoryModalItem
