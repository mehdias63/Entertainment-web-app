'use client'
import ContentPage from '../components/ContentPage'

export default function BookmarkedPage() {
	return (
		<ContentPage
			title="Bookmarked"
			placeholder="Search for bookmarked shows"
			filterFn={item => item.isBookmarked}
			showTrending={false}
			showRecommended={false}
		/>
	)
}
