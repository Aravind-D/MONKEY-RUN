var monkey, monkey_running
var banana, bananaImage
var obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime
var ground

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}


function setup() {
  createCanvas(600, 600)

  monkey = createSprite(60, 520, 20, 20);
  monkey.addAnimation("monkey running", monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(300, 520, 600, 20);

  foodGroup = createGroup();
  obstacleGroup = createGroup();

  survivalTime = 0;
}



function draw() {
  background("white")

  stroke("black")
  textSize(20)
  fill("black")
  text("Suvival Time = " + survivalTime, 210, 50);
  survivalTime = Math.ceil(frameCount / frameRate());

  //making the monkey jump when space key is pressed.
  if (keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -12;

  }
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.setCollider("circle",0,0)
  //monkey.debug = true
  
  
  monkey.collide(ground)

  ground.velocityX = -4
  ground.x = ground.width / 2;

  foodGroup.setLifetimeEach = -1;
  obstacleGroup.setLifetimeEach = -1

  spawn_food();
  spawn_obstacles();
  drawSprites();
  
  if (monkey.isTouching (foodGroup)) {
    foodGroup.destroyEach();
  }
}

function spawn_food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 200, 20, 20)
    banana.addImage("moving_banana", bananaImage)
    banana.scale = 0.125;
    banana.velocityX = -6;
    banana.y = Math.round(random(100, 200));

    //setting a lifetime to the banana.
    banana.lifetime = 100;

    foodGroup.add(banana);
  }
}

function spawn_obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 455, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -6;

    //setting a lifetime to the obstacle.
    obstacle.lifetime = 120;
  }

}