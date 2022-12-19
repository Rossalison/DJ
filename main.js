song = "";

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

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Puntuación de muñeca izquierda" + scoreleftWrist);
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
    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volumen = remove_decimals / 500;
    document.getElementById("volume").innerHTML = "Volumen = " + volumen;
    song.setVolume(volumen);
    }

}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoad(){
    console.log("modelo cargado");
}


