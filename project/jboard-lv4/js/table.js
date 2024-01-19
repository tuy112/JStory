// 테이블 행을 동적으로 생성하는 함수
function generateTableRows(dataArray) {
    const tableBody = document.querySelector("#menuTable tbody");
    tableBody.innerHTML = ""; // 기존의 행들을 삭제합니다.

    for (let i = 0; i < dataArray.length; i++) {
        const item = dataArray[i];

        const row = document.createElement("tr");
        row.classList.add("menu");

        const menuIdCell = document.createElement("td");
        menuIdCell.textContent = item.menuId;
        row.appendChild(menuIdCell);

        const menuNameCell = document.createElement("td");
        menuNameCell.textContent = item.menuName;
        row.appendChild(menuNameCell);

        const menuImageCell = document.createElement("td");
        menuImageCell.textContent = item.menuImage;
        row.appendChild(menuImageCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = item.price;
        row.appendChild(priceCell);

        const menuChangeCell = document.createElement("td");
        const changeBtn = document.createElement("button");
        changeBtn.textContent = "메뉴수정";
        changeBtn.onclick = () => menuChange(item.menuId, item.menuName, item.menuImage, item.price) // 수정 팝업창 열기
        menuChangeCell.appendChild(changeBtn);
        changeBtn.style.background = "#ff7f00";
        changeBtn.style.color = "#fff";
        changeBtn.style.borderRadius = "5px";
        changeBtn.style.transition = "0.7s";
        changeBtn.style.fontSize = "4px";
        changeBtn.style.cursor = "pointer";
        changeBtn.addEventListener('mouseover', function(){
            changeBtn.style.background = "#fff";
            changeBtn.style.color = "#ff7f00";
        });
        changeBtn.addEventListener('mouseout', function(){
            changeBtn.style.background = "#ff7f00";
            changeBtn.style.color = "#fff";
        });
        row.appendChild(menuChangeCell);

        const menuDeleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "메뉴삭제";
        deleteBtn.onclick = () => menuDelete(item.menuId); // 삭제 함수에 메뉴 아이디를 넘깁니다.
        menuDeleteCell.appendChild(deleteBtn);
        deleteBtn.style.background = "#f04";
        deleteBtn.style.color = "#fff";
        deleteBtn.style.borderRadius = "5px";
        deleteBtn.style.transition = "0.7s";
        deleteBtn.style.fontSize = "4px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.addEventListener('mouseover', function(){
            deleteBtn.style.background = "#fff";
            deleteBtn.style.color = "#f04";
        });
        deleteBtn.addEventListener('mouseout', function(){
            deleteBtn.style.background = "#f04";
            deleteBtn.style.color = "#fff";
        });
        row.appendChild(menuDeleteCell);

        tableBody.appendChild(row);
    }
}

// table db 데이터 값 출력
const data = {
    email: $('#email'),
    password: $('#password'),
    confirm: $('#passwordConfirm'),
    storeName: $('#storeName'),
    storeImage: $('#storeImage'),
}

axios.get('http://localhost:3000/api/post', data)
    .then(response => {
        console.log(response);

        const dataArray = response.data.data;
        generateTableRows(dataArray); // 테이블 행 생성 함수를 호출하여 데이터로 테이블을 업데이트합니다.

    })
    .catch(function (error) {
        console.log(error);
    })