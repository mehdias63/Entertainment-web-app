'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'

export default function AuthForm() {
	const router = useRouter()
	const [isLogin, setIsLogin] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [message, setMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	})

	useEffect(() => {
		const storedUser = localStorage.getItem('authUser')
		if (storedUser) {
			router.push('/')
		}
	}, [router])

	const validate = () => {
		const newErrors = { email: '', password: '', repeatPassword: '' }
		let valid = true

		if (!email.trim()) {
			newErrors.email = "Can't be empty"
			valid = false
		}
		if (!password.trim()) {
			newErrors.password = "Can't be empty"
			valid = false
		}
		if (!isLogin) {
			if (!repeatPassword.trim()) {
				newErrors.repeatPassword = "Can't be empty"
				valid = false
			} else if (repeatPassword !== password) {
				newErrors.repeatPassword = 'Passwords do not match'
				valid = false
			}
		}

		setErrors(newErrors)
		return valid
	}

	const handleAuth = () => {
		setMessage('')
		setSuccessMessage('')
		if (!validate()) return

		const users = JSON.parse(localStorage.getItem('users') || '{}')

		if (isLogin) {
			if (users[email] && users[email] === password) {
				localStorage.setItem('authUser', JSON.stringify({ email }))
				router.push('/home')
			} else {
				setMessage('❌ Invalid email or password')
			}
		} else {
			if (users[email]) {
				setMessage('❌ This email is already registered')
			} else {
				users[email] = password
				localStorage.setItem('users', JSON.stringify(users))
				localStorage.setItem('authUser', JSON.stringify({ email }))
				setSuccessMessage('✅ Account created successfully!')
				setTimeout(() => router.push('/home'), 1500)
			}
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0E0F1A] px-4">
			<Card className="w-full max-w-sm bg-[#161D2F] text-white text-lg md:text-xl lg:text-2xl border-none">
				<CardHeader>
					<CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<div>
						<Input
							type="email"
							placeholder="Email address"
							value={email}
							onChange={e => setEmail(e.target.value)}
							className={errors.email ? 'border-red-500' : ''}
						/>
						{errors.email && (
							<p className="text-xs text-red-400 mt-1">
								{errors.email}
							</p>
						)}
					</div>

					<div>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className={errors.password ? 'border-red-500' : ''}
						/>
						{errors.password && (
							<p className="text-xs text-red-400 mt-1">
								{errors.password}
							</p>
						)}
					</div>

					{!isLogin && (
						<div>
							<Input
								type="password"
								placeholder="Repeat password"
								value={repeatPassword}
								onChange={e => setRepeatPassword(e.target.value)}
								className={
									errors.repeatPassword ? 'border-red-500' : ''
								}
							/>
							{errors.repeatPassword && (
								<p className="text-xs text-red-400 mt-1">
									{errors.repeatPassword}
								</p>
							)}
						</div>
					)}
				</CardContent>

				<CardFooter className="flex flex-col space-y-4">
					<Button
						onClick={handleAuth}
						className="w-full bg-[#FC4747] hover:bg-white hover:text-black mt-8 mb-6"
					>
						{isLogin ? 'Login to your account' : 'Create account'}
					</Button>

					<p className="text-sm text-center">
						{isLogin
							? "Don't have an account?"
							: 'Already have an account?'}{' '}
						<span
							className="text-[#FC4747] hover:underline cursor-pointer"
							onClick={() => {
								setIsLogin(!isLogin)
								setMessage('')
								setSuccessMessage('')
							}}
						>
							{isLogin ? 'Sign Up' : 'Log In'}
						</span>
					</p>

					{message && (
						<p className="text-sm text-center text-red-300">
							{message}
						</p>
					)}
					{successMessage && (
						<p className="text-sm text-center text-green-400">
							{successMessage}
						</p>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
