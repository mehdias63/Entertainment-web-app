'use client'
import ContentPage from '../components/ContentPage' // مسیر را طبق ساختارت تنظیم کن

export default function HomePage() {
	return (
		<ContentPage
			title=""
			placeholder="Search for movies or TV series"
			filterFn={null} // همه آیتم‌ها
			showTrending={true}
			showRecommended={true}
		/>
	)
}
