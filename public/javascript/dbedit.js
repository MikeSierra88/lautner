$(document).ready(function(){
    
   $("#kateg").change(function(){
       $(this).find('option:selected').each(function(){
          var optionValue = $(this).attr("value");
          if (optionValue == "new") {
              $('#ujkatdiv').removeClass("d-none");
          } else {
              $('#ujkatdiv').addClass("d-none");
          }
       });
   });
   
   $(".editkatbtn").click(function(){
       var formId = ".editKat" + $(this).data("kategoriaid");
       console.log(formId)
       $(formId).val($(this).data("kategoriakat"));
   });
   
   $(".edittermekbtn").click(function(){
        var kateg = $(this).data("kategoria");
        var termek = $(this).data("termek");
        $("#editTermekNev").val(termek.nev);
        $("#editKateg").val(kateg.kat);
        $("#editKiszereles").val(termek.kiszereles);
        $("#editAr").val(termek.ar);
        var formAction = "/arlistak/" + $(this).data("arlistaurl") + "/"
                            + kateg._id + "/" + termek._id 
                            + "?_method=PUT";
        $("#editTermekForm").attr('action', formAction);
   });
   
   $('#deleteConfirmModal').on('show.bs.modal', function (event) {
       var button = $(event.relatedTarget);
       if (button.data('tipus') == "kategoria") {
           $('#modalTipusTxt').text('kategóriát');
           $('#modalItemKat').text('');
           $('#modalItemName').text('Kategória neve: ' +  button.data('kategoriakat'));
           var formActionKat = "/arlistak/" + button.data('arlistaurl') + "/"
                            + button.data('kategoriaid') + "?_method=DELETE";
           $("#modalDeleteConfirmForm").attr('action', formActionKat);
       } else if (button.data('tipus') == "termek") {
           $('#modalTipusTxt').text('terméket');
           $('#modalItemKat').text('Termék kategóriája: ' +  button.data('kategoria').kat);
           $('#modalItemName').text('Termék neve: ' +  button.data('termeknev'));
           var formActionTermek = "/arlistak/" + button.data('arlistaurl') + "/"
                            + button.data('kategoria')._id + "/" + button.data('termekid') 
                            + "?_method=DELETE";
           $("#modalDeleteConfirmForm").attr('action', formActionTermek);
       }
   });
});

//<form class="d-inline" id="del<%=termek._id%>" 
  //                  action="/arlistak/<%=arlista.url%>/<%=kategoria._id%>/<%=termek._id%>?_method=DELETE" method="POST">
//                    <span class="btn-link deco-none float-right" onclick="document.getElementById('del<%=termek._id%>').submit()">
//                        <i class="far fa-trash-alt"></i>
//                    </span>
//                </form>
