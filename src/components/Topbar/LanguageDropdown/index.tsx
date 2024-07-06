import { useState } from 'react'

// assets

import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// get the languages and flags
const Languages = [
	{
		name: 'All',
	},
	{
		name: 'English',
	},
	{
		name: 'Sinhala',		
	},
	
]

const LanguageDropdown = () => {
	const enLang = Languages[0] || {}
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)

	/**
	 * toggle language dropdown
	 */

	const toggleDropDown = () => {
		setDropDownOpen(!dropDownOpen)
	}

	return (
		<>
			<Dropdown show={dropDownOpen} onToggle={toggleDropDown}>
				<Dropdown.Toggle
					className="nav-link dropdown-toggle arrow-none"
					as="a"
					role="button"
					onClick={toggleDropDown}
				>
					<span className="align-middle d-none d-lg-inline-block">
						{enLang.name}
					</span>
					<i className="ri-arrow-down-s-line d-none d-sm-inline-block align-middle" />
				</Dropdown.Toggle>

				<Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated">
					{(Languages || []).map((lang, idx) => {
						return (
							<Link to="#" className="dropdown-item" key={idx + '-lang'}>
								<span className="align-middle">{lang.name}</span>
							</Link>
						)
					})}
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}

export default LanguageDropdown
