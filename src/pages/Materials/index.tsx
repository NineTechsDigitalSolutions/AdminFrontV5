import {
	Button,
	Card,
	Col,
	Row,
	Collapse as BootstrapCollapse,
	Modal,
	// ModalBody,
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
import {
	useCreateMaterialMutation,
	useDeleteMaterialMutation,
	useGetAllMaterialQuery,
	useUpdateMaterialMutation,
} from '@/api/materialSlice'
import { toast } from 'react-toastify'

const columns: ReadonlyArray<Column> = [
	{
		Header: 'Sr No',
		accessor: 'srNo',
		defaultCanSort: true,
	},
	{
		Header: 'image',
		accessor: 'name',
		defaultCanSort: true,
	},
	{
		Header: 'Book Name',
		accessor: 'bookname',
		defaultCanSort: false,
	},
	{
		Header: 'Author',
		accessor: 'author',
		defaultCanSort: true,
	},
	{
		Header: 'Category Name',
		accessor: 'Category Name',
		defaultCanSort: true,
	},
	{
		Header: 'Book Type',
		accessor: 'Book Type',
		defaultCanSort: true,
	},
	{
		Header: 'View Library',
		accessor: 'View Library',
		defaultCanSort: true,
	},
	{
		Header: 'View Frequency',
		accessor: 'View Frequency',
		defaultCanSort: true,
	},
	{
		Header: 'Action',
		accessor: 'action',
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

const Materials = () => {
	const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
	const { data: GetAllMaterial, refetch } = useGetAllMaterialQuery(undefined)
	const [UpdateMaterial] = useUpdateMaterialMutation(undefined)
	const [DeletedMaterial] = useDeleteMaterialMutation(undefined)
	const [isStandardOpen, toggleStandard] = useToggle()
	const [materialId, setMaterialId] = useState<string>('')
	const [materialName, setMaterialName] = useState<string>('')

	const toggle = () => setIsOpenFilter(!isOpenFilter)

	const materialUpdate = async () => {
		try {
			const res: any = await UpdateMaterial({
				id: materialId,
				name: materialName,
			}).unwrap()
			if (res) {
				toast.success('Material Updated')
			}
		} catch (error) {
			toast.error('Something went wrong!')
		}
		refetch()
		toggleStandard()
	}
	const materialDelete = async () => {
		const res = await DeletedMaterial({ id: materialId }).unwrap()
		if (res) {
			toast.success('Material Deleted!')
		} else {
			toast.error('Something went wrong!')
		}
		refetch()
		toggleStandard()
	}

	return (
		<>
			<PageBreadcrumb title="Materials" subName="Tables" />
			<Modal show={isStandardOpen} onHide={toggleStandard}>
				<Modal.Header onHide={toggleStandard} closeButton>
					<Modal.Title as="h4">Materials edit</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormInput
						label="Materials"
						type="text"
						name="categoryName"
						containerClass="mb-3"
						key="text"
						defaultValue={materialName}
						onChange={(e) => setMaterialName(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={toggleStandard}>
						Close
					</Button>
					<Button variant="primary" onClick={materialDelete}>
						Delete
					</Button>
					<Button variant="primary" onClick={materialUpdate}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<div className="my-2 d-flex justify-content-between">
								<Button className="btn-outline-purple" onClick={toggle}>
									<i className="ri-equalizer-line me-1" /> Filter
								</Button>
								<ToggleBetweenModals refetch={refetch} />
							</div>
						</Card.Header>
						<Card.Body>
							<BootstrapCollapse in={isOpenFilter}>
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
							{(GetAllMaterial || []).map((material: any) => (
								<Button
									className="btn-outline-purple m-1"
									onClick={() => {
										toggleStandard()
										setMaterialId(material._id)
										setMaterialName(material.name)
									}}>
									{material.name}
								</Button>
							))}
						</Card.Body>

						<Card.Body>
							<Table<Employee>
								columns={columns}
								data={employeeRecords}
								pageSize={5}
								sizePerPageList={sizePerPageList}
								isSortable={true}
								pagination={true}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Materials

const ToggleBetweenModals = (refetch: any) => {
	const [isOpen, toggleModal] = useToggle()
	const [isNextOpen, toggleNextModal] = useToggle()
	const [CreateMaterial] = useCreateMaterialMutation()
	const [isMaterialsOpen, toggleMaterialsModal] = useToggle()
	const [isNext2Open, toggleNext2Modal] = useToggle()

	const [name, setName] = useState<String>('')
	console.log(name)

	const materialsCreate = async () => {
		if (!name) {
			toast.error('Please enter name')
			return
		}
		try {
			const res = await CreateMaterial({ name }).unwrap()
			if (res) {
				toast.success('Material Created')
			}
			refetch()
		} catch (error) {
			toast.error('Something went wrong! Material not created')
		}
	}
	return (
		<>
			<div>
				<Button variant="info m-2" onClick={toggleModal}>
					<i className="bi bi-plus-lg" /> <span>Add New E-Book</span>
				</Button>
				<Button variant="info" onClick={toggleMaterialsModal}>
					<i className="bi bi-plus-lg" /> <span>Add Materials</span>
				</Button>
			</div>

			<Modal
				className="fade"
				size="lg"
				show={isMaterialsOpen}
				onHide={toggleMaterialsModal}
				centered>
				<Modal.Header closeButton>
					<h5 className="modal-title">Material </h5>
				</Modal.Header>
				<Modal.Body className="modal-body">
					<FormInput
						label="Name"
						type="text"
						name="name"
						onChange={(e) => setName(e.target.value)}
						containerClass="mb-3"
						key="text"
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							materialsCreate()
						}}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>

			{/* 1st model  */}
			<Modal
				className="fade"
				size="lg"
				show={isOpen}
				onHide={toggleModal}
				centered>
				<Modal.Header closeButton>
					<h5 className="modal-title">Modal 1</h5>
				</Modal.Header>
				<Modal.Body className="modal-body">
					<FormInput
						label="Name"
						type="text"
						name="name"
						containerClass="mb-3"
						key="text"
					/>
					<FormInput
						name="select"
						label="Written By"
						type="select"
						containerClass="mb-3"
						className="form-select"
						key="select">
						<option defaultValue="selected">1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</FormInput>
					<FormInput
						name="select"
						label="Translated By"
						type="select"
						containerClass="mb-3"
						className="form-select"
						key="select">
						<option defaultValue="selected">1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</FormInput>
					<FormInput
						label="Publisher"
						type="text"
						name="address"
						containerClass="mb-3"
						key="text"
					/>
					<FormInput
						label="Year Of Printed"
						type="text"
						name="address"
						containerClass="mb-3"
						key="text"
					/>
					<FormInput
						label="First Publisher (Optional)"
						type="text"
						name="address"
						containerClass="mb-3"
						key="text"
					/>
					<FormInput
						label="First Printed Year (optional)"
						type="date"
						name="First Printed Year"
						containerClass="mb-3"
						key="text"
					/>
					<FormInput
						label="ISBN"
						type="text"
						name="address"
						containerClass="mb-3"
						key="text"
					/>
					<FormInput
						label="Description"
						type="text"
						name="address"
						containerClass="mb-3"
						key="text"
					/>
					<FormInput
						label="Address"
						type="text"
						name="address"
						containerClass="mb-3"
						key="text"
					/>
					<FormInput
						label="Address"
						type="text"
						name="address"
						containerClass="mb-3"
						key="text"
					/>
					<FormInput
						label="Address"
						type="text"
						name="address"
						containerClass="mb-3"
						key="text"
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							toggleModal()
							toggleNextModal()
						}}>
						Next
					</Button>
				</Modal.Footer>
			</Modal>
			{/* 2st model  */}
			<Modal
				className="fade"
				size="lg"
				show={isNextOpen}
				onHide={toggleNextModal}
				centered>
				<Modal.Header closeButton>
					<h5 className="modal-title">Modal 2</h5>
				</Modal.Header>
				<Modal.Body>
					Hide this modal and show the first with the button below.
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							toggleNextModal()
							toggleNext2Modal()
						}}>
						Next
					</Button>
				</Modal.Footer>
			</Modal>
			{/* 3st model  */}
			<Modal
				className="fade"
				size="lg"
				show={isNext2Open}
				onHide={toggleNext2Modal}
				centered>
				<Modal.Header closeButton>
					<h5 className="modal-title">Modal 2</h5>
				</Modal.Header>
				<Modal.Body>
					Hide this modal and show the first with the button below.
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							toggleNext2Modal()
						}}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
