'use client'
import { Bookmark, BookmarkCheck, Film, Tv } from 'lucide-react'
import { useState } from 'react'

export default function ContentCard({
	item,
	onToggleBookmark,
	className = '',
}) {
	const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked)

	const handleBookmark = () => {
		setIsBookmarked(!isBookmarked)
		onToggleBookmark(item.title)
	}

	const CategoryIcon = item.category === 'Movie' ? Film : Tv

	return (
		<div className="relative">
			<img
				src={item.thumbnail.regular.large}
				alt={item.title}
				className="rounded-lg mb-2"
			/>
			<button
				className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-red-500/70 cursor-pointer"
				onClick={handleBookmark}
			>
				{isBookmarked ? (
					<BookmarkCheck color="white" />
				) : (
					<Bookmark color="white" />
				)}
			</button>
			<div className={`${className}`}>
				<p className="text-white opacity-75 text-[0.6875rem] md:text-[0.8125rem] flex items-center gap-1 mb-1 font-light">
					{item.year} •
					<CategoryIcon size={14} className="inline-block" />{' '}
					{item.category} • {item.rating}
				</p>
				<h3 className="text-white font-medium text-sm md:text-lg">
					{item.title}
				</h3>
			</div>
		</div>
	)
}
