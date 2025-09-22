'use client'

import { Search } from 'lucide-react'
import {
	useSearchParams,
	usePathname,
	useRouter,
} from 'next/navigation'

export default function SearchBar({ placeholder }) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()
	function handleSearch(term) {
		const params = new URLSearchParams(searchParams)
		params.set('page', '1')
		if (term) {
			params.set('query', term)
		} else {
			params.delete('query')
		}
		replace(`${pathname}?${params.toString()}`)
	}
	return (
		<div className="relative flex flex-1 flex-shrink-0 mb-8">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				className="w-full p-3 pl-10 rounded-lg bg-[#161D2F] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
				placeholder={placeholder || 'Search for movies or TV series'}
				onChange={e => {
					handleSearch(e.target.value)
				}}
				defaultValue={searchParams.get('query')?.toString()}
			/>
			<Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
		</div>
	)
}
