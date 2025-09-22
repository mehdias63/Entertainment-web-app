'use client'
import React, { useEffect, useState } from 'react'
import {
	useSearchParams,
	useRouter,
	usePathname,
} from 'next/navigation'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar'
import TrendingList from './TrendingList'
import RecommendedList from './RecommendedList'
import ContentGrid from './ContentGrid'
import Pagination from './Pagination'
import dataJson from '../data.json'

const ITEMS_PER_PAGE = 4

export default function ContentPage({
	title = '',
	placeholder = 'Search...',
	filterFn = () => true,
	showTrending = false,
	showRecommended = false,
	pageParamName = 'page',
}) {
	const [data, setData] = useState([])
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	let currentPage = Number(searchParams?.get(pageParamName) ?? 1)
	if (Number.isNaN(currentPage) || currentPage < 1) currentPage = 1

	useEffect(() => {
		try {
			const stored = JSON.parse(localStorage.getItem('moviesData'))
			setData(Array.isArray(stored) ? stored : dataJson)
		} catch {
			setData(dataJson)
		}
	}, [])

	const handleToggleBookmark = title => {
		setData(prev => {
			const updated = prev.map(it =>
				it.title === title
					? { ...it, isBookmarked: !it.isBookmarked }
					: it,
			)
			localStorage.setItem('moviesData', JSON.stringify(updated))
			return updated
		})
	}

	useEffect(() => {
		const term = searchParams.get('query') || ''
		if (currentPage !== 1 && term) {
			const params = new URLSearchParams(
				Array.from(searchParams?.entries() || []),
			)
			params.set(pageParamName, '1')
			const qs = params.toString()
			router.push(qs ? `${pathname}?${qs}` : pathname)
		}
	}, [searchParams, currentPage, pageParamName, pathname, router])

	let pageItems = data.filter(filterFn)
	const term = (searchParams.get('query') || '').trim().toLowerCase()
	if (term) {
		pageItems = pageItems.filter(it =>
			(it.title || '').toLowerCase().startsWith(term),
		)
	}

	// --- حالت Home ---
	if (showTrending && showRecommended) {
		const trendingItems = pageItems.filter(it => it.isTrending)
		const recommendedItems = pageItems.filter(it => !it.isTrending)

		const totalRecPages = Math.max(
			1,
			Math.ceil(recommendedItems.length / ITEMS_PER_PAGE),
		)
		if (currentPage > totalRecPages) currentPage = totalRecPages
		const startRec = (currentPage - 1) * ITEMS_PER_PAGE
		const paginatedRecommended = recommendedItems.slice(
			startRec,
			startRec + ITEMS_PER_PAGE,
		)

		return (
			<div className="min-h-screen bg-[#10141E] flex flex-col lg:flex-row">
				<Sidebar />
				<main className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col">
					<div className="w-full max-w-[90rem] flex-1">
						<SearchBar placeholder={placeholder} />

						<section className="mt-6 px-4">
							<TrendingList
								data={trendingItems}
								onToggleBookmark={handleToggleBookmark}
							/>
						</section>

						<section className="mt-8">
							<RecommendedList
								data={paginatedRecommended}
								onToggleBookmark={handleToggleBookmark}
							/>
						</section>
					</div>

					{/* --- Footer ثابت --- */}
					<footer className="mt-auto">
						{recommendedItems.length > ITEMS_PER_PAGE && (
							<Pagination totalPages={totalRecPages} />
						)}
					</footer>
				</main>
			</div>
		)
	}

	// --- سایر صفحات ---
	const totalPages = Math.max(
		1,
		Math.ceil(pageItems.length / ITEMS_PER_PAGE),
	)
	if (currentPage > totalPages) currentPage = totalPages
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const paginatedItems = pageItems.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE,
	)

	return (
		<div className="min-h-screen bg-[#10141E] flex flex-col lg:flex-row px-2">
			<Sidebar />
			<main className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col">
				<div className="w-full max-w-[90rem] flex-1">
					<SearchBar placeholder={placeholder} />
					{title && (
						<h2 className="text-white text-xl font-semibold mb-4">
							{title}
						</h2>
					)}

					<ContentGrid
						data={paginatedItems}
						onToggleBookmark={handleToggleBookmark}
					/>
				</div>

				{/* --- Footer ثابت --- */}
				<footer className="mt-auto">
					{pageItems.length > ITEMS_PER_PAGE && (
						<Pagination totalPages={totalPages} />
					)}
				</footer>
			</main>
		</div>
	)
}
