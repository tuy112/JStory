$(function(){
    mainInit();
})
function mainInit(){
    gnb();
    mainVisual();
}

function gnb(){
    var $gnbli = $('#header .nav .gnb > li');
    var $subul = $('#header .nav .gnb li ul');
    var $header = $('#header');
    $gnbli.hover( function(){
        $subul.hide();
        $(this).find('ul').show();
        // $header.height(155);
        $header.stop().animate({height:130},300);
    })

    $('#header').on('mouseleave',function(){
        $subul.hide();
        // $header.height(115);
        $header.stop().animate({height:120},300);
    })
} // end gnb

function mainVisual(){
    
} // end mainVisual