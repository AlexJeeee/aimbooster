const map = document.getElementById("aimmap");
const score = document.getElementById("score");

map.addEventListener('click', function(e) {
  let div = document.createElement('div')
  div.setAttribute('class', 'click')
  div.style.position = "absolute";
  div.style.left = e.clientX-5+'px';
  div.style.top = e.clientY-5+'px';
  map.appendChild(div)
  setInterval(function() {
    div.remove()
  }, 100);
  score.innerHTML = parseInt(score.innerHTML) - 1
})

let speed = 1000
let iterations = 0
let clearId = 0

const animation = () => {
  clearId = setInterval(() => {
    if (iterations < speed) {
      return iterations += 100
    }
    iterations = 0
    let div = document.createElement('div')
    div.setAttribute('class', 'target')
    div.style.position = "absolute";
    let x = Math.floor(Math.random() * 400 + 50);
    let y = Math.floor(Math.random() * 400 + 50);
    div.style.left = x+'px';
    div.style.top = y+'px';
    map.appendChild(div)
    setTimeout(() => {
      div.remove()
    }, 3000)
    div.addEventListener('click', function() {
      let t = this
      setInterval(function() {
        t.remove()
      }, 100)
      speed -= 10
      score.innerHTML = parseInt(score.innerHTML) + 2
    })
  }, 100);
}

const start = document.getElementById("start");
const pause = document.getElementById("pause");
start.addEventListener('click', () => {
  start.setAttribute('disabled', 'true')
  animation()
})
pause.addEventListener('click', () => {
  clearInterval(clearId)
  start.removeAttribute('disabled')
})