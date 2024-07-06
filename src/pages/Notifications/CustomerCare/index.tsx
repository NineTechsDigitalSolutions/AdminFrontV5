import {
	Card,
	Col,
	Row,
} from 'react-bootstrap'



//dummy data
import { employeeRecords } from './data'
import { Column } from 'react-table'
import { Employee } from './types'

// components
import {  PageSize, Table } from '@/components'
import { PageBreadcrumb } from '@/components'


const columns: ReadonlyArray<Column> = [
	{
		Header: 'Sr No',
		accessor: 'srNo',
		defaultCanSort: true,
	},
	{
		Header: 'User Name',
		accessor: 'name',
		defaultCanSort: true,
	},
	{
		Header: 'Email',
		accessor: 'Email',
		defaultCanSort: false,
	},
	{
		Header: 'Query',
		accessor: 'Query',
		defaultCanSort: true,
	},
	{
		Header: 'Action',
		accessor: 'Action',
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

const CustomerCare = () => {
	// const [isOpen, setIsOpen] = useState<boolean>(false)
	// const toggle = () => setIsOpen(!isOpen)
	return (
		<>
			<PageBreadcrumb title="Customer Care" subName="Notifications" />
			<Row>
				<Col>
					<Card>
						{/* <Card.Header>
							<div className="my-2 d-flex justify-content-between">
								<Button variant="info">
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
						</Card.Body> */}

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

export default CustomerCare
