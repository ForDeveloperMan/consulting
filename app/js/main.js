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

$('.btn-modal').on('click', function() {
  let modal = $(this).data('modal');
  $('.modal-def').hide()
  setNoscroll();
  $(modal).fadeIn(300);
  return false;
});

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

if ( $(window).width() > 1000 ) {
  let fixHover = true;
  let fixHoverF;

  function s() {
    fixHover = true;
  }

  $('.main-menu__el_dropdown').on('mouseenter', function() {
    if ( fixHover ) {
      $(this).find('.main-menu__link').addClass('active');
      $(this).find('.main-menu__dropdown').fadeIn(300);
      $('.top-menu-overlay').fadeIn(300);
    }
  });

  $('.main-menu__el_dropdown').on('mouseleave', function() {
    fixHoverF = false;
    if ( fixHover ) {
      fixHover = false;
      $(this).find('.main-menu__link').removeClass('active');
      $(this).find('.main-menu__dropdown').fadeOut(300);
      $('.top-menu-overlay').fadeOut(300);
      fixHoverF = setTimeout(s, 310);
    }
  });
}

const swiper = new Swiper('.block-gallery', {
  slidesPerView: 4,
  spaceBetween: 40,
  navigation: {
    prevEl: '.block-gallery__prev',
    nextEl: '.block-gallery__next',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    601: {
      slidesPerView: 2,
    },
    801: {
      slidesPerView: 4,
    },
  },
});
const swiper2 = new Swiper('.gallery-big-slider', {
  slidesPerView: 1,
  centeredSlides: true,
  effect: "fade",
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
});

$('.modal-def__overlay, .modal-def__close').on('click', function(){
  $(this).closest('.modal-def').fadeOut(300);
  unsetNoscroll();
  return false;
});

$('.block-letters__el, .block-reviews__el').on('click', function(){
  swiper2.slideTo($(this).index());
  $('#modal-gallery').fadeIn(300);
  setNoscroll();
  return false;
});

function checkInp(inp){
  if ( inp.val() === '' || inp.val() === null || inp.val() === undefined ) {
    inp.closest('.form-el').removeClass('active');
  }else{
    inp.closest('.form-el').addClass('active');
  }
}

$('.form-el__inp').blur(function() {
  checkInp($(this));
});
$('.form-el__inp').on('input', function() {
  checkInp($(this));
  if ( $(this).val() === '' ) {
    $(this).closest('.form-el').addClass('active');
  }
});
$('.form-el__inp').on('click', function() {
  $(this).closest('.form-el').addClass('active');
});
$('.form-el__inp').on('focus', function() {
  $(this).closest('.form-el').addClass('active');
});

});

$(window).on('load', function() {
  $('.sec-header__infoDec').css('height', $('.sec-header__info').outerHeight());
});