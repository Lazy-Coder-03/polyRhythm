let lineWidth;
let animationSpeed;
let arcs = [];
let sound = [];
let soundEnabled = false;
let playing = false;
let colors = [];
let bgimg;

function preload() {
  // put preload code here
  bgimg = loadImage("assets/fullbg.jpg");
  sound[0] = loadSound("assets/c2[0].mp3");
  sound[1] = loadSound("assets/d2[1].mp3");
  sound[2] = loadSound("assets/e2[2].mp3");
  sound[3] = loadSound("assets/f2[3].mp3");
  sound[4] = loadSound("assets/g2[4].mp3");
  sound[5] = loadSound("assets/a2[5].mp3");
  sound[6] = loadSound("assets/b2[6].mp3");
  sound[7] = loadSound("assets/c3[7].mp3");
  sound[8] = loadSound("assets/d3[8].mp3");
  sound[9] = loadSound("assets/e3[9].mp3");
  sound[10] = loadSound("assets/f3[10].mp3");
  sound[11] = loadSound("assets/g3[11].mp3");
  sound[12] = loadSound("assets/a3[12].mp3");
  sound[13] = loadSound("assets/b3[13].mp3");
  sound[14] = loadSound("assets/c4[14].mp3");
  sound[15] = loadSound("assets/d4[15].mp3");
  sound[16] = loadSound("assets/e4[16].mp3");
  sound[17] = loadSound("assets/f4[17].mp3");
  sound[18] = loadSound("assets/g4[18].mp3");
  sound[19] = loadSound("assets/a4[19].mp3");
  sound[20] = loadSound("assets/b4[20].mp3");
  for (let i = 0; i < sound.length; i++) {
    sound[i].setVolume(0.05);
    sound[i].playMode("sustain");
  }
  // sound[0].setVolume(0.1)
  // sound[1].setVolume(0.1)
  //sound[0].playMode("restart");
  //sound[1].playMode("restart");
  //sound[0].playMode('sustain');
  //sound[1].playMode('sustain');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colors[0] = "#58EFEC"; //color(255,0,0)
  colors[1] = "#5FE8E7"; //color(255,128,0)
  colors[2] = "#66E0E3"; //color(255,255,0)
  colors[3] = "#6ED9DE"; //color(128,255,0)
  colors[4] = "#75D2DA"; //color(0,255,0)
  colors[5] = "#7CCAD5"; //color(0,255,128)
  colors[6] = "#83C3D0"; //color(0,255,255)
  colors[7] = "#8ABCCC"; //color(0,128,255)
  colors[8] = "#92B4C7"; //color(0,0,255)
  colors[9] = "#99ADC3"; //color(128,0,255)
  colors[10] = "#A0A6BE"; //color(255,0,255)
  colors[11] = "#A79EB9"; //color(255,0,128)
  colors[12] = "#AE97B5"; //color(255,0,0)
  colors[13] = "#B68FB0"; //color(255,128,0)
  colors[14] = "#BD88AC"; //color(255,255,0)
  colors[15] = "#C481A7"; //color(128,255,0)
  colors[16] = "#CB79A2"; //color(0,255,0)
  colors[17] = "#D2729E"; //color(0,255,128)
  colors[18] = "#DA6B99"; //color(0,255,255)
  colors[19] = "#E16395"; //color(0,128,255)
  colors[20] = "#E85C90"; //color(0,0,255)

  background(bgimg);
  //set the line width to 80% of the width
  frameRate(60);
  let totalTime = 300; //10mins
  animationSpeed = PI / (60 * totalTime); //outer arc completes one cycle in 10 seconds 10*60=600 frames
  lineWidth = 0.9 * min(width,height);
  let n = 21;
  for (let i = 1; i <= n; i++) {
    arcs[i] = new musicArc(
      width / 2,
      height * 0.5,
      lineWidth * i * (1 / n),
      i,
      animationSpeed
    );
  }
  //arcs[0] = new musicArc(width/2, 0.9*height, lineWidth*0.1);
  //arcs[1] = new musicArc(width/2, 0.9*height, lineWidth*0.2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(bgimg);
    lineWidth = 0.9 * min(width,height);
}

function mouseClicked() {
  soundEnabled = !soundEnabled;
  playing = !playing;
}

function draw() {
  background(bgimg);
  if (playing) {
    for (let i = 1; i < arcs.length; i++) {
      arcs[i].animatePoint();
      arcs[i].draw();
    }
  } else {
    stroke(255);
    fill("gold");
    textSize(32);
    textAlign(CENTER, CENTER);

    text("Click to play", width / 2, height / 2);
  }
}

function pointTouchLine(ptx, pty, linex1, liney1, linex2, liney2) {
  //find the distance of the point from the line
  let d =
    abs(
      (linex2 - linex1) * (liney1 - pty) - (linex1 - ptx) * (liney2 - liney1)
    ) /
    sqrt(
      (linex2 - linex1) * (linex2 - linex1) +
        (liney2 - liney1) * (liney2 - liney1)
    );
  if (d < 1) {
    return true;
  } else {
    return false;
  }
}

class musicArc {
  constructor(cx, cy, radius, i, animationSpeed) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.i = i;
    this.animationSpeed = animationSpeed;
    this.innerBounces = 60;
    this.speed = this.animationSpeed * (this.innerBounces - this.i);
    this.angle = PI;
    this.cycle = 0;
    this.halfCycle = 0;
    this.prevX = this.cx + (this.radius / 2) * cos(PI);
    this.soundPlayed = false;
    this.soundPlayed = false;
    this.soundDuration = 200; // Duration in milliseconds (adjust as needed)
    this.lastSoundTime = 0;
    //console.log(this.i+" created"+"with speed "+this.speed)
  }

  animatePoint() {
    this.angle += this.speed;
    //this.angle = this.angle % (2 * PI);
    let maxAngle = 2 * PI;

    let modDistance = this.angle % (2 * PI);

    let adjustedAngle =
      modDistance >= PI ? modDistance : maxAngle - modDistance;

    let x = this.cx + (this.radius / 2) * cos(modDistance);
    let y = this.cy + (this.radius / 2) * sin(modDistance);

    stroke(255);
    strokeWeight(10);
    point(x, y);
    let tolerance = 0.05; // Adjust as needed

    // Check if the point is within the tolerance range of PI or 2*PI
    if (
      !this.soundPlayed &&
      (abs(modDistance - PI) < tolerance ||
        abs(modDistance - 2 * PI) < tolerance)
    ) {
      // Play the sound when the point touches the line within the tolerance range
      if (soundEnabled) {
        sound[this.i - 1].play();
        this.soundPlayed = true;
        this.lastSoundTime = millis(); // Record the time when the sound was played
      }
    }

    // Check if the elapsed time since the sound was played exceeds the sound duration
    if (
      this.soundPlayed &&
      millis() - this.lastSoundTime >= this.soundDuration
    ) {
      this.soundPlayed = false; // Reset the flag after the specified duration
    }
  }

  draw() {
    let modDistance = this.angle % (2 * PI);
    let x = this.cx + (this.radius / 2) * cos(modDistance);
    let y = this.cy + (this.radius / 2) * sin(modDistance);

    strokeWeight(2);
    stroke(255, 100);
    if (this.soundPlayed) {
      strokeWeight(3);
      stroke(colors[this.i - 1]);
      fill(colors[this.i - 1]);
      ellipse(x, y, 20);
      stroke(colors[this.i - 1]);
    } else {
      strokeWeight(1);
      stroke(255, 100);
    }

    noFill();
    ellipse(this.cx, this.cy, this.radius);
    //arc(this.cx, this.cy, this.radius, this.radius, PI, 2 * PI);
    strokeWeight(3);
    stroke(255, 100);
    for (let i = 1; i <= 21; i++) {
      stroke(colors[i - 1]);
      strokeWeight(1);
      noFill();
      ellipse(this.cx + (lineWidth * i * (1 / 21)) / 2, this.cy, lineWidth*(1/50));
      ellipse(this.cx - (lineWidth * i * (1 / 21)) / 2, this.cy, lineWidth*(1/50));
      //arc(this.cx, this.cy, this.radius, this.radius, PI+(i*PI/10), PI+((i+1)*PI/10));
    }
    //ellipse(this.cx, this.cy, this.radius / 2);

    // line that denotes the radius of the largest arc
    //line(this.cx, this.cy, this.cx + this.radius / 2, this.cy);
    //diameter line
    // line(
    //   this.cx - this.radius / 2,
    //   this.cy,
    //   this.cx + this.radius / 2,
    //   this.cy
    // );
  }
}
