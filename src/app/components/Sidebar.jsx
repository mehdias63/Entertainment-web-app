'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { Home, Film, Tv, Bookmark } from 'lucide-react'

export default function Sidebar() {
	const router = useRouter()
	const pathname = usePathname()

	const menu = [
		{ icon: <Home size={24} />, path: '/home' },
		{ icon: <Film size={24} />, path: '/movies' },
		{ icon: <Tv size={24} />, path: '/tv-series' },
		{ icon: <Bookmark size={24} />, path: '/bookmarked' },
	]

	return (
		<div className="bg-[#161D2F] p-4 rounded-xl flex md:flex-col items-center gap-6">
			<img src="/assets/logo.svg" alt="logo" className="mb-6" />
			{menu.map((item, index) => (
				<button
					key={index}
					className={`p-2 rounded-lg ${
						pathname === item.path ? 'bg-[#FC4747]' : ''
					}`}
					onClick={() => router.push(item.path)}
				>
					{item.icon}
				</button>
			))}
		</div>
	)
}
