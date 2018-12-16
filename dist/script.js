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
    
    $('html, body').animate({scrollTop: dn - 90}, 1000);
    
    /*
    * 1000 скорость перехода в миллисекундах
    */
  });
  /* Подготавливаем иконку меню */
    $('.b-header__menu').prepend('<div class="i-header__menu-icon"></div>');
                 /* Включаем навигацию */
    $(".i-header__menu-icon").on("click", function(){
        $(".b-header__menu-items").slideToggle();
        $(this).toggleClass("active");
        $(".i-header__menu-icon").toggleClass("i-header__menu-icon_state_escape");
    });
});
(function($) {
    // plugin definition
    $.fn.gAudio = function(options) {       
        // build main options before element iteration      
        var defaults = {
            theme: 'simpledark',
            childtheme: ''
        };
        var options = $.extend(defaults, options);
        // iterate and reformat each matched element
        return this.each(function() {
            var $gAudio = $(this);
            
            //create html structure
            //main wrapper
            var $audio_wrap = $('<div></div>').addClass('i-latter-compositions__audio-player').addClass(options.theme).addClass(options.childtheme);
            //controls wraper
            var $audio_controls = $('<div class="i-latter-compositions__audio-controls"><a class="i-latter-compositions__audio-play" title="Play/Pause"></a><div class="i-latter-compositions__audio-seek"></div><div class="i-latter-compositions__audio-timer">0:00</div><div class="i-latter-compositions__audio-duration"></div></div>');
            $gAudio.wrap($audio_wrap);
            $gAudio.after($audio_controls);
            
            //get new elements
            var $audio_container = $gAudio.parent('.i-latter-compositions__audio-player');
            var $audio_controls = $('.i-latter-compositions__audio-controls', $audio_container);
            var $ghinda_play_btn = $('.i-latter-compositions__audio-play', $audio_container);
            var $ghinda_audio_seek = $('.i-latter-compositions__audio-seek', $audio_container);
            var $ghinda_audio_timer = $('.i-latter-compositions__audio-timer', $audio_container);
            var $ghinda_audio_duration = $('.i-latter-compositions__audio-duration', $audio_container);

            $audio_controls.hide(); // keep the controls hidden
                        
            var gPlay = function() {
                if($gAudio.prop('paused') == false) {
                    $gAudio[0].pause();
                } else {
                    $gAudio[0].play();
                }
            };
            
            $ghinda_play_btn.click(gPlay);
            $gAudio.click(gPlay);
            
            $gAudio.bind('play', function() {
                $ghinda_play_btn.addClass('i-latter-compositions__paused-button');
            });
            $gAudio.bind('pause', function() {
                $ghinda_play_btn.removeClass('i-latter-compositions__paused-button');
            });
            $gAudio.bind('ended', function() {
                $ghinda_play_btn.removeClass('i-latter-compositions__paused-button');
            });
            
            var seeksliding;
            var createSeek = function() {
                if($gAudio.prop('readyState')) {
                    var audio_duration = $gAudio.prop('duration');
                    $ghinda_audio_seek.slider({
                        value: 0,
                        step: 0.01,
                        orientation: "horizontal",
                        range: "min",
                        max: audio_duration,
                        animate: true,
                        slide: function(){
                            seeksliding = true;
                        },
                        stop:function(e,ui){
                            seeksliding = false;
                            $gAudio.prop("currentTime",ui.value);
                        }
                    });
                    $audio_controls.show();
                } else {
                    setTimeout(createSeek, 150);
                }
            };

            createSeek();
        
            var gTimeFormat=function(seconds){
                var m=Math.floor(seconds/60)<10?""+Math.floor(seconds/60):Math.floor(seconds/60);
                var s=Math.floor(seconds-(m*60))<10?"0"+Math.floor(seconds-(m*60)):Math.floor(seconds-(m*60));
                return m+":"+s;
            };
            
            var seekUpdate = function() {
                var currenttime = $gAudio.prop('currentTime');
                if(!seeksliding) $ghinda_audio_seek.slider('value', currenttime);
                $ghinda_audio_timer.text(gTimeFormat(currenttime));
            };

            var duration = $gAudio.prop('duration');
            $ghinda_audio_duration.text(gTimeFormat(duration));
            
            
            $gAudio.bind('timeupdate', seekUpdate); 
            
            $gAudio.removeAttr('controls');
            
        });
    };
    //
    // plugin defaults
    //
    $.fn.gAudio.defaults = {
    };

})(jQuery);
$(function(){
    setTimeout(getPlayer,1000);
    function getPlayer() {
        $('#audio1').gAudio();
        $('#audio2').gAudio();
        $('#audio3').gAudio();
    }
});

$(function() {
  $("#slider_1+.b-slider__slide").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      $(this).slideToggle("You swiped " + direction );  
    }
  });

  //Set some options later
  $("#test").swipe( {fingers:2} );
});