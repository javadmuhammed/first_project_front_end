import React, { useEffect, useState } from 'react'
import SectionComponent from '../Section/SectionComponent'
import SliderComponent from '../Slider/SliderComponent'
import instance from '../../axios/instance'
import { const_data } from '../../CONST/const_data'
import ProductItem from './ProductItem'

function ProductSection(props) {

    let [productData, setProductsData] = useState([]);


    useEffect(() => {

        let options = props.product_endpoint;
        let urlEndPoint = const_data.API_ENDPOINT.get_product_option + "/" + options + "/10";
        instance.get(urlEndPoint).then((data) => {
            if (data?.data?.product) {
                setProductsData(data?.data?.product)
                console.log(data?.data?.product)
            }
        })
    }, [])


    useEffect(() => {
        console.log(productData)
    }, [productData])


    return (
        <>
            {
                productData.length <= 0 ? null : (
                    <SectionComponent subhead={props.subhead} mainhead={props.mainhead} >

                        <SliderComponent settings={props.settings}>

                            {
                                productData.map((items) => {
                                    return (
                                        <ProductItem   key={items._id} product_image={const_data.public_image_url + "/" + items.images[0]} stock={items.stock} _id={items._id} title={items.name} sale_price={items.sale_price} original_price={items.original_price} />
                                    )
                                })
                            }


                        </SliderComponent>
                    </SectionComponent >
                )

            }
        </>


    )
}

export default ProductSection
