'use client'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ContentCard from '../components/ContentCard'
import dataJson from '../data.json'
import SearchBar from '../components/SearchBar'
import { useSearch } from '../context/SearchContext'

export default function TVSeriesPage() {
	const [data, setData] = useState([])
	const { searchTerm } = useSearch()

	useEffect(() => {
		const storedData =
			JSON.parse(localStorage.getItem('moviesData')) || dataJson
		setData(storedData)
	}, [])

	const handleToggleBookmark = title => {
		const updated = data.map(item =>
			item.title === title
				? { ...item, isBookmarked: !item.isBookmarked }
				: item,
		)
		setData(updated)
		localStorage.setItem('moviesData', JSON.stringify(updated))
	}

	const tvSeries = data
		.filter(item => item.category === 'TV Series')
		.filter(item =>
			item.title.toLowerCase().startsWith(searchTerm.toLowerCase()),
		)

	return (
		<div className="min-h-screen bg-[#10141E] flex gap-8 p-6">
			<Sidebar />
			<main className="flex-1 overflow-y-auto">
				<SearchBar placeholder="Search for movies or TV series" />
				<h2 className="text-white text-xl mb-4">TV Series</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{tvSeries.map((item, idx) => (
						<ContentCard
							key={idx}
							item={item}
							onToggleBookmark={handleToggleBookmark}
						/>
					))}
				</div>
			</main>
		</div>
	)
}
