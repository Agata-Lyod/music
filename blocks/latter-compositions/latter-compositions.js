/*
 * ghindaaudioPlayer - jQuery plugin 1.0.0
 *
 * Copyright (c) 2010 Cristian-Ionut Colceriu
 *
 * www.ghinda.net
 * contact@ghinda.net
 *
 */
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
            var $audio_controls = $('<div class="i-latter-compositions__audio-controls"><a class="i-latter-compositions__audio-play" title="Play/Pause"></a><div class="i-latter-compositions__audio-seek"></div><div class="i-latter-compositions__audio-timer">00:00</div><div class="i-latter-compositions__audio-duration"></div></div>');
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
                if($gAudio.attr('paused') == false) {
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
                if($gAudio.attr('readyState')) {
                    var audio_duration = $gAudio.attr('duration');
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
                            $gAudio.attr("currentTime",ui.value);
                        }
                    });
                    $audio_controls.show();
                } else {
                    setTimeout(createSeek, 150);
                }
            };

            createSeek();
        
            var gTimeFormat=function(seconds){
                var m=Math.floor(seconds/60)<10?"0"+Math.floor(seconds/60):Math.floor(seconds/60);
                var s=Math.floor(seconds-(m*60))<10?"0"+Math.floor(seconds-(m*60)):Math.floor(seconds-(m*60));
                return m+":"+s;
            };
            
            var seekUpdate = function() {
                var currenttime = $gAudio.attr('currentTime');
                if(!seeksliding) $ghinda_audio_seek.slider('value', currenttime);
                $ghinda_audio_timer.text(gTimeFormat(currenttime));
            };

            var duration = $gAudio.attr('duration');
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