function regex_escape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
/*input: texto pesquisado
 *list: lista a ser filtrada <menu> ou <ul> */
function filter_user(input, list){
  var pattern = new RegExp(".*"+ regex_escape(input).split(' ').join('.*') +".*", "gi"),
      $list = $(list);
  $list.find('.no-elements-filter-user').remove();
  $list.find('li').each(function(idx, element){
    if( $(element).text().match(pattern) )
      $(element).show();
    else
      $(element).hide();
  });
  if($list.find('li:visible').length == 0){
    $list.append('<li class="no-elements-filter-user alert">Nenhum usu&aacute;rio encontrado. ('+input+')</li>')
  }
}

var initEnrolePage = function(){
  var list = $('#users_list_roles'),
      field = $('#users_unroled');
  field.on('blur keypress', function(ev){
    if(ev.keyCode == 13 || ev.type == 'blur'){
      filter_user($(this).val(), list);
      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }
  });

  var adm_list = $('#adms_list_roles'),
      adm_field = $('#adms_unroled');
  adm_field.on('blur keypress', function(ev){
    if(ev.keyCode == 13 || ev.type == 'blur'){
      filter_user($(this).val(), adm_list);
      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }
  });

  var fullname = field.data('fullname');
  if(fullname && fullname.length > 0){
    field.val(fullname);
    filter_user(fullname, list);
  }
}

$(document).ready(initEnrolePage);
