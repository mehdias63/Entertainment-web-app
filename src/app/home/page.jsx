'use client'
import ContentPage from '../components/ContentPage'

export default function HomePage() {
	return (
		<ContentPage
			title=""
			placeholder="Search for movies or TV series"
			filterFn={() => true}
			showTrending={true}
			showRecommended={true}
		/>
	)
}
