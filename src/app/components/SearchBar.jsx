'use client'
import { useSearch } from '../context/SearchContext'

export default function SearchBar({ placeholder }) {
	const { searchTerm, setSearchTerm } = useSearch()

	return (
		<div className="m-6">
			<input
				type="text"
				placeholder={placeholder || 'Search for movies or TV series'}
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className="w-full p-3 rounded-lg bg-[#161D2F] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
			/>
		</div>
	)
}
