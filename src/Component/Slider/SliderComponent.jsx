import Slider from '@ant-design/react-slick';
import React from 'react'  

function SliderComponent(props) { 
    
 
    return (
        <Slider  {...props.settings} >
            {
                props.children
            }
        </Slider>
    );
}

export default SliderComponent
