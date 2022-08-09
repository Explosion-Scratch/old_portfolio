<div class="search">
	<input
		onkeyup="event.key === 'Enter' ? (location=`/search?q=${encodeURIComponent(this.value)}`) : ''"
		placeholder="Search here"
		class="search_box"
		value={{ search }}
	/><button
		class="search_btn"
		onclick="location = `/search?q=${escape(document.querySelector('.search_box').value)}`"
		><span class="iconify" data-icon="bi:search" data-inline="false" /></button
	>
</div>
