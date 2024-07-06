import { Button, Card, Col, Row } from 'react-bootstrap'

// css
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'

//dummy data
import { employeeRecords } from './data'
import { Column } from 'react-table'
import { Employee } from './types'

// components
import { PageSize, Table } from '@/components'
import { PageBreadcrumb } from '@/components'

const columns: ReadonlyArray<Column> = [
	{
		Header: 'Sr No',
		accessor: 'srNo',
		defaultCanSort: true,
	},
	{
		Header: 'Transaction Date',
		accessor: 'name',
		defaultCanSort: true,
	},
	{
		Header: 'Reader Name',
		accessor: 'Reader Name',
		defaultCanSort: false,
	},
	{
		Header: 'Total Amount',
		accessor: 'Total Amount',
		defaultCanSort: true,
	},
	{
		Header: 'Payment Type',
		accessor: 'Payment Type',
		defaultCanSort: false,
	},
	{
		Header: 'Payment Status',
		accessor: 'Payment Status',
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

const Sales = () => {
	return (
		<>
			<PageBreadcrumb title="Sales" subName="Sales" />
			<div></div>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Button variant="info m-2">
								<i className="bi bi-plus-lg" /> <span>Sales</span>
							</Button>
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

export default Sales
