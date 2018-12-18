$(function() {
    $('.b-slider__slide').swipe( {
    //Generic swipe handler for all directions
        swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
            $(this).next('.b-slider__button-back').trigger('click');
        },
        swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
            $(this).next().next('.b-slider__button-forward').trigger('click');
        },

     });
});

