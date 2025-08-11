'use client'
import ContentCard from './ContentCard'

export default function RecommendedList({ data, onToggleBookmark }) {
	const recommendedItems = data.filter(item => !item.isTrending)

	return (
		<div>
			<h2 className="text-white text-xl mb-4">Recommended for you</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{recommendedItems.map((item, idx) => (
					<ContentCard
						key={idx}
						item={item}
						onToggleBookmark={onToggleBookmark}
					/>
				))}
			</div>
		</div>
	)
}
