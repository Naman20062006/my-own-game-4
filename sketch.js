var player,player_run;
var Ground,ground,cloud1,cloud2;
var Wall,wall,Box,box;
var obstacle , Enemy , enemy_run , bird_run , bomb_run
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  player_run = loadAnimation("player1.png", "player2.png");
  enemy_run = loadAnimation("ene1.png", "ene2.png");
  bird_run = loadAnimation("bird.png", "bird2.png");
  bomb_run = loadAnimation("bomb1.png", "bomb2.png");
  ground = loadImage("ground.png");
  cloud1 = loadImage("cloud1.png");
  cloud2 = loadImage("cloud2.png");
  wall = loadImage("wall.png");
  box = loadImage("mystry.png")
}

function setup() {
  createCanvas(600,400)

  player = createSprite(40, 320, 20, 20);
  player.addAnimation("running", player_run);
  player.scale = 0.08
  
  Ground = createSprite(600,370,1000,10)
  Ground.addImage(ground)
  Ground.x = ground.width/2;

  cloudGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(94,146,253);  
  player.collide(Ground);
  if (Ground.x < 0){
    Ground.x = Ground.width/2;
  }



  if(keyDown("space") && player.y >= 259) {
    player.velocityY = -10;
  }

  player.velocityY = player.velocityY + 0.8
  Ground.velocityX = -3;
  
  if(obstacleGroup.isTouching(player )){
    gameState = END;
}

else if (gameState === END) {
//gameOver.visible = true;
//restart.visible = true;


ground.velocityX = 0;
player.velocityY = 0;
obstacleGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
cloudGroup.setLifetimeEach(-1);
obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
}

   spawnCloud()
   spawnEnemy()
  drawSprites();
}


function spawnEnemy() {
  if(frameCount % 80 === 0) {
     obstacle = createSprite(600,330,10,40);
    obstacle.velocityX = -5
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addAnimation("enemy" , enemy_run);
              break;
      case 2: obstacle.addAnimation("bomb" , bomb_run);
             break;
      //case 3: obstacle.addAnimation("bird" , bird_run);
          //   break;
       default: break;
    }
              
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function spawnCloud() {
  if(frameCount % 50 === 0) {
     cloud = createSprite(600,100,10,40);
    cloud.velocityX = -5
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: cloud.addAnimation("enemy" , cloud1);
              break;
      case 2: cloud.addAnimation("bomb" , cloud2);
             break;
       default: break;
    }
              
    cloud.scale = 0.3;
    cloud.lifetime = 300;
    
    cloudGroup.add(cloud);
  }
}