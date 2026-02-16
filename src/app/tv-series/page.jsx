'use client'
import { Suspense } from 'react'
import ContentPage from '../components/ContentPage'

export default function TVSeriesPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ContentPage
				title="TV Series"
				placeholder="Search for TV series"
				filterFn={item => item.category === 'TV Series'}
				showTrending={false}
				showRecommended={false}
			/>
		</Suspense>
	)
}
