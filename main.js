song = "";

function preload(){
    song = loadSound("music.mp3");
}

scoreleftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoad);
    poseNet.on("pose", gotposes);
}

function modelLoad(){
    console.log("modelo cargado");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[9].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Puntuación de muñeca izquierda " + scoreleftWrist + "Puntuación de la muñeca derecha " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Muñeca izquierda en x = " + leftWristX + "Muñeca izquierda en y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Muñeca derecha en x = " + rightWristX + "Muñeca derecha en y = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#800080");
    stroke("#800080");

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "Velocidad = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Velocidad = 1x";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Velocidad = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Velocidad = 2x";
            song.rate(2);
        }
        else if(rightWristY > 400){
            document.getElementById("speed").innerHTML = "Velocidad = 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volumen = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "Volumen = " + volumen;
        song.setVolume(volumen);
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
