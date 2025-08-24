'use client'
import ContentPage from '../components/ContentPage'

export default function MoviesPage() {
	return (
		<ContentPage
			title="Movies"
			placeholder="Search for movies"
			filterFn={item => item.category === 'Movie'}
			showTrending={false}
			showRecommended={false}
		/>
	)
}
