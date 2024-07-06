import {
	Button,
	Card,
	Col,
	Row,
	Collapse as BootstrapCollapse,
	Form,
	Modal,
	Table,
} from 'react-bootstrap'

// css
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'

// components
import { FormInput } from '@/components'
import { PageBreadcrumb } from '@/components'
import { useState } from 'react'
import { DateRangePicker } from 'rsuite'
import { useToggle } from '@/hooks'
import {
	useCategoryAllGetQuery,
	useCategoryCreateMutation,
	useCategoryDeleteMutation,
	useCategoryUpdateMutation,
	useSubCategoryAllGetQuery,
	useSubCategoryCreateMutation,
	useSubCategoryDeleteMutation,
	useSubCategoryUpdateMutation,
} from '@/api/categorySlice'
import { toast } from 'react-toastify'

const Categories = () => {
	const [category, setCategory] = useState<String>()
	const [subCategory, setSubCategory] = useState<String>()
	const [categoryId, setCategoryId] = useState<String>()
	const [updateCategoryId, setUpdateCategoryId] = useState<String>('')
	const [updateCategoryName, setUpdateCategoryName] = useState<String>('')

	const [updateSubCategoryId, setUpdateSubCategoryId] = useState<String>('')
	const [updateSubCategoryName, setUpdateSubCategoryName] = useState<String>('')
	const [updateSubCategoryParentCategory, setUpdateSubCategoryParentCategory] =
		useState<String>('')
	const [isOpen, setIsOpen] = useState<boolean>(false)
	// const [isOpenDeleteUpdate, setIsOpenDeleteUpdate] = useState<boolean>(false)
	const toggle = () => setIsOpen(!isOpen)

	const {
		data: CategoryAll,
		refetch: categoryRefetch,
		isLoading: categoryLoading,
	} = useCategoryAllGetQuery(undefined)

	const [categoryCreate] = useCategoryCreateMutation()
	const [subCategoryAdd] = useSubCategoryCreateMutation()
	const [CategoryUpdate] = useCategoryUpdateMutation()
	const [SubCategoryUpdate] = useSubCategoryUpdateMutation()
	const [deleteSubCategory] = useSubCategoryDeleteMutation()
	const [subCategoryModalOpen, setSubCategoryModalOpen] =
		useState<boolean>(false)


	const { data: SubCategoryAll, refetch: subCategoryRefetch } =   useSubCategoryAllGetQuery(undefined)

	const [CategoryDel] = useCategoryDeleteMutation()
	const [isStandardOpen, toggleStandard] = useToggle()
	const [isDeleteUpdateOpen, toggleDeleteUpdate] = useToggle()
	const [isSubCatDeleteUpdateOpen, toggleSubCatDeleteUpdate] = useToggle()

	const categorySave = async () => {
		if (!category) {
			toast.error('Please enter category name')
			return
		}
		try {
			const res = await categoryCreate({ name: category }).unwrap()
			if (res?.message == 'Category Created') {
				toast.success('Category Created!')
			}
		} catch (err) {
			console.log(err)
			toast.error('Something went wrong!')
		}
		toggleStandard()
		categoryRefetch()
		await subCategoryRefetch()
		setCategory('')
	}
	const subCategorySave = async () => {
		if (!categoryId) {
			toast.error('Please Select Category')
			return
		}
		if (!subCategory) {
			toast.error('Please enter sub category name')
			return
		}
		try {
			const res = await subCategoryAdd({
				name: subCategory,
				parentCategory: categoryId,
			}).unwrap()
			if (res?.message == 'Sub Category Created') {
				toast.success('Sub Category Created!')
			}
		} catch (err) {
			console.log(err)
			toast.error('Something went wrong!')
		}
		setSubCategoryModalOpen(false)
		setSubCategory('')
		setCategoryId('')
		await categoryRefetch()
		await subCategoryRefetch()
	}

	const categoryDelete = async (id: String) => {
		try {
			const res = await CategoryDel({ id }).unwrap()
			if (res.message === 'Category deleted') {
				toast.success('Category deleted!')
			}
			await categoryRefetch()
			await subCategoryRefetch()
		} catch (error) {
			toast.error('Something went wrong!')
		}
	}
	const catUpdateModel = async (data: any) => {
		setUpdateCategoryId(data.id)
		setUpdateCategoryName(data.name)
		toggleDeleteUpdate()
	}
	const subCatUpdateModel = async (data: any) => {
		setUpdateSubCategoryId(data.id)
		setUpdateSubCategoryName(data.name)
		setUpdateSubCategoryParentCategory(data.parentCategory)
		toggleSubCatDeleteUpdate()
	}
	const subCatDelete = async () => {
		try {
			const res = await deleteSubCategory({ id: updateSubCategoryId }).unwrap()
			if (res.message === 'Sub category deleted') {
				toast.success('Sub category deleted!')
			}
			await categoryRefetch()
			await subCategoryRefetch()
		} catch (error) {
			toast.error('Something went wrong!')
		}
		toggleSubCatDeleteUpdate()
		setUpdateSubCategoryId('')
		setUpdateSubCategoryName('')
		setUpdateSubCategoryParentCategory('')
	}

	const catUpdate = async () => {
		try {
			const res = await CategoryUpdate({
				id: updateCategoryId,
				name: updateCategoryName,
			}).unwrap()
			if (res.message === 'Category updated') {
				toast.success('Category updated!')
			}
			await categoryRefetch()
			await subCategoryRefetch()
		} catch (error) {
			toast.error('Something went wrong!')
		}
		toggleDeleteUpdate()

		setUpdateCategoryId('')
		setUpdateCategoryName('')
	}
	const subCatUpdate = async () => {
		try {
			const res = await SubCategoryUpdate({
				id: updateSubCategoryId,
				name: updateSubCategoryName,
				parentCategory: updateSubCategoryParentCategory,
			}).unwrap()
			if (res.message === 'Sub category updated') {
				toast.success('Sub Category updated!')
			}
			await categoryRefetch()
			await subCategoryRefetch()
		} catch (error) {
			toast.error('Something went wrong!')
		}
		toggleSubCatDeleteUpdate()
		setUpdateSubCategoryId('')
		setUpdateSubCategoryName('')
		setUpdateSubCategoryParentCategory('')
	}

	return (
		<>
			{/*  category modal  */}
			<Modal show={isStandardOpen} onHide={toggleStandard}>
				<Modal.Header onHide={toggleStandard} closeButton>
					<Modal.Title as="h4">Add New Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormInput
						label="Category Name"
						type="text"
						name="categoryName"
						containerClass="mb-3"
						key="text"
						onChange={(e) => setCategory(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={toggleStandard}>
						Close
					</Button>
					<Button variant="primary" onClick={categorySave}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
			{/*  category modal end */}
			{/* Sub category modal  */}
			<Modal show={subCategoryModalOpen}>
				<Modal.Header>
					<Modal.Title as="h4">Add New Sub Category</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<h6 className="fs-15 mt-3">Category</h6>
					{!categoryLoading ? (
						<Form.Select
							aria-label="Floating label select example"
							onChange={(e) => setCategoryId(e.target.value)}>
							<option defaultValue={''}></option>
							{(CategoryAll || [] ).map((category: any) => (
								<option value={category._id}>{category.name}</option>
							))}
						</Form.Select>
					) : (
						''
					)}

					<FormInput
						label="Sub Category Name"
						type="text"
						name="categoryName"
						containerClass="mb-3"
						key="text"
						onChange={(e) => setSubCategory(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="light"
						onClick={() => setSubCategoryModalOpen(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={subCategorySave}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
			{/* Sub category modal end */}
			<PageBreadcrumb title="Categories" subName="Tables" />
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<div className="my-2 d-flex justify-content-between">
								<Button className="btn-outline-purple" onClick={toggle}>
									<i className="ri-equalizer-line me-1" /> Filter
								</Button>
								<div className="d-flex gap-1">
									<Button variant="info" onClick={toggleStandard}>
										<i className="ri-server-line me-1" />{' '}
										<span>Add Category</span>
									</Button>
									<Button
										variant="info"
										onClick={() =>
											setSubCategoryModalOpen(!subCategoryModalOpen)
										}>
										<i className="ri-server-line me-1" />{' '}
										<span>Add Sub Category</span>
									</Button>
								</div>
							</div>
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
							{!categoryLoading ? (
								<Table className="table-centered mb-0">
									<thead>
										<tr>
											<th>Sr No</th>
											<th>Materials</th>
											<th>Category</th>
											<th>Sub Category</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{(CategoryAll || []).map((record: any, idx: number) => {
											return (
												<tr key={idx}>
													<td>{idx + 1}</td>
													<td>{record.library}</td>
													<td>{record.name}</td>
													<td className="d-flex flex-column">
														{(SubCategoryAll || []).map(
															(sub: any) =>
																record._id === sub.parentCategory && (
																	<Button
																		onClick={() => {
																			subCatUpdateModel({
																				id: sub._id,
																				name: sub.name,
																				parentCategory: sub.parentCategory,
																			})
																		}}
																		variant="light">
																		{sub.name}
																	</Button>
																)
														)}
													</td>
													<td>
														<Button
															variant="light"
															onClick={() => {
																catUpdateModel({
																	id: record._id,
																	name: record.name,
																})
															}}>
															<i className="ri-heart-line" />
														</Button>

														<Button
															className="ms-1"
															onClick={() => categoryDelete(record._id)}
															variant="danger">
															<i className="ri-heart-line" />
														</Button>
													</td>
												</tr>
											)
										})}
									</tbody>
								</Table>
							) : (
								''
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Modal show={isDeleteUpdateOpen} onHide={toggleSubCatDeleteUpdate}>
				<Modal.Header onHide={toggleSubCatDeleteUpdate}>
					<Modal.Title as="h4">Modal Heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormInput
						label="Category"
						type="text"
						name="Category"
						placeholder="Category"
						containerClass="mb-3"
						defaultValue={`${updateCategoryName}`}
						key="placeholder"
						onChange={(e) => setUpdateCategoryName(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={toggleDeleteUpdate}>
						Close
					</Button>
					<Button variant="primary" onClick={catUpdate}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={isSubCatDeleteUpdateOpen} onHide={toggleSubCatDeleteUpdate}>
				<Modal.Header onHide={toggleSubCatDeleteUpdate}>
					<Modal.Title as="h4">Modal Heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormInput
						label="Sub Category"
						type="text"
						name="Category"
						placeholder="Category"
						containerClass="mb-3"
						defaultValue={`${updateSubCategoryName}`}
						key="placeholder"
						onChange={(e) => setUpdateSubCategoryName(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={toggleSubCatDeleteUpdate}>
						Close
					</Button>
					<Button variant="primary" onClick={subCatDelete}>
						Delete
					</Button>
					<Button variant="primary" onClick={subCatUpdate}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Categories
