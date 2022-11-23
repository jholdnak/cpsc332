$("document").ready(function () {
    playSound(0);
    var seconds = 00;
    var tens = 00;
    var $appendTens = $("#tens")
    var $appendSeconds = $("#seconds")
    var $buttonStart = $("#button-start");
    var $buttonStop = $("#button-stop");
    var $buttonReset = $("#button-reset");
    var interval, interval2;

    $buttonStart.click(function () {
        playSound(1);
        $(".timer-background").css("background-color", "#ffa31a");
        clearInterval(interval);
        clearInterval(interval2);
        interval = setInterval(startTimer, 10);
        interval2 = setInterval(animateTimerBackground, 10);
    });

    $buttonStop.click(function () {
        playSound(2);
        if (seconds != 00 || tens != 00)
            $(".timer-background").css("background-color", "#808080");
        clearInterval(interval);
        clearInterval(interval2);
        $(".timer-background").css("opacity", "1");
    });

    $buttonReset.click(function () {
        playSound(3);
        $(".timer-background").css("background-color", "white");
        clearInterval(interval);
        clearInterval(interval2);
        tens = "00";
        seconds = "00";
        $appendTens.html(tens);
        $appendSeconds.html(seconds);
        $(".timer-background").css("opacity", "1");
    });

    function startTimer() {
        tens++;

        if (tens < 9) {
            $appendTens.html("0" + tens);
        }

        if (tens > 9) {
            $appendTens.html(tens);

        }

        if (tens > 99) {
            console.log("seconds");
            seconds++;
            $appendSeconds.html("0" + seconds);
            tens = 0;
            $appendTens.html("0" + 0);
        }

        if (seconds > 9) {
            $appendSeconds.html(seconds);
        }
    }

    function animateTimerBackground() {
        $(".timer-background").animate({opacity: .8}, 500);
        $(".timer-background").animate({opacity: 1}, 500);
    }

    function playSound(track) {
        var audio;
        switch (track) {
            case 0: audio = new Audio("intro.wav"); break;
            case 1: audio = new Audio("sound1.wav"); break;
            case 2: audio = new Audio("sound2.wav"); break;
            case 3: audio = new Audio("sound3.wav"); break;
        }
        audio.play();
    }

    $("p").attr("class", "timer-background")

    $buttonStart.attr("class", "button")
    $buttonStop.attr("class", "button")
    $buttonReset.attr("class", "button")

    $(".wrapper").css("background-color", "#292929")
    $(".wrapper").css("border", "2px solid black");
    $(".wrapper").css("font-family", "Helvetica");
    $(".wrapper").css("text-align", "center");
});