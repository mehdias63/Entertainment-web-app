'use client'
import React from 'react'

export default function AuthInput({
	type,
	placeholder,
	value,
	onChange,
	error,
}) {
	return (
		<div className="relative">
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={e => onChange(e.target.value)}
				className={`w-full bg-transparent border-b py-3 pr-28 placeholder-gray-400 focus:outline-none transition ${
					value.trim() === '' && error
						? 'border-red-500'
						: 'border-gray-500'
				}`}
			/>
			{error && (
				<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-[#FC4747] pointer-events-none">
					{error}
				</span>
			)}
		</div>
	)
}
