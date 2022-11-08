var color1 = "#ffa31a";

window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var gameState, gameStateStatus = true;
    var ballRadius = 10;
    var speed = 1;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 5;
    var brickColumnCount = 3;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var score = 0;
    var highScore = 0;
    var lives = 3;

    var bricks = [];

    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    document.getElementById("togglePauseGameButton").addEventListener("click", togglePauseGame, false)
    document.getElementById("reloadWindowButton").addEventListener("click", document.location.reload, false)
    document.getElementById("continueButton").addEventListener("click", function() {
        startNewGame(3);
    }, false)
    document.getElementById("speedSlider").addEventListener("mousemove", adjustGameSpeed, false)
    document.getElementById("resetButton").addEventListener("click", function() {
        resetBoard(3);
    }, false)

    function keyDownHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = true;
        }
        else if (e.keyCode == 37) {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }

    function collisionDetection() {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        playSound();
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (score == brickRowCount * brickColumnCount) {
                            //TODO: draw message on the canvas
                            checkWinState();
                            //TODO: pause game instead of reloading
                            resetBoard(3);
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = color1;
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = color1;
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = color1;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function drawScore() {
        ctx.font = "bold 16px Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + score, 60, 20);
    }

    function drawLives() {
        ctx.font = "bold 16px Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawHighScore();
        drawLives();
        collisionDetection();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if (lives <= 0) {
                    //TODO: draw message on the canvas
                    var image = new Image();
                    image.src = "https://cdn141.picsart.com/255323250012212.png";
                    image.onload = function(){
                        ctx.drawImage(image, 0, 0);
                    }
                    //TODO: pause game instead of reloading
                }
                else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        //TODO: adjust speed
        x += (dx * speed);
        y += (dy * speed);

        //TODO: pause game check

        gameState = requestAnimationFrame(draw);
    }

    /*
        Additions to starter code
    */

    //Additional variables used to help make dimensions/locations easier to reuse
    //controls game speed
    //pause game variable
    //high score tracking variables
    //other variables?

    //event listeners added
    //game speed changes handler
    //pause game event handler
    //start a new game event handler
    //continue playing
    //reload click event listener

    //Drawing a high score
    function drawHighScore() {
        ctx.beginPath();
        ctx.rect(canvas.width - 275, 5, 115, 20);
        ctx.fillStyle = color1;
        ctx.fill();
        ctx.closePath();
        if (score >= highScore) {
            highScore = score;
        }
        ctx.fillStyle = "#1b1b1b"
        ctx.fillText("High Score: " + highScore, canvas.width - 275, 20);
    }

    //draw the menu screen, including labels and button
    function drawMenu() {
        //draw the rectangle menu backdrop
        //draw the menu header

        //start game button area

        //event listener for clicking start
        //need to add it here because the menu should be able to come back after
        //we remove the it later
        var logo = new Image();
        logo.src = "logo.png";
        logo.onload = function(){
            ctx.drawImage(logo, 0, 0);
        }
        //set up and style "button"
        ctx.fillStyle = color1;
        //note the specific coords being used
        ctx.fillRect(canvas.width-290,150,115,40);
        //another text label
        ctx.font = "bold 14pt Helvetica";
        ctx.fillStyle = "white";
        //draw the text
        ctx.fillText("Start",canvas.width-254,177,115);
        canvas.addEventListener("click", startGameClick)
    }

    //function used to set shadow properties
    function setShadow() {

    };

    //function used to reset shadow properties to 'normal'
    function resetShadow() {

    };

    //function to clear the menu when we want to start the game
    function clearMenu() {
        //remove event listener for menu,
        //we don't want to trigger the start game click event during a game
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //function to start the game
    //this should check to see if the player clicked the button
    //i.e., did the user click in the bounds of where the button is drawn
    //if so, we want to trigger the draw(); function to start our game
    function startGameClick(event) {
        // ,150,115,40
        var xVal = event.pageX - canvas.offsetLeft,
            yVal = event.pageY - canvas.offsetTop;

        if (yVal > 150 &&
            xVal > canvas.width-290 &&
            yVal < (150 + 110) &&
            xVal < canvas.width-290 + 305) {
                canvas.removeEventListener("click", startGameClick, false);
                clearMenu();
                draw();
        }
    };

    //function to handle game speed adjustments when we move our slider
    function adjustGameSpeed() {
        //update the slider display
        //update the game speed multiplier
        speed = parseFloat(document.getElementById("speedSlider").value);
        document.getElementById("speedDisplay").innerText = String(speed);
    };

    //function to toggle the play/paused game state
    function togglePauseGame() {
        //toggle state
        //if we are not paused, we want to continue animating (hint: zyBook 8.9)
        if (gameStateStatus == true) {
            gameStateStatus = false;
            cancelAnimationFrame(gameState);
        }
        else if (gameStateStatus == false) {
            gameStateStatus = true;
            gameState = requestAnimationFrame(draw);
        }
    };

    //function to check win state
    //if we win, we want to accumulate high score and draw a message to the canvas
    //if we lose, we want to draw a losing message to the canvas
    function checkWinState() {
        var image = new Image();
        image.src = "https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/681e156ae971bd4.png";
        image.onload = function(){
            ctx.drawImage(image, 0, 0);
        }
    };

    //function to clear the board state and start a new game (no high score accumulation)
    function startNewGame(resetScore) {
        cancelAnimationFrame(gameState)
        gameStateStatus = false;
        canvas.removeEventListener("click", startNewGame, false);
        // canvas = document.getElementById("myCanvas");
        // ctx = canvas.getContext("2d");
        // ballRadius = 10;
        // speed = 1;
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        // paddleHeight = 10;
        // paddleWidth = 75;
        // paddleX = (canvas.width - paddleWidth) / 2;
        rightPressed = false;
        leftPressed = false;
        brickRowCount = 5;
        brickColumnCount = 3;
        brickWidth = 75;
        brickHeight = 20;
        brickPadding = 10;
        brickOffsetTop = 30;
        brickOffsetLeft = 30;
        score = resetScore;
        lives = 3;
        gameStateStatus = true;
        gameState = draw();
    };

    //function to reset the board and continue playing (accumulate high score)
    //should make sure we didn't lose before accumulating high score
    function continuePlaying() {

    };

    //function to reset starting game info
    function resetBoard(resetLives) {
        cancelAnimationFrame(gameState)
        gameStateStatus = false;
        // canvas = document.getElementById("myCanvas");
        // ctx = canvas.getContext("2d");
        // ballRadius = 10;
        // speed = 1;
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        // paddleHeight = 10;
        // paddleWidth = 75;
        // paddleX = (canvas.width - paddleWidth) / 2;
        rightPressed = false;
        leftPressed = false;
        brickRowCount = 5;
        brickColumnCount = 3;
        brickWidth = 75;
        brickHeight = 20;
        brickPadding = 10;
        brickOffsetTop = 30;
        brickOffsetLeft = 30;
        score = 0;
        lives = resetLives;

        for (var c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (var r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        gameState = requestAnimationFrame(draw);
        gameStateStatus = true;
    };

    function introMusic() {
        var audio = new Audio("intro.wav");
        audio.play();
    }

    function playSound() {
        var audio, randInt = Math.floor(Math.random()*4) + 1;
        if (randInt == 1)
            audio = new Audio('sound1.wav')
        else if (randInt == 2)
            audio = new Audio('sound2.wav');
        else if (randInt == 3)
            audio = new Audio('sound3.wav')
        else if (randInt == 4)
            audio = new Audio('sound4.wav')
        audio.play();
    }

    //draw the menu.
    //we don't want to immediately draw... only when we click start game
    introMusic();
    drawMenu();

};//end window.onload function