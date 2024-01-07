import React, { Fragment } from 'react'
import TopHeader from './TopHeader';
import SubHeader from './SubHeader';
 

function UserHeader() {


	
	return (
		<Fragment>
 			
			<header className="header clearfix">
				<TopHeader />
				<SubHeader />
			</header>
		</Fragment>
	)
}

export default UserHeader
