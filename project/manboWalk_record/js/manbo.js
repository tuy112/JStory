// btn_button
function scrapAddress() {
    let copyText = document.getElementById('myInput');
    copyText.select();
    copyText.setSelectionRange(0,99999);
    document.execCommand("Copy");
    alert('복사되었습니다. 원하시는 곳에 ctrl+V하시기 바랍니다.');
}

// sales + tool mouseout,mouseleave
/* jquery ver.
$('#header .sales').on('mouseenter',function(){
    $(this).fadeOut();
    $('#header .tool').fadeIn();
});
$('#header .tool').on('mouseleave',function(){
    $('#header .sales').fadeIn();
    $(this).fadeOut();
});
*/
let sales = document.getElementById("sale");
let tool = document.getElementById('tools');

sales.addEventListener('mouseover',(event) => {
    tool.style.display = 'block';
    sales.style.display = 'none';
    // console.log('in');
});
tool.addEventListener('mouseleave',(event) =>{
    tool.style.display = 'none';
    sales.style.display = 'block';
    // console.log('out');
});


// record calculator - sum



// addRow, edit
function addRow() {
    let records = document.getElementById('record');
    let newRow = records.insertRow(ourBody.rows.length); //하단에 추가
    let setCellData1 = newRow.insertCell(0);
    let setCellData2 = newRow.insertCell(1);
    let setCellData3 = newRow.insertCell(2);
    let setCellData4 = newRow.insertCell(3);
    let setCellData5 = newRow.insertCell(4);
    let setCellData6 = newRow.insertCell(5);
    let setCellData7 = newRow.insertCell(6);
    let setCellData8 = newRow.insertCell(7);
    let setCellData9 = newRow.insertCell(8);
    let setCellData10 = newRow.insertCell(9);

    setCellData1.innerText = '새로운 인원';
    setCellData2.innerText = '';
    setCellData3.innerText = '';
    setCellData4.innerText = '';
    setCellData5.innerText = '';
    setCellData6.innerText = '';
    setCellData7.innerText = '';
    setCellData8.innerText = '';
    setCellData9.innerText = '';
    setCellData10.innerText = '';
}
