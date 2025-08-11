'use client'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import TrendingList from '../components/TrendingList'
import RecommendedList from '../components/RecommendedList'
import { useSearch } from '../context/SearchContext'
import dataJson from '../data.json'

export default function HomePage() {
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

	const filteredData = data.filter(item =>
		item.title.toLowerCase().startsWith(searchTerm.toLowerCase()),
	)

	return (
		<div className="min-h-screen bg-[#10141E] flex gap-8 p-6">
			<Sidebar />
			<main className="flex-1 overflow-y-auto">
				<SearchBar placeholder="Search for movies or TV series" />
				<TrendingList
					data={filteredData}
					onToggleBookmark={handleToggleBookmark}
				/>
				<RecommendedList
					data={filteredData}
					onToggleBookmark={handleToggleBookmark}
				/>
			</main>
		</div>
	)
}
