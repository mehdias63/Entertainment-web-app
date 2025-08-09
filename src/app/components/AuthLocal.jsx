'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthForm from './AuthForm'

export default function AuthLocal() {
	const router = useRouter()
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
		if (storedUser) {
			setUser(JSON.parse(storedUser))
			router.push('/') // کاربر قبلاً لاگین کرده → مستقیم به صفحه home
		}
	}, [router])

	const handleInputChange = (field, value) => {
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
				router.push('/home') // بعد از لاگین برو به صفحه home
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
				router.push('/') // بعد از ثبت‌نام برو به صفحه home
			}
		}
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-[#10141E] px-4 w-full">
			<div className="mb-18">
				<img src="/assets/logo.svg" />
			</div>
			<AuthForm
				isLogin={isLogin}
				email={email}
				password={password}
				repeatPassword={repeatPassword}
				errors={errors}
				message={message}
				onInputChange={handleInputChange}
				onAuth={handleAuth}
				onToggle={() => {
					setIsLogin(!isLogin)
					setMessage('')
					setErrors({ email: '', password: '', repeatPassword: '' })
					setRepeatPassword('')
				}}
			/>
		</div>
	)
}
