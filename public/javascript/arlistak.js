$(document).ready(function(){

    $('.arlistaDelBtn').click(function(){
        var formName = '#' + $(this).data('arlistaid') + 'del';
        $(formName).submit();
    });
    
    $('#deleteConfirmModal').on('show.bs.modal', function (event) {
           var button = $(event.relatedTarget);
           var arlistaUrl = button.data('arlistaurl');
           if (button.data('tipus') == "arlista") {
               $('#modalTipusTxt').text('arlistat');
               $('#modalItemName').text('Arlista URL: ' +  arlistaUrl);
               var formActionArlista = "/arlistak/" + arlistaUrl + "?_method=DELETE";
               $("#modalDeleteConfirmForm").attr('action', formActionArlista);
           }
       });
       
});