//= require jquery
//= require jquery_ujs
//= require moment
//= require moment/pt-br.js
//= require moment/es.js
//= require_self

var WEBY = {};

WEBY.toggleContrast = function(){
  var flag = localStorage.getItem('contrast') == 1 ? 0 : 1;
  localStorage.setItem('contrast', flag);
  /// save on users preferences
  var user = $('.user-avatar');
  if (user.length > 0) {
    $.post(user.data('pref'), {contrast: flag}, function(data){
      if(data.ok){
        //ok
      }else{
        //do something
      }
    });
  }
};

WEBY.checkContrast = function(){
  var cont = $('.contrast-css');
  if (cont.length > 0){
    if (cont.hasClass('active')) { ///if active class is present, it means contrast was set on backend
      localStorage.setItem('contrast', 1);
    }
  }
}

WEBY.applyContrast = function(){
  var flag = localStorage.getItem('contrast');
  var cont = $('.contrast-css');
  if (flag != 1) {
    if (cont.length > 0) cont.removeClass('active').attr('href', '');
    $('body').removeClass('contrast-mode');
  } else {
    if (cont.length > 0) cont.attr('href', cont.data('src')).addClass('active');
    $('body').addClass('contrast-mode');
  }
  /// contrast images
  $('[data-contrast-src]').each(function(){
    var $this = $(this);
    if (flag != 1) {
      if ($this.data('original-src')) $this.attr('src', $this.data('original-src'));
    } else {
      $this.data('original-src', $this.attr('src'));
      $this.attr('src', $this.data('contrast-src'));
    }
  });
};

////doc ready

$(document).ready(function(){
  moment.locale($('html').attr('lang'));

  //// Alerts on front end
  var alert = $('.flash-alert');

  if (alert.length > 0) {
    alert.addClass('visible');
    setTimeout(function(){
      alert.removeClass('visible');
    }, 5000);
  };

  $('.toggle-contrast').click(function(){
    WEBY.toggleContrast();
    WEBY.applyContrast();
    return false;
  });
  ///init
  WEBY.checkContrast();
  WEBY.applyContrast();

});
