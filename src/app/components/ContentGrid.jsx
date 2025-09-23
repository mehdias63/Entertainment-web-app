'use client'
import React from 'react'
import ContentCard from './ContentCard'

export default function ContentGrid({ data = [], onToggleBookmark }) {
	if (!Array.isArray(data) || data.length === 0) {
		return <p className="text-gray-400">No items to show.</p>
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 py-6">
			{data.map(item => (
				<ContentCard
					key={item.title}
					item={item}
					onToggleBookmark={onToggleBookmark}
					className="w-full"
				/>
			))}
		</div>
	)
}
