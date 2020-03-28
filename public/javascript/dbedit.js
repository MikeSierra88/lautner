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
});