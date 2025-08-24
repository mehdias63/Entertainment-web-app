'use client'
import ContentPage from '../components/ContentPage'

export default function HomePage() {
	return (
		<ContentPage
			title=""
			placeholder="Search for movies or TV series"
			filterFn={null}
			showTrending={true}
			showRecommended={true}
		/>
	)
}
