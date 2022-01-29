$(document).ready(function() {

function setNoscroll(){
	$('html').addClass('noscroll');
}
function unsetNoscroll(){
	$('html').removeClass('noscroll');
}
function getScrollBarWidth(){
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild(outer);

  return (w1 - w2);
};
// $('head').append('<style>.noscroll{margin-right: '+getScrollBarWidth()+'px;}</style>');

$('.top-info__btn, .top-menu__btn').on('click', function() {
  if ( $('.top-menu').hasClass('active') ) {
    $('.top-menu').removeClass('active');
    unsetNoscroll()
  }else{
    $('.top-menu').addClass('active');
    setNoscroll()
  }
  return false;
});

});

$(window).on('load', function() {
  $('.sec-header__infoDec').css('height', $('.sec-header__info').outerHeight());
});