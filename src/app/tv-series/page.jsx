'use client'
import ContentPage from '../components/ContentPage'

export default function TVSeriesPage() {
	return (
		<ContentPage
			title="TV Series"
			placeholder="Search for TV series"
			filterFn={item => item.category === 'TV Series'}
			showTrending={false}
			showRecommended={false}
		/>
	)
}
