$(function() { // Ждём загрузки страницы
    
    $('#button').click(function(){
        $('#my-flex-container').slideUp(1000, function(){    
            $('#result').html("0");
        });
        $('#button2').show(1000, function(){
            $('#result').html("0");
        });
    });

    $('#button1').click(function(){
        $('#my-flex-container').slideUp(1000, function() {
            $('#result').html("0");
        });                                  
        $('#button2').show(1000, function(){
            $('#result').html("0");
        });
    });

    $('#button2').click(function(){
        $('#my-flex-container').slideDown(1000, function() {
            $('#result').html(0);
        });
        $('#button2').hide(1000, function(){
            $('#result').html(0);
        });
    });
});