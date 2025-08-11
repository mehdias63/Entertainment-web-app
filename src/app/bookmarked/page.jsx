'use client'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ContentCard from '../components/ContentCard'
import dataJson from '../data.json'
import SearchBar from '../components/SearchBar'
import { useSearch } from '../context/SearchContext'

export default function BookmarkedPage() {
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

	const bookmarkedMovies = data
		.filter(item => item.isBookmarked && item.category === 'Movie')
		.filter(item =>
			item.title.toLowerCase().startsWith(searchTerm.toLowerCase()),
		)
	const bookmarkedSeries = data
		.filter(
			item => item.isBookmarked && item.category === 'TV Series',
		)
		.filter(item =>
			item.title.toLowerCase().startsWith(searchTerm.toLowerCase()),
		)

	return (
		<div className="min-h-screen bg-[#10141E] flex gap-8 p-6">
			<Sidebar />
			<main className="flex-1 overflow-y-auto">
				<SearchBar placeholder="Search for movies or TV series" />
				<h2 className="text-white text-xl mb-4">Bookmarked Movies</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
					{bookmarkedMovies.map((item, idx) => (
						<ContentCard
							key={idx}
							item={item}
							onToggleBookmark={handleToggleBookmark}
						/>
					))}
				</div>
				<h2 className="text-white text-xl mb-4">
					Bookmarked TV Series
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{bookmarkedSeries.map((item, idx) => (
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
