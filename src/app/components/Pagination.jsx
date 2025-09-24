'use client'
import React from 'react'
import {
	usePathname,
	useSearchParams,
	useRouter,
} from 'next/navigation'

export default function Pagination({ totalPages = 1 }) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()

	const currentPage = Number(searchParams?.get('page') ?? 1)

	const createPageURL = pageNumber => {
		const params = new URLSearchParams(
			Array.from(searchParams?.entries() || []),
		)
		if (pageNumber <= 1) {
			params.delete('page')
		} else {
			params.set('page', String(pageNumber))
		}
		const qs = params.toString()
		return qs ? `${pathname}?${qs}` : pathname
	}

	const goToPage = pageNumber => {
		const url = createPageURL(pageNumber)
		router.push(url)
	}

	if (!totalPages || totalPages <= 1) return null

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<div className="flex justify-center mt-6 space-x-2">
			<button
				onClick={() => goToPage(currentPage - 1)}
				disabled={currentPage <= 1}
				className="px-3 py-1 bg-[#FC4747] text-white rounded disabled:opacity-40 hover:bg-red-500/50 cursor-pointer"
			>
				Prev
			</button>

			{pages.map(num => (
				<button
					key={num}
					onClick={() => goToPage(num)}
					className={`px-3 py-1 rounded cursor-pointer hover:opacity-50 ${
						num === currentPage
							? 'bg-white text-[#10141E]'
							: 'bg-[#161D2F] text-white'
					}`}
				>
					{num}
				</button>
			))}

			<button
				onClick={() => goToPage(currentPage + 1)}
				disabled={currentPage >= totalPages}
				className="px-3 py-1 bg-[#FC4747] text-white rounded disabled:opacity-40 hover:bg-red-500/50 cursor-pointer"
			>
				Next
			</button>
		</div>
	)
}
