import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthLayout from '../AuthLayout'

// components
import { VerticalForm, FormInput, PageBreadcrumb } from '@/components'
import { useLoginMutation } from '@/api/authSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/features/authSlice'


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
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state:any)=>state.auth?.userInfo?.token)
	
	const [email, setEmail] = useState('user@gmail.com')
	const [password, setPassword] = useState('12345678')
	const [login, { isLoading }] = useLoginMutation()


	const submitHandler = async () => {
		if (!email || !password) {
			toast.error('Please fill in all fields')
			return
		}
		try {
			const res: any = await login({ email, password })
			if (res?.data?.token) {
				toast.success(res?.data?.message)
				console.log(res.data.user)

				dispatch(setUser({token:res?.data?.token,userInfo:res?.data}))
				navigate("/", { replace: true });
			}
			else if (res?.error) {
				toast.error(res?.error?.data?.message)
			} 
		} catch (error) {
			toast.error('Something went wrong')
			console.log('Error', error)
		}
	}

	return (
		<>
			<PageBreadcrumb title="Log In" />

			{user && <Navigate to="/" replace />}

			<AuthLayout
				authTitle="Sign In"
				helpText="Enter your email address and password to access account."
				bottomLinks={<BottomLinks />}
				hasThirdPartyLogin>
				<VerticalForm<UserData>
					onSubmit={submitHandler}
					resolver={schemaResolver}
					>
					<FormInput
						label="Email address"
						type="text"
						name="email"
						placeholder="Enter your email"
						containerClass="mb-3"
						onChange={(e) => setEmail(e.target.value)}
						defaultValue={email}
						required
					/>
					<FormInput
						label="Password"
						type="Password"
						name="Password"
						placeholder="Enter your Password"
						containerClass="mb-3"
						onChange={(e) => setPassword(e.target.value)}
						defaultValue={password}
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
							onClick={submitHandler}>
							{isLoading ? (
								<Spinner size="sm" className='me-1'/>
							) : <i className="ri-login-circle-fill me-1" />}
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
