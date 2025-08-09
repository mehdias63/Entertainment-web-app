'use client'
import React from 'react'
import AuthInput from './AuthInput'

export default function AuthForm({
	email,
	password,
	repeatPassword,
	isLogin,
	errors,
	message,
	onInputChange,
	onAuth,
	onToggleMode,
}) {
	return (
		<div className="bg-[#161D2F] p-8 rounded-2xl shadow-lg w-full max-w-sm text-white">
			<h2 className="text-2xl font-semibold mb-6">
				{isLogin ? 'Login' : 'Sign Up'}
			</h2>

			<div className="space-y-6">
				<AuthInput
					type="email"
					placeholder="Email address"
					value={email}
					onChange={val => onInputChange('email', val)}
					error={errors.email}
				/>

				<AuthInput
					type="password"
					placeholder="Password"
					value={password}
					onChange={val => onInputChange('password', val)}
					error={errors.password}
				/>

				{!isLogin && (
					<AuthInput
						type="password"
						placeholder="Repeat password"
						value={repeatPassword}
						onChange={val => onInputChange('repeatPassword', val)}
						error={errors.repeatPassword}
					/>
				)}

				<button
					className="w-full bg-[#FC4747] hover:bg-white text-white hover:text-[#10141E] py-2 rounded mt-4 transition-all duration-300 cursor-pointer"
					onClick={onAuth}
				>
					{isLogin ? 'Login to your account' : 'Create account'}
				</button>

				<p className="text-sm text-center mt-4">
					{isLogin
						? "Don't have an account?"
						: 'Already have an account?'}{' '}
					<span
						className="text-[#FC4747] hover:underline cursor-pointer"
						onClick={onToggleMode}
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
	)
}
