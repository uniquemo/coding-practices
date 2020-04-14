const counters = document.querySelectorAll('.counter')

// this could work for multiple counters
counters.forEach(counter => {
	// start with 0 by default
	counter.innerText = '0'
	
	const updateCounter = () => {
		const target = +counter.getAttribute('data-target')
		const current = +counter.innerText
		
		// get the 1% to speed up things
		const increment = target / 1000
		
		if(current < target) {
			counter.innerText = `${Math.ceil(current + increment)}`
			setTimeout(updateCounter, 1)
		} else {
			counter.innerText = target
		}
	}
	
	updateCounter()
})
