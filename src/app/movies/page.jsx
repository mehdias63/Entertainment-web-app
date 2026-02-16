'use client'
import { Suspense } from 'react'
import ContentPage from '../components/ContentPage'

export default function MoviesPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ContentPage
				title="Movies"
				placeholder="Search for movies"
				filterFn={item => item.category === 'Movie'}
				showTrending={false}
				showRecommended={false}
			/>
		</Suspense>
	)
}
