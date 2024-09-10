const map = document.getElementById("aimmap");
const score = document.getElementById("score");

// 使用事件委托优化点击事件
map.addEventListener('click', function(e) {
  if (e.target.classList.contains('target')) {
    handleTargetClick(e.target);
  } else {
    createClickMarker(e);
    updateScore(-1);
  }
});

function createClickMarker(e) {
  const div = document.createElement('div');
  div.className = 'click';
  div.style.cssText = `position: absolute; left: ${e.clientX-5}px; top: ${e.clientY-5}px;`;
  map.appendChild(div);
  setTimeout(() => div.remove(), 100);
}

function updateScore(value) {
  score.textContent = parseInt(score.textContent) + value;
}

let speed = 1000;
let iterations = 0;
let clearId = 0;

const animation = () => {
  clearId = setInterval(() => {
    if (iterations < speed) {
      iterations += 100;
      return;
    }
    iterations = 0;
    createTarget();
  }, 100);
};

function createTarget() {
  const div = document.createElement('div');
  div.className = 'target';
  const x = Math.floor(Math.random() * 400 + 50);
  const y = Math.floor(Math.random() * 400 + 50);
  div.style.cssText = `position: absolute; left: ${x}px; top: ${y}px;`;
  map.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

function handleTargetClick(target) {
  setTimeout(() => target.remove(), 100);
  speed = Math.max(100, speed - 10); // 设置最小速度为100
  updateScore(2);
}

const start = document.getElementById("start");
const pause = document.getElementById("pause");

start.addEventListener('click', () => {
  start.disabled = true;
  animation();
});

pause.addEventListener('click', () => {
  clearInterval(clearId);
  start.disabled = false;
});