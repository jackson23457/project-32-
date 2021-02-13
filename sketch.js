const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var stand1, stand1, ground1;
var box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12, box13, box14, box15, box16, box17, box18;
var polygon1, slingShot;
var score = 0;
var backgroundImg;
var gameState = "on slingshot";
var bg = "Sprites/bg.jpg";

function preload() {
  getBackgroundImg();
  backgroundImg = loadImage("Sprites/bg.jpg");
}

function setup() {
  createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;

  createSprite(400, 200, 50, 50);

  stand1 = new Ground(390,height - 100,200,20);
  stand2 = new Ground(650,height - 200,200,20);
  ground1 = new Ground(400,height + 50,800,20);

  box1 = new Box(400,275,80,80);
  box15 = new Box(620, 185, 80, 80);
  polygon1 = new Polygon(100, 280, 40);

  slingShot = new SlingShot(polygon1.body, {x: 150, y: 150});
}

function draw() {
  if(backgroundImg) {
    background(backgroundImg);
}
  
  noStroke();
  textSize(20);
  fill("white");
  text("SCORE :" + score, 650, 40);
  text("Press the space key for another chance!", 400, 380);

  Engine.update(engine);

  stroke("black");
  box1.score();
  box1.display();
  box15.score();
  box15.display();
  stand1.display();
  stand2.display()
  ground1.display();
  polygon1.display();
  slingShot.display();
}

function mouseDragged(){
  if(gameState!=="launched"){
    Matter.Body.setPosition(polygon1.body, {x: mouseX , y: mouseY});
  }
}

function mouseReleased() {
  slingShot.fly();
  gameState = "launched";
}

function keyPressed() {
  if(keyCode === 32) {
      slingShot.attach(polygon1.body);
      gameState = "on slingshot";
  }
}

async function getBackgroundImg() {
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var date = responseJSON.datetime;
  var hour = date.slice(11, 13);
  if(hour>=06 && hour<=19){
      bg = "Sprites/bg.jpg"
  } else {
      bg = "Sprites/bg1.jpg"
  }
  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}