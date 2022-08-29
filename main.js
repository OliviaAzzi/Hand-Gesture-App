prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera")
function snapshot() {
    Webcam.snap(function (src_of_image) {
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+src_of_image+"'/>"
    });
}
model=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0gZnvrtF-/model.json",model_loaded_function);
function model_loaded_function() {
    console.log("model has loaded")
}
function speak() {
    api=window.speechSynthesis;
    data1="The First Prediction is "+prediction1;
    data2="And Second Prediction is "+prediction2;
    speak_data=new SpeechSynthesisUtterance(data1+data2);
    api.speak(speak_data);
}
function check() {
    img=document.getElementById("captured_image");
    model.classify(img,got_results)
}
function got_results(error,results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        prediction1=results[0].label;
        prediction2=results[1].label;
        document.getElementById("emotion_1").innerHTML=results[0].label;
        document.getElementById("emotion_2").innerHTML=results[1].label;
        speak();
        if (results[0].label=="victory") {
            document.getElementById("emoji_1").innerHTML="&#9996;";
        }
        if (results[0].label=="best") {
            document.getElementById("emoji_1").innerHTML="&#128076;";
        }
        if (results[0].label=="okay") {
            document.getElementById("emoji_1").innerHTML="&#128077;";
        }

        if (results[1].label=="victory") {
            document.getElementById("emoji_2").innerHTML="&#9996;";
        }
        if (results[1].label=="best") {
            document.getElementById("emoji_2").innerHTML="&#128076;";
        }
        if (results[1].label=="okay") {
            document.getElementById("emoji_2").innerHTML="&#128077;";
        }
        
    }
}