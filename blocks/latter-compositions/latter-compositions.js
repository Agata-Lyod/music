var audio1 = $("#sound1")[0];
var audio2 = $("#sound2")[0];
var audio3 = $("#sound3")[0];
$("#play1").click(function() {
    audio1.play();
});
$("#pause1").click(function() {
    audio1.pause();
});
$("#play2").click(function() {
    audio2.play();
}).click(function() {
    audio2.pause();
});
$("#play3").click(function() {
    audio3.play();
}).click(function() {
    audio3.pause();
});
