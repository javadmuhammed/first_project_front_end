import React, { Fragment, useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import UserHeader from '../Header/UserHeader'
import LoadingSpinner from '../../Util/ElementRelated/LoadingSpinner'




function UserLayout(props) {

  let [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    setIsSpinning(false);
  }, [])


  return (
    <Fragment>

      {
        isSpinning ? <LoadingSpinner isShow={true}></LoadingSpinner> : (
          <Fragment>
            <UserHeader></UserHeader>
            <div class="wrapper ">
              {props.children}
            </div>

            <Footer></Footer>
          </Fragment>
        )
      }



    </Fragment>
  )
}

export default UserLayout
