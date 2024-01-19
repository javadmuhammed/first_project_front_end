import React from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import CartUserOverCanvas from '../../../Component/OverLay/CartUserOverCanvas'
import CategoryModalUser from '../../../Component/OverLay/CategoryModalUser'
import CartEmpty from '../../../Component/Cart/CartEmpty'
import LoadingSpinner from '../../../Component/Util/ElementRelated/LoadingSpinner'
import Button1 from '../../../Component/Util/Buttons/Button1'
import { useNavigate } from 'react-router-dom'


function Error404() {


   let navigate = useNavigate();
   function renderHome()
   {
      navigate("/")
   }
   
   return (

      <div className="container ">
         <div className='cartEmpty' style={{ backgroundColor: "white", height: "100vh" }}>
            <img width={"200px"} src="assets/images/error-404.png" alt="" srcset="" />
            <h2>Page not found!</h2>
            <p>Unfortunately the page you are looking for has been moved or deleted</p>
            <div>
               <Button1 element_type="button" onClick={renderHome}  title="GO TO HOMEPAGE" />
            </div>
         </div>
      </div>
   )
}

export default Error404
