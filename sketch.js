let canv;

let osc, envelope, fft;

let scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
let note = 0;

let btn0, btn1, btn2, btn3;
let au;
let aux = [];
let auxName = [];
let fft1, fft2;

let n_width = 1600; //1024;
let n_height = 800; // 768;

let peo_0 = [];
let peo_1 = [];
let peo_2 = [];
let peo_3 = [];
let peobody_blue = [];
let peobody_mad = [];
let peobody_sad;

let curFrame0 = 0;
let curFrame = 0;
let curFrame2 = 0;
let curFrame3 = 0;
let curFrame4 = 0;
let curFrame5 = 0;
let i = 0;
let k = 20;
let inst = 0;
let myColor ;
let c1, c2;
let m, m1;
let num = 8;
let col,fcol;

function preload(){
  for(let i = 0; i<10;i++){ //peo_0.length
  let imgName0 = "peabody1_" + nf(i,1) +".png";
    peo_0[i] = loadImage(imgName0);
  }


  for(let i = 0; i<16;i++){ //peo_1.length
  let imgName1 = "peacock_0_7" + nf(i,2) +".png";
    peo_1[i] = loadImage(imgName1);
  }

  for(let i = 0; i<20;i++){ //peo_2.length
  let imgName2 = "peacock_8_2" + nf(i,3) +".png";
    peo_2[i] = loadImage(imgName2);
  }

  for(let i = 0; i<8;i++){ //peo_3.length
  let imgName3 = "peacock_9_08" + nf(i,1) +".png";
    peo_3[i] = loadImage(imgName3);
  }

  for(let i = 0; i<4;i++){ //peobody_blue.length
  let imgName3 = "peacock_9_08_b" + nf(i,1) +".png";
    peobody_blue[i] = loadImage(imgName3);
  }

  for(let i = 0; i<4;i++){ //peobody_mad.length
  let imgName4 = "peacock_mad" + nf(i,1) +".png";
    peobody_mad[i] = loadImage(imgName4);
  }

  peobody_sad = loadImage("peacock_9_08_sad1.png");

  auxName[0] = "01_T_marimba_120bpm_DbMajoj_happy2.mp3";
  auxName[1] = "03_Twinkle_Twinkle_cello.mp3";
  auxName[2] = "07_sad.wav";
  auxName[3] = "06_angry2.wav";

  for( let i = 0; i <4 ; i++){ //aux.length
    aux[i] = loadSound(auxName[i]);
  }
   au = aux[inst];


}

function setup() {

 canv =   createCanvas(1920, 1080); //n_width, n_height
 canv.position(1920/5, 1080/5); // (1920/5, 1080/5)
  frameRate(10);
  colorMode(RGB);
  m =0;
  myColor = color(0);
  c1 = color(0);
  c2 = color(128);

  // au.play();
  fft = new p5.FFT();
  col = color(96,100,198);
  fcol = color(255,255,255);
//buttons
btn0 = createButton('마림바_____Marimba');
btn0.style('width', '200px');
btn0.style('height', '25px');
btn0.style('background-color', col);
btn0.style('border', '0px');
btn0.style('color', fcol);
btn0.position(50,700);
btn0.mousePressed(Marimba);

btn1 = createButton('첼로_____Cello');
btn1.style('width', '200px');
btn1.style('height', '25px');
btn1.style('background-color', col);
btn1.style('border', '0px');
btn1.style('color', fcol);
btn1.position(270,700);
btn1.mousePressed(Cello);

btn2 = createButton('피아노_____Piano');
btn2.style('width', '200px');
btn2.style('height', '25px');
btn2.style('background-color', col);
btn2.style('border', '0px');
btn2.style('color', fcol);
btn2.position(490,700);
btn2.mousePressed(Piano);

btn3 = createButton('신디사이저_____Synth');
btn3.style('width', '200px');
btn3.style('height', '25px');
btn3.style('background-color', col);
btn3.style('border', '0px');
btn3.style('color', fcol);
btn3.position(710,700);
btn3.mousePressed(Synth);
/*
  osc = new p5.Oscillator();

  // Instantiate the envelope
  envelope = new p5.Envelope();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  osc.start();

  fft = new p5.FFT();
 noStroke();
 */
}

function draw() {

  background(0);

  myColor = lerpColor(c1,c2,m);
  m += (1-m)*0.1;

 curFrame0 = (curFrame0 + 1) % peo_0.length;
 curFrame = (curFrame + 1) % peo_1.length;
 curFrame2 = (curFrame2 + 1) % peo_2.length;
 curFrame3 = (curFrame3 + 1)  % peobody_blue.length;
 curFrame4 = (curFrame4 + 1) % peo_3.length;
 curFrame5 = (curFrame5 + 1) % peobody_mad.length;


let spectrum = fft.analyze();

colorMode(HSB);

  stroke(i, 255,255); //i
  fill(i, 255,255); //i
  push();
   beginShape();
   for( let j = 0; j<spectrum.length/num; j++){ // num 변수화 적을수록 가시 많아짐// fft.specSize()8
    stroke(j,255,255);
      let leng = random(0.1,1.1);
    strokeWeight(leng);
    let angle = map(j,0, 512, 0,360);
    let freqAmp =spectrum[j];
    let calFF =  freqAmp/1024*44100;// *44100;//
    let r = map(freqAmp, 0, 200,10, 200); //변수화 100 적을수록 많이 움직임
    //let r = map(freqAmp, 0, 100,10, 500);
    let x =  n_width /2+200 +r*cos(angle); // 변수화 2 + 값 50에서 커질수록 큰원
    let y = n_height /2-50 +r*sin(angle); //
    let rad = random(5,20);
//  console.log(freqAmp);
 // noFill();
console.log(leng);

   line(n_width /2+200,n_height/2+50, x,y); // // 변수화 2 + 값 100에서 커질수록 큰원

  // curveVertex(x,y);
   ellipse(x,y,rad,rad);

   translate(n_width /2+500,n_height/2+50);
   rotate(-10);
   line(n_width /2+100,n_height /2+50, x,y);

 }
 endShape(CLOSE);
 pop();
 i++;
 if(i >= 255) i = 0;
//colorMode(RGB);
tint(myColor);
//console.log(myColor);

if(inst == 0){

  image(peo_3[curFrame4],-150,0);
 noTint();
  image(peobody_blue[curFrame3], 50,150);

//num = 8;
}else if( inst == 1){
    image(peo_1[curFrame], -150, 0);
       noTint();
  image(peobody_blue[curFrame3], 50,150);
 //num = 16;
  }else if(inst == 2){

    push();
    scale(0.7);
    image(peo_0[curFrame0], 350,370);
    pop();
    noTint();
    image(peobody_sad, 50,150);
  //num = 24;
  }else if(inst == 3){
 image(peo_2[curFrame2], -150,0);
  noTint();
  image(peobody_mad[curFrame5], 50,150);;
 //num = 12;
  }


  /*
au = aux[inst];
if (au.isPlaying()) {
    // .isPlaying() returns a boolean
    au.stop();
  } else {
   au.play();
 }
/*
  if (frameCount % 60 === 0 || frameCount === 1) {
    let midiValue = scaleArray[note];
    let freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);

    envelope.play(osc, 0, 0.1);
    note = (note + 1) % scaleArray.length;
  }

  // plot FFT.analyze() frequency analysis on the canvas
  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length / 20; i++) {
    fill(spectrum[i], spectrum[i] / 10, 0);
    let x = map(i, 0, spectrum.length / 20, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, spectrum.length / 20, -h);
  }
  */


}

function Marimba(){
  colorMode(RGB);
  c1 = c2;
  c2 = color(246,147,156);
  if(!au.isPlaying())  {
    inst = 0;
    au = aux[inst];
    au.play();
  }else{
    au.pause();
  //  au.rewind();
  }

}

function Cello(){

  colorMode(RGB);
  c1 = c2;
 c2 = color(108,124,73);

  if(!au.isPlaying())  {
    inst = 1;
    au = aux[inst];
  au.play();
  }else{
    au.pause();
  //  au.rewind();
  }
}

function Piano(){

  colorMode(RGB);
  c1 = c2;
  c2 = color(59,83,94);

  if(!au.isPlaying())  {
  inst = 2;
  au = aux[inst];
  au.play();
  }else{
    au.pause();
  //  au.rewind();
  }
}

function Synth(){

  colorMode(RGB);
  c1 = c2;
  c2 = color(188,50,47);
  if(!au.isPlaying())  {
  inst = 3;
  au = aux[inst];
  au.play();
  }else{
    au.pause();
  //  au.rewind();
  }
}
