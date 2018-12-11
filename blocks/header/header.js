// Прокрутка к якорям
$(function(){
  $('a[href^="#"]').on('click', function(event) {
    // отменяем стандартное действие
    event.preventDefault();
    
    var sc = $(this).attr("href"),
        dn = $(sc).offset().top;
    /*
    * sc - в переменную заносим информацию о том, к какому блоку надо перейти
    * dn - определяем положение блока на странице
    */
    
    $('html, body').animate({scrollTop: dn - 70}, 1000);
    
    /*
    * 1000 скорость перехода в миллисекундах
    */
  });
  /* Подготавливаем иконку меню */
    $('#b-header__menu').prepend('<div class="i-header__menu-icon"></div>');
                 /* Включаем навигацию */
    $(".i-header__menu-icon").on("click", function(){
        $(".b-header__menu-items").slideToggle();
        $(this).toggleClass("active");
        $(".i-header__menu-icon").toggleClass("i-header__menu-icon_state_escape");
    });
});