$(document).ready(function() { // Ждём загрузки страницы
    
    $('#button').click(function(){
        $('#my-flex-container').slideUp(1400, function(){    
            $('#result').html("0");
        });
        $('#button2').show(1400, function(){
            $('#result').html("0");
        });
    });

    $('#button1').click(function(){
        $('#my-flex-container').slideUp(1400, function() {
            $('#result').html("0");
        });                                  
        $('#button2').show(1400, function(){
            $('#result').html("0");
        });
    });

    $('#button2').click(function(){
        $('#my-flex-container').slideDown(1400, function() {
            $('#result').html(0);
        });
        $('#button2').hide(1400, function(){
            $('#result').html(0);
        });
    });
});