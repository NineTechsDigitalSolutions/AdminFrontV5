import { Link } from 'react-router-dom'

//images
import logo from '@/assets/images/logo.jpg'
// import logoDark from '@/assets/images/logo-dark.png'
// import logoSm from '@/assets/images/logo-sm.png'
import { getMenuItems } from '@/common'
import AppMenu from './Menu'
import SimpleBar from 'simplebar-react'

/* Sidebar content */
const SideBarContent = () => {
	return (
		<>
			<AppMenu menuItems={getMenuItems()} />
			<div className="clearfix" />
		</>
	)
}
const LeftSidebar = () => {
	return (
		<>
			<div className="leftside-menu">
				{/* Brand Logo Light */}
				<Link to="/dashboard" className="logo logo-light">
					<span className="	">
						<img src={logo} alt="logo" width={100} height={100} />
					</span>
					<span className="logo-sm">
						<img src={logo} alt="small logo" />
					</span>
				</Link>
				{/* Brand Logo Dark */}
				<a href="index.html" className="logo logo-dark">
					<span className="logo-lg">
						<img src={logo} alt="dark logo" />
					</span>
					<span className="logo-sm">
						<img src={logo} alt="small logo" />
					</span>
				</a>
				{/* Sidebar -left */}
				<SimpleBar
					className="h-100"
					id="leftside-menu-container"
					data-simplebar="">
					{/*- Sidemenu */}
					<SideBarContent />
					{/*- End Sidemenu */}
					<div className="clearfix" />
				</SimpleBar>
			</div>
		</>
	)
}

export default LeftSidebar
