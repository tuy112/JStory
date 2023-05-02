// today
function getTodayLabel() {
  var week = new Array('일','월','화','수','목','금','토');

  var today = new Date().getDay();
  var todayLabel = week[today];

  return todayLabel;
}
console.log(getTodayLabel());

// 콘솔 값 html 출력
document.getElementById('now').innerHTML = getTodayLabel();

  
// 장미 수령하기 버튼 onclick 이벤트
function rosy() { 
  location.href = "https://jh-healing-place.tistory.com/40";
}


// snowing
setInterval(createSnow,100);

function createSnow() {
  const snow = document.createElement('i');
  snow.classList.add('fas');
  snow.classList.add('fa-snowflake');
  snow.style.left = Math.random() * window.innerWidth + 'px';
  snow.style.animationDirection = Math.random() * 3 + 2 + 's';
  snow.style.opacity = Math.random();
  snow.style.fontSize = Math.random() * 10 + 10 + 'px';

  document.body.appendChild(snow);

  setTimeout(() => {
    snow.remove()
  }, 5700);
}