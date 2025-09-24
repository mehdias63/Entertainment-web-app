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

const ITEMS_PER_PAGE = 8

function NoResults({ query }) {
	return (
		<div className="flex flex-col items-center justify-center text-center text-gray-400 py-20 gap-y-4">
			<span className="text-[2.5rem]">😕</span>
			<h3 className="text-lg font-semibold text-white">
				No results found
			</h3>
			{query && (
				<p className="text-sm text-gray-400 mt-2">
					We couldn’t find anything matching “{query}”
				</p>
			)}
		</div>
	)
}

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

	let pageItems = data.filter(filterFn)
	const term = (searchParams.get('query') || '').trim().toLowerCase()
	if (term) {
		pageItems = pageItems.filter(it =>
			(it.title || '').toLowerCase().includes(term),
		)
	}

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
			<div className="min-h-screen flex flex-col lg:flex-row self-start">
				<Sidebar />
				<main className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col">
					<div className="w-full max-w-[90rem] flex-1">
						<SearchBar placeholder={placeholder} />

						{pageItems.length === 0 ? (
							<NoResults query={term} />
						) : (
							<>
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
							</>
						)}
					</div>

					<footer className="mt-auto">
						{recommendedItems.length > ITEMS_PER_PAGE && (
							<Pagination totalPages={totalRecPages} />
						)}
					</footer>
				</main>
			</div>
		)
	}

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
		<div className="min-h-screen flex flex-col lg:flex-row self-start">
			<Sidebar />
			<main className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col">
				<div className="w-full max-w-[90rem] flex-1">
					<SearchBar placeholder={placeholder} />
					{title && (
						<h2 className="text-white text-xl font-semibold mb-4">
							{title}
						</h2>
					)}

					{pageItems.length === 0 ? (
						<NoResults query={term} />
					) : (
						<ContentGrid
							data={paginatedItems}
							onToggleBookmark={handleToggleBookmark}
						/>
					)}
				</div>

				<footer className="mt-auto">
					{pageItems.length > ITEMS_PER_PAGE && (
						<Pagination totalPages={totalPages} />
					)}
				</footer>
			</main>
		</div>
	)
}
