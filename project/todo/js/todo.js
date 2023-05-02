$(document).ready(function(){
    var $delete = $('table tbody tr td .delete');
    var $add = $('.newButton .add');
    var $refresh = $('.newButton .refresh');

    // delete button 
    $delete.click(function(){
        deleteRow($(this));
    })

    // add button
    $add.click(function(){
        addNewRow($(this));
    })
});

function deleteRow(thisButton){
    thisButton.parent().parent().remove();
}
function addNewRow(){
    var table = $('.todo table');
    var numRows =$('table tbody tr').length;

    $table.append('<tr><td><button type="text"</td></tr>')
}