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
   
   $(".edittermekbtn").click(function(){
        var kateg = $(this).data("kategoria");
        var termek = $(this).data("termek");
        $("#editTermekId").val(termek._id);
        $("#editTermekNev").val(termek.nev);
        $("#editKategId").val(kateg._id);
        $("#editKateg").val(kateg.kat);
        $("#editKiszereles").val(termek.kiszereles);
        $("#editAr").val(termek.ar);
        var formAction = "/arlistak/" + $(this).data("arlistaurl") + "/"
                            + kateg._id + "/" + termek._id 
                            + "?_method=PUT";
        console.log(formAction);
        $("#editTermekForm").attr('action', formAction);
   });
});