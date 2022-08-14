var Status="";
input_text="";
function setup(){
canvas = createCanvas(500,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(500,500);
}

function start(){
object_detector = ml5.objectDetector('cocossd',modalloaded);
document.getElementById("status").innerHTML="status:detecting objects";
input_text=document.getElementById("input_id").value;
}

function modalloaded(){
console.log("modal is loaded");
Status=true;
}
 
function draw(){
image(video,0,0,500,500);
if(Status !=""){
object_detector.detect(video,gotresults);
for(i = 0 ; i<objects.length;i++){
document.getElementById("status").innerHTML="status : objects detected";
console.log(objects.length);
fill(orange);
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
noFill();
stroke("red");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label == input_text){
video.stop();
object_detector.detect(gotResults);
document.getElementById("object_found").innerHTML = input_text + "Found";
var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance(input+"Found");
synth.speak(utterThis);

 
    }
else{
document.getElementById("objects_found").innerHTML = input_text + "Not found";
}
        }
    }

}

function gotresults(){
    
if(error){
console.log(error);
}
console.log(results);
objects = results;
    
}


