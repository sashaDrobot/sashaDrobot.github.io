$('#toggler').on('click', function () {
    $('.wrapper').toggleClass('open-sidebar');
    $(this).toggleClass('collapsed');
});