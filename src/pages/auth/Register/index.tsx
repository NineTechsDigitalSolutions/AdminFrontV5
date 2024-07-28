import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
import AuthLayout from '../AuthLayout'
import { Link } from 'react-router-dom'
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import useRegister from './useRegister'

// Components
import { FormInput, PageBreadcrumb } from '@/components'
import axios from 'axios'

// interface UserData {
// 	firstName: string
// 	lastName: string
// 	email: string
// 	password: string
// }
const BottomLink = () => {
	return (
		<Row>
			<Col xs={12} className="text-center">
				<p className="text-dark-emphasis">
					Already have account?{' '}
					<Link
						to="/auth/login"
						className="text-dark fw-bold ms-1 link-offset-3 text-decoration-underline">
						<b>Log In</b>
					</Link>
				</p>
			</Col>
		</Row>
	)
}
const Register = () => {
	const navigate = useNavigate()
	// const { loading, register } = useRegister()
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	})

	/*
	 * form validation schema
	 */
	// const schemaResolver = yupResolver(
	// 	yup.object().shape({
	// 		firstName: yup.string().required('Please enter First name'),
	// 		lastName: yup.string().required('Please enter Last name'),
	// 		email: yup
	// 			.string()
	// 			.required('Please enter Email')
	// 			.email('Please enter valid Email'),
	// 		password: yup.string().required('Please enter Password'),
	// 	})
	// )
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			console.log('Form data:', data)
			const url = 'http://localhost:5002/api/users/register'
			const { data: res } = await axios.post(url, data)
			navigate('/')
			console.log(res.message)
		} catch (error) {}
	}
	return (
		<>
			<PageBreadcrumb title="Register" />
			<AuthLayout
				authTitle="Free Sign Up"
				helpText="Enter your email address and password to access account."
				bottomLinks={<BottomLink />}
				hasThirdPartyLogin>
				<form onSubmit={handleSubmit}>
					<FormInput
						label="First Name"
						type="text"
						value={data.firstName}
						onChange={handleChange}
						name="firstName"
						placeholder="Enter your name"
						containerClass="mb-3"
						required
					/>

					<FormInput
						label="Last Name"
						type="text"
						value={data.lastName}
						onChange={handleChange}
						name="lastName"
						placeholder="Enter your name"
						containerClass="mb-3"
						required
					/>

					<FormInput
						label="Email address"
						type="text"
						value={data.email}
						onChange={handleChange}
						name="email"
						placeholder="Enter your email"
						containerClass="mb-3"
						required
					/>

					<FormInput
						label="Password"
						type="password"
						value={data.password}
						onChange={handleChange}
						name="password"
						placeholder="Enter your password"
						containerClass="mb-3"
					/>
					<FormInput
						isTerms={true}
						type="checkbox"
						name="checkbox"
						containerClass={'mb-3'}
					/>
					<div className="mb-0 d-grid text-center">
						<Button
							variant="primary"
							// disabled={loading}
							className="fw-semibold"
							type="submit">
							Sign Up
						</Button>
					</div>
				</form>
			</AuthLayout>
		</>
	)
}

export default Register
