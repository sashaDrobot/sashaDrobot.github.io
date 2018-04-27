$(function() {
    var head =  $("#head");
    console.log($("#green-wrapper").offset().top);
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 50&&$(window).scrollTop()<$("#green-wrapper").offset().top) {
            head.addClass("white");
            head.removeClass("black-head");
        } else if($(window).scrollTop()>$("#green-wrapper").offset().top){
            head.removeClass("white");
            head.addClass("black-head");
        }else if ($(window).scrollTop() < 50){
            head.removeClass("white");
            head.removeClass("black-head");
        }

    });
});