const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
const size = 10
const rows = canvas.height / size
const columns = canvas.width / size

const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')

let snake = new Snake(size, { canvas, ctx })
let target = new Target(size, { canvas, ctx, rows, columns })
let timer = null

function init() {
  target.genRandomLocation()
  target.draw()
  snake.draw()
}

init()

function start() {
  timer = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    target.draw()
    snake.update()
    snake.draw()

    if (snake.eatTarget(target)) {
      target.genRandomLocation()
    }

    snake.checkCollision()
    document.getElementById('score').innerText = snake.targetNum
  }, 150)
}

startBtn.addEventListener('click', () => {
  start()
})

pauseBtn.addEventListener('click', () => {
  clearInterval(timer)
})

window.addEventListener('keydown', (event) => {
  const direction = event.key.replace('Arrow', '')
  snake.changeDirection(direction)
})
