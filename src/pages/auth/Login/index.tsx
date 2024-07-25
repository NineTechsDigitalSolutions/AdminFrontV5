import { Button, Col, Row } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthLayout from '../AuthLayout'

// components
import { VerticalForm, FormInput, PageBreadcrumb } from '@/components'
// import { useLoginMutation } from '@/api/authSlice'
import { useState } from 'react'
// import { toast } from 'react-toastify'
// import { useSelector } from 'react-redux'
// import { setUser } from '@/features/authSlice'
import axios from 'axios'

interface UserData {
	email: string
	password: string
}

const BottomLinks = () => {
	return (
		<Row>
			<Col xs={12} className="text-center">
				<p className="text-dark-emphasis">
					Don't have an account?{' '}
					<Link
						to="/auth/register"
						className="text-dark fw-bold ms-1 link-offset-3 text-decoration-underline">
						<b>Sign up</b>
					</Link>
				</p>
			</Col>
		</Row>
	)
}
const schemaResolver = yupResolver(
	yup.object().shape({
		email: yup.string().required('Please enter Username'),
		password: yup.string().required('Please enter Password'),
	})
)
const Login = () => {
	// const dispatch = useDispatch()
	const navigate = useNavigate()

	const [data, setData] = useState({
		email: '',
		password: '',
	})

	const user = localStorage.getItem('token') || ''

	// const [email, setEmail] = useState('user@gmail.com')
	// const [password, setPassword] = useState('12345678')
	// const [login, { isLoading }] = useLoginMutation()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setData({ ...data, [name]: value })
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		try {
			console.log('Form data:', data)
			const url = 'http://13.215.35.0:5002/api/auth/librarian/login'
			const { data: res } = await axios.post(url, data)
			localStorage.setItem('token', res.token)
			localStorage.setItem('email', res.email)
			navigate('/dashboard')
			console.log(res.message)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<PageBreadcrumb title="Log In" />

			{user !== '' && <Navigate to="/dashboard" replace />}

			<AuthLayout
				authTitle="Sign In"
				helpText="Enter your email address and password to access account."
				bottomLinks={<BottomLinks />}
				hasThirdPartyLogin>
				<VerticalForm<UserData>
					onSubmit={handleSubmit}
					resolver={schemaResolver}>
					<FormInput
						label="Email address"
						type="text"
						name="email"
						placeholder="Enter your email"
						containerClass="mb-3"
						onChange={handleChange}
						value={data.email}
						required
					/>
					<FormInput
						label="Password"
						type="Password"
						name="password"
						placeholder="Enter your Password"
						containerClass="mb-3"
						onChange={handleChange}
						value={data.password}
						required
					/>
					{/* <FormInput
						label="Password"
						name="password"
						type="password"
						required
						id="password"
						placeholder="Enter your password"
						containerClass="mb-3"
						onChange={(e) => setPassword(e.target.value)}
						defaultValue={password}>
						<Link to="/auth/forgot-password" className="text-muted float-end">
							<small>Forgot your password?</small>
						</Link>
					</FormInput> */}
					<FormInput
						label="Remember me"
						type="checkbox"
						name="checkbox"
						containerClass={'mb-3'}
					/>
					<div className="mb-0 text-start">
						<Button
							variant="soft-primary"
							className="w-100"
							type="submit"
							// disabled={loading}
							onClick={handleSubmit}>
							{/* {isLoading ? (
								<Spinner size="sm" className="me-1" />
							) : (
								<i className="ri-login-circle-fill me-1" />
							)} */}
							<>
								<span className="fw-bold">Log In</span>
							</>
						</Button>
					</div>
				</VerticalForm>
			</AuthLayout>
		</>
	)
}

export default Login
