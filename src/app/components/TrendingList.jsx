'use client'
import ContentCard from './ContentCard'

export default function TrendingList({ data, onToggleBookmark }) {
	const trendingItems = data.filter(item => item.isTrending)

	return (
		<div className="mb-8 relative">
			<h2 className="text-white text-xl mb-4">Trending</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 space-y-4 gap-4 md:gap-4">
				{trendingItems.map((item, idx) => (
					<ContentCard
						key={idx}
						item={item}
						onToggleBookmark={onToggleBookmark}
						className="-mt-16 ml-4"
					/>
				))}
			</div>
		</div>
	)
}
