$(document).ready(function(){
    $('.nav-item.active').removeClass('active');
    $('.nav-item a[href="' + location.pathname  + '"]').parent().addClass('active');
    $(this).parent().addClass('active').siblings().removeClass('active');
});