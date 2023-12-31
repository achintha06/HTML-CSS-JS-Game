//run sound
var runSound = new Audio("Music /run.mp3");

//jump sound
var jumpSound = new Audio("Music/jump.mp3");

//dead sound
var deadSound = new Audio("Music/dead.mp3");

function keyCheck(event) {
    if (event.which == 13) {
        if (runWorkerId == 0) {
            runWorkerId = setInterval(run, 100);
            runSound.play();
            moveBackgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100);
            createBlockWorkerId = setInterval(createBlock, 100);
            moveBlockWorkerId = setInterval(moveBlock, 100);
        }
    }
    if (event.which == 32) {
        if (jumpWokerId == 0) {
            clearInterval(runWorkerId);
            runWorkerId = -1;
            runSound.pause();
            jumpWokerId = setInterval(jump, 100);
            jumpSound.play();
        }
    }
}

var boyId = document.getElementById("boy");
var runImageNumber = 1;
var runWorkerId = 0;

function run() {
    runImageNumber = (runImageNumber % 8) + 1;
    boyId.src = "Images/Run (" + runImageNumber + ").png";
}

var jumpImageNumber = 1;
var jumpWokerId = 0;
var boyMarginTop = 450;

function jump() {
    jumpImageNumber++;
    if (jumpImageNumber <= 7) {
        boyMarginTop = boyMarginTop - 30;
        boyId.style.marginTop = boyMarginTop + "px";
    }
    if (jumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 30;
        boyId.style.marginTop = boyMarginTop + "px";
    }
    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWokerId);
        runWorkerId = setInterval(run, 100);
        runSound.play();
        jumpWokerId = 0;

        if (scoreWorkerId == 0) {
            scoreWorkerId = setInterval(updateScore, 100);
        }
        if (moveBackgroundWorkerId == 0) {
            moveBackgroundWorkerId = setInterval(moveBackground, 100);
        }
        if (createBlockWorkerId == 0) {
            createBlockWorkerId = setInterval(createBlock, 100);
        }
        if (moveBlockWorkerId == 0) {
            moveBlockWorkerId = setInterval(moveBlock, 100);
        }
    }
    boyId.src = "Images/jump (" + jumpImageNumber + ").png";
}

var backgroundId = document.getElementById("background");
var moveBackgroundWorkerId = 0;
var backgroundX = 0;

function moveBackground() {
    backgroundX = backgroundX - 20;
    backgroundId.style.backgroundPositionX = backgroundX + "px";
}

var scoreId = document.getElementById("score");
var scoreWorkerId = 0;
var newScore = 0;

function updateScore() {
    newScore++;
    scoreId.innerHTML = newScore;
}

var createBlockWorkerId = 0;
var blockId = 1;
var blockMarginLeft = 500;

function createBlock() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";
    document.getElementById("background").appendChild(block);
}

var moveBlockWorkerId = 0;

function moveBlock() {
    for (var i = 1; i <=blockId; i++) {

        var currentBlock = document.getElementById("block" + i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;
        currentBlock.style.marginLeft = newBlockMarginLeft + "px";

        //alert(newBlockMarginLeft)
        //134-34

        if(newBlockMarginLeft < 134 & newBlockMarginLeft >29){

           if(boyMarginTop > 380){

            clearInterval(runWorkerId);
            runSound.pause();

            clearInterval(jumpWokerId);
            jumpWokerId = -1;
            clearInterval(scoreWorkerId);
            clearInterval(moveBackgroundWorkerId);
            clearInterval(createBlockWorkerId);
            clearInterval(moveBlockWorkerId);

            deadWorkerId = setInterval(dead,100);
            deadSound.play();

            //alert("Dead!");
           }
            
            //360
        }
    }
}


//boy Dead
var deadImageNumber =1;
var deadWorkerId =0;

function dead(){

    deadImageNumber++;

    if(deadImageNumber==11 ){
        deadImageNumber=10;

        boyId.style.marginTop= "450px";

        document.getElementById("endScreen").style.visibility = "visible";

        document.getElementById("endScore").innerHTML = newScore;
    }

    boyId.src ="Images/Dead ("+deadImageNumber+").png";
}

//page Reload

function reload(){

    location.reload();
}