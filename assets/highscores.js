const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('finalScore')) || []

highScoresList.innerHTML = 

highScores.map(finalScore => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
})

.join('')