song1="";
song2="";
ScoreLeftWrist=0;
ScoreRightWrist=0;
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;

function preload() {
    song1= loadSound("Harry_Potter_Theme.mp3");
    song2= loadSound("Peter Pan and the Pirates.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        ScoreRightWrist=results[0].pose.keypoints[10].score
        ScoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("ScoreRightWrist = "+ScoreRightWrist+"ScoreLeftWrist = "+ScoreLeftWrist);

        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX ="+rightWristX+" rightWristY ="+rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX ="+leftWristX+" leftWristY ="+leftWristY);
    }
}

function draw() {
  image(video,0,0,600,500);
  fill("#FF0000");
  stroke("#FF0000");  
  circle(rightWristX,rightWristY,20);
  if(ScoreRightWrist>0.2){
 
   if(rightWristY>100 && rightWristY<=200){
      document.getElementById("song").innerHTML = "Song = Harry Potter"+song1;
     song.isPlaying(true)
    }
 

 }
 circle(leftWristX,leftWristY,20);
     if(ScoreLeftWrist > 0.2) {
     
      if(leftWristY>100 && leftWristY<=200){
      document.getElementById("speed").innerHTML = "Song = Peter Pan";
     
    }
 

   }
}

function play() {
   if(leftWristX > rightWristX) {
   song1.play();
}else {
    song2.play()
}
song.setVolume(1);
song.rate(1);  
}