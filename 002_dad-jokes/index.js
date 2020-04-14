const jokeEl = document.getElementById('joke');
const getJoke = document.getElementById('getJoke');

getJoke.addEventListener('click', generateJoke);

generateJoke();

async function generateJoke() {
	const jokeRes = await fetch('https://icanhazdadjoke.com/', {
		headers: {
			'Accept': 'application/json'
		}
	});
	const jokeData = await jokeRes.json();
	jokeEl.innerHTML = jokeData.joke;
}