import {
	Button,
	Card,
	Col,
	Row,
	Collapse as BootstrapCollapse,
	Modal,
} from 'react-bootstrap'

// css
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'

//dummy data
import { employeeRecords } from './data'
import { Column } from 'react-table'
import { Employee } from './types'

// components
import { FormInput, PageSize, Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import { useState } from 'react'
import { DateRangePicker } from 'rsuite'
import { useToggle } from '@/hooks'

import { toast } from 'react-toastify'
import {
	useCreateLibrarianMutation,
	useGetAllLibrarianQuery,
} from '@/api/librariansSlice'
// import Select from 'react-select'

const columns: ReadonlyArray<Column> = [
	{
		Header: 'Name',
		accessor: 'firstName',
		defaultCanSort: false,
	},
	{
		Header: 'NIC',
		accessor: 'nic',
		defaultCanSort: true,
	},
	{
		Header: 'Contact No',
		accessor: 'phone',
		defaultCanSort: false,
	},
	{
		Header: 'Email',
		accessor: 'email',
		defaultCanSort: false,
	},
	{
		Header: 'Address',
		accessor: 'address',
		defaultCanSort: false,
	},
]

const sizePerPageList: PageSize[] = [
	{
		text: '5',
		value: 5,
	},
	{
		text: '10',
		value: 10,
	},
	{
		text: '25',
		value: 25,
	},
	{
		text: 'All',
		value: employeeRecords.length,
	},
]

const Librarians = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggle = () => setIsOpen(!isOpen)
	const [isStandardOpen, toggleStandard] = useToggle()
	// const [inputValue, setInputValue] = useState('')

	const [firstName, setFirstName] = useState<String>('')
	const [lastName, setLastName] = useState<String>('')
	const [nic, setNic] = useState<String>('')
	const [address, setAddress] = useState<String>('')
	const [phone, setPhone] = useState<String>('')
	const [email, setEmail] = useState<String>('')
	const [password, setPassword] = useState<String>('')
	// const [isActive, setIsActive] = useState<Boolean>(true)

	const [CreateLibrarian] = useCreateLibrarianMutation()
	const {
		data: Librarians,
		isLoading,
		refetch,
	} = useGetAllLibrarianQuery(undefined)

	const CreateLib = async () => {
		if (
			!firstName ||
			!lastName ||
			!nic ||
			!address ||
			!phone ||
			!email ||
			!password
		) {
			toast.error('Please enter all fields')
			return
		}

		try {
			const res: any = await CreateLibrarian({
				firstName,
				lastName,
				nic,
				address,
				phone,
				email,
				password,
			}).unwrap()

			if (res.message === 'Librarian Registered Succesfully') {
				toast.success('Librarian Registered Succesfully')
			} else {
				toast.error(res.message)
			}
		} catch (err) {
			console.log(err)
			toast.error('Something Wrong')
		}
		refetch()
		toggleStandard()
	}

	return (
		<>
			<Modal show={isStandardOpen} onHide={toggleStandard}>
				<Modal.Header onHide={toggleStandard} closeButton>
					<Modal.Title as="h4">Add New Reader</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormInput
						label="First Name"
						type="text"
						name="firstName"
						containerClass="mb-3"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<FormInput
						label="Last Name"
						type="text"
						name="lastName"
						containerClass="mb-3"
						onChange={(e) => setLastName(e.target.value)}
					/>
					<FormInput
						label="NIC"
						type="text"
						name="nic"
						containerClass="mb-3"
						onChange={(e) => setNic(e.target.value)}
					/>
					<FormInput
						label="Address"
						type="text"
						name="address"
						containerClass="mb-3"
						onChange={(e) => setAddress(e.target.value)}
					/>
					<FormInput
						label="Contact Number"
						type="text"
						name="contactNumber"
						containerClass="mb-3"
						onChange={(e) => setPhone(e.target.value)}
					/>
					<FormInput
						label="Email"
						type="text"
						name="text"
						containerClass="mb-3"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<FormInput
						label="Password"
						type="text"
						name="text"
						containerClass="mb-3"
						key="text"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{/* <Select
						options={[
							{ value: 'active', label: 'Active' },
							{ value: 'inactive', label: 'Inactive' },
						]}
						value={
							isActive
								? { value: 'active', label: 'Active' }
								: { value: 'inactive', label: 'Inactive' }
						}
						onChange={(e) => setIsActive(e?.value === 'active')}
					/> */}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={toggleStandard}>
						Close
					</Button>
					<Button variant="primary" onClick={CreateLib}>
						Create Librarian
					</Button>
				</Modal.Footer>
			</Modal>
			<PageBreadcrumb title="Librarians" subName="Tables" />
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<div className="my-2 d-flex justify-content-between">
								<Button variant="info" onClick={toggleStandard}>
									<i className="bi bi-plus-lg" /> <span>Add New</span>
								</Button>
								<div className="d-flex gap-1">
									<Button variant="purple">
										<i className="ri-server-line me-1" /> <span>All</span>
									</Button>
									<Button className="btn-outline-primary">
										<i className="ri-server-line me-1" /> <span>Active</span>
									</Button>
									<Button className="btn-outline-danger">
										<i className="ri-server-line me-1" /> <span>Inactive</span>
									</Button>
								</div>
							</div>
							<Button className="btn-outline-purple" onClick={toggle}>
								<i className="ri-equalizer-line me-1" /> Filter
							</Button>
						</Card.Header>
						<Card.Body>
							<BootstrapCollapse in={isOpen}>
								<div>
									<Row>
										<Col lg={4}>
											<FormInput
												label="Search Name"
												type="text"
												name="text"
												containerClass="mb-3"
												key="text"
											/>
										</Col>

										<Col lg={4}>
											<div className="mb-3">
												<label className="form-label d-block">Date Range</label>
												<DateRangePicker
													className="w-100"
													appearance="default"
													defaultValue={[new Date(), new Date()]}
												/>
											</div>
										</Col>
									</Row>
								</div>
							</BootstrapCollapse>
						</Card.Body>

						<Card.Body>
							{!isLoading && (
								<Table<Employee>
									columns={columns}
									data={Librarians || []}
									pageSize={5}
									sizePerPageList={sizePerPageList}
									isSortable={true}
									pagination={true}
								/>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Librarians
