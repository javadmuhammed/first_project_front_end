import React from 'react'
import CategoryImage from '../../assets/images/category/icon-1.svg'
import { const_data } from '../../CONST/const_data'
import { useDispatch } from 'react-redux'
import { productSearchAction } from '../../redux/slice/ProductSearching'
import { useNavigate } from 'react-router-dom'

function CategoryHomeItem({ title, name, id, image }) {

    let dispatch = useDispatch();
    let navigate = useNavigate()

    let onCategoryItemClick = () => {
        dispatch(productSearchAction.setCategory({ category: [id] }))
        navigate("/product_searching")
    }

    return (

        <div class="item">
            <span type="button" onClick={onCategoryItemClick} class="category-item">
                <div class="cate-img">
                    <img width={'100%'} src={const_data.public_image_url + "/" + image} alt="" />
                </div>
                <h4>{title}</h4>
            </span>
        </div>
    )
}

export default CategoryHomeItem
