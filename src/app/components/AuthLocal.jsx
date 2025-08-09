'use client'
import React, { useEffect, useState } from 'react'

export default function AuthLocal() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [isLogin, setIsLogin] = useState(true)
	const [message, setMessage] = useState('')
	const [user, setUser] = useState(null)

	const [errors, setErrors] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	})

	useEffect(() => {
		const storedUser = localStorage.getItem('authUser')
		if (storedUser) setUser(JSON.parse(storedUser))
	}, [])

	const handleInput = (field, value) => {
		if (field === 'email') setEmail(value)
		if (field === 'password') setPassword(value)
		if (field === 'repeatPassword') setRepeatPassword(value)

		setErrors(prev => ({ ...prev, [field]: '' }))
		setMessage('')
	}

	const handleAuth = () => {
		setMessage('')
		const newErrors = { email: '', password: '', repeatPassword: '' }
		let hasError = false

		if (!email.trim()) {
			newErrors.email = "Can't be empty"
			hasError = true
		}
		if (!password.trim()) {
			newErrors.password = "Can't be empty"
			hasError = true
		}
		if (!isLogin) {
			if (!repeatPassword.trim()) {
				newErrors.repeatPassword = "Can't be empty"
				hasError = true
			} else if (password !== repeatPassword) {
				newErrors.repeatPassword = 'Passwords do not match'
				hasError = true
			}
		}

		setErrors(newErrors)
		if (hasError) return

		const users = JSON.parse(localStorage.getItem('users') || '{}')

		if (isLogin) {
			if (users[email] && users[email] === password) {
				localStorage.setItem('authUser', JSON.stringify({ email }))
				setUser({ email })
				setMessage('Login successful ✅')
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
				setUser({ email })
				setMessage('Account created successfully 🎉')
			}
		}
	}

	const logout = () => {
		localStorage.removeItem('authUser')
		setUser(null)
		setEmail('')
		setPassword('')
		setRepeatPassword('')
		setMessage('')
		setErrors({ email: '', password: '', repeatPassword: '' })
	}

	if (user) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#0E0F1A] text-white w-full">
				<div className="p-6 rounded-xl bg-[#1A1B2D] w-full max-w-sm text-center">
					<p className="text-xl mb-4">Welcome, {user.email} 👋</p>
					<button
						className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
						onClick={logout}
					>
						Log out
					</button>
				</div>
			</div>
		)
	}

	const inputClass = (fieldValue, error) => {
		return `w-full bg-transparent border-b py-3 pr-28 placeholder-gray-400 focus:outline-none transition ${
			fieldValue.trim() === '' && error
				? 'border-red-500'
				: 'border-gray-500 focus:border-red-500'
		}`
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-[#0E0F1A] px-4 w-full">
			<div className="mb-18">
				<img src="/logo.svg" />
			</div>

			<div className="bg-[#1A1B2D] p-8 rounded-2xl shadow-lg w-full max-w-sm text-white">
				<h2 className="text-2xl font-semibold mb-6">
					{isLogin ? 'Login' : 'Sign Up'}
				</h2>

				<div className="space-y-6">
					<div className="relative">
						<input
							type="email"
							placeholder="Email address"
							value={email}
							onChange={e => handleInput('email', e.target.value)}
							className={inputClass(email, errors.email)}
						/>
						{errors.email && (
							<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-red-400 pointer-events-none">
								{errors.email}
							</span>
						)}
					</div>
					<div className="relative">
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={e => handleInput('password', e.target.value)}
							className={inputClass(password, errors.password)}
						/>
						{errors.password && (
							<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-red-400 pointer-events-none">
								{errors.password}
							</span>
						)}
					</div>
					{!isLogin && (
						<div className="relative">
							<input
								type="password"
								placeholder="Repeat password"
								value={repeatPassword}
								onChange={e =>
									handleInput('repeatPassword', e.target.value)
								}
								className={inputClass(
									repeatPassword,
									errors.repeatPassword,
								)}
							/>
							{errors.repeatPassword && (
								<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-red-400 pointer-events-none">
									{errors.repeatPassword}
								</span>
							)}
						</div>
					)}
					<button
						className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-4 transition"
						onClick={handleAuth}
					>
						{isLogin ? 'Login to your account' : 'Create account'}
					</button>
					<p className="text-sm text-center mt-4">
						{isLogin
							? "Don't have an account?"
							: 'Already have an account?'}{' '}
						<span
							className="text-red-400 hover:underline cursor-pointer"
							onClick={() => {
								setIsLogin(!isLogin)
								setMessage('')
								setErrors({
									email: '',
									password: '',
									repeatPassword: '',
								})
								setRepeatPassword('')
							}}
						>
							{isLogin ? 'Sign Up' : 'Log In'}
						</span>
					</p>
					{message && (
						<p className="text-sm text-center mt-2 text-red-300">
							{message}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
