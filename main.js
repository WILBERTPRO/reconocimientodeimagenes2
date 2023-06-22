function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('mobileNet',modelLoaded);
}

function draw() {
  image(video,0,0,300,300);
  classifier.classify(video,gotResults);
}

function modelLoaded() {
  console.log('Model Loaded');
}

function gotResults(error,Results) {
  if(error) {
    console.error(error);
  }else {
   if ((results[0].confidence > 0.5) && (previous_result != results[0].label)){
    console.log (results);
    previous_result =results[0].label;
    var synth = window.speechSynthesis;
    speak_data = 'El objeto detectado es - '+results[0].label;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

    document.getElementById("result_objet_name").innerHTML = results[0].label;
    document.getElementById("result_objet_name").innerHTML = results[0].confidence.toFixed(3);
   }
  }
}