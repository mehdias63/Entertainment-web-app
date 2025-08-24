'use client'
import React, { useEffect, useState } from 'react'
import { useSearch } from '../context/SearchContext'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar'
import TrendingList from './TrendingList'
import RecommendedList from './RecommendedList'
// import ContentGrid from './ContentGrid'
import dataJson from '@/app/data.json'

export default function ContentPage({
	title = '',
	placeholder = 'Search...',
	filterFn = null,
	showTrending = false,
	showRecommended = false,
}) {
	const [data, setData] = useState([])
	const { searchTerm } = useSearch()

	useEffect(() => {
		try {
			const stored = JSON.parse(localStorage.getItem('moviesData'))
			setData(stored && Array.isArray(stored) ? stored : dataJson)
		} catch (e) {
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

	let pageItems = filterFn ? data.filter(filterFn) : data

	const term = (searchTerm || '').trim().toLowerCase()
	if (term) {
		pageItems = pageItems.filter(it =>
			(it.title || '').toLowerCase().startsWith(term),
		)
	}

	return (
		<div className="min-h-screen bg-[#10141E] flex flex-col lg:flex-row">
			<Sidebar />
			<main className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
				<div className="w-full max-w-[90rem]">
					<SearchBar placeholder={placeholder} />
					{showTrending && (
						<div className="mt-6">
							<TrendingList
								data={pageItems}
								onToggleBookmark={handleToggleBookmark}
							/>
						</div>
					)}
					{showRecommended && (
						<div className="mt-8">
							<RecommendedList
								data={pageItems}
								onToggleBookmark={handleToggleBookmark}
							/>
						</div>
					)}
					{!showTrending && !showRecommended && (
						<section className="mt-6">
							{title && (
								<h2 className="text-white text-xl mb-4">{title}</h2>
							)}
							{/* <ContentGrid */}
							{/* movies={pageItems} */}
							{/* toggleBookmark={handleToggleBookmark} */}
							{/* /> */}
						</section>
					)}
				</div>
			</main>
		</div>
	)
}
