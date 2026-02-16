'use client'
import { Suspense } from 'react'
import ContentPage from '../components/ContentPage'

export default function HomePage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ContentPage
				title=""
				placeholder="Search for movies or TV series"
				filterFn={() => true}
				showTrending={true}
				showRecommended={true}
			/>
		</Suspense>
	)
}
