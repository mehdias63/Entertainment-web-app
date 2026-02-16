'use client'
import ContentPage from '../components/ContentPage'
import { Suspense } from 'react'

export default function BookmarkedPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ContentPage
				title="Bookmarked"
				placeholder="Search for bookmarked shows"
				filterFn={item => item.isBookmarked}
				showTrending={false}
				showRecommended={false}
			/>
		</Suspense>
	)
}
