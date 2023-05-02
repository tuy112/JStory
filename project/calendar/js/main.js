// made by JStol

// 시계 Part "요구하신대로 utc표준시 적용해서 전 세계 동일하게 출력됩니다"
let clock = document.querySelector(".clock");
function getTimezoneOffset(){
    const time = new Date();

    const hour = String(time.getHours()).padStart(2,"0");
    const minutes = String(time.getMinutes()).padStart(2,"0");
    const seconds = String(time.getSeconds()).padStart(2,"0");

    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();

    document.getElementById("clock").innerHTML = hour +":" + minutes + ":"+ seconds;
    document.getElementById("date").innerHTML = year +"." + month + "."+ date + " ";
}



// 달력 Part
let nowMonth = new Date();
let today = new Date();
today.setHours(0, 0, 0, 0);

// 달력 Part - 본격적으로 시작..!
function buildCalendar() {
    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth());
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);

    let tbody_Calendar = document.querySelector(".Calendar tbody");
            document.getElementById("year").innerText = nowMonth.getFullYear();
            document.getElementById("month").innerText = leftPad(nowMonth.getMonth() + 1);

            // 이전 출력결과가 남아있는 경우 초기화
            while (tbody_Calendar.rows.length > 0) {
                tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
            }
            // Add 첫번째 행
            let nowRow = tbody_Calendar.insertRow();          
            for (let j = 0; j < firstDate.getDay(); j++) {  
                let nowColumn = nowRow.insertCell();
            }

            for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

                // 새 열 추가
                let nowColumn = nowRow.insertCell();        
                nowColumn.innerText = leftPad(nowDay.getDate()); // 추가한 열에 날짜 입력

                // 일요일: 빨강
                if (nowDay.getDay() == 0) {                 
                    nowColumn.style.color = "#DC143C";
                }
                // 토요일: 파랑
                if (nowDay.getDay() == 6) {                 
                    nowColumn.style.color = "#0000CD";
                    nowRow = tbody_Calendar.insertRow(); // 새로운 행 추가
                }


                if (nowDay < today) {
                    nowColumn.className = "pastDay";
                }
                else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
                    nowColumn.className = "today";
                    nowColumn.onclick = function () { choiceDate(this); }
                }
                else {            
                    // 미래인 경우                          
                    nowColumn.className = "futureDay";
                    nowColumn.onclick = function () { choiceDate(this); }
                }
            }
        }

// 공휴일 데이터 넣어야함 + 접속지역 ip가 뜨도록 만들어야 합니다.
// 아마 jsp쓰시면 쉽게 db를 넣을 수 있을거같은데 확인해보셔야 할거 같네요..! 화이팅입니다.


// 날짜 선택
function choiceDate(nowColumn) {
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay"); // // "choiceDay" 제거
    }
    nowColumn.classList.add("choiceDay"); // "choiceDay" 추가
}

// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();
}
// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();
}




// input값이 한자리 숫자인 경우 앞에 '0' 붙혀줌
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}



// 최종 출력되는 곳
window.onload = function() {
    // time
    getTimezoneOffset();
    setInterval(getTimezoneOffset,1000);

    // calendar
    buildCalendar();
}
