var trex,trexImage,trexcollidedImage;
var ground, groundImage;
var ig;
var obstacles,clouds;
var obs,cloud;
var r,r1,obsImage1,obsImage2,obsImage3,obsImage4,obsImage5,obsImage6;
var cloudImage;
var score;
var restartImg,restart;
var gameoverimg,gameover;
var jumpsound,diesound,checksound;
function preload()
{
  trexImage = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcollidedImage = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3");
  checksound = loadSound("checkPoint.mp3");
  obsImage1 = loadImage("obstacle1.png");
  obsImage2 = loadImage("obstacle2.png");
  obsImage3 = loadImage("obstacle3.png");
  obsImage4 = loadImage("obstacle4.png");
  obsImage5 = loadImage("obstacle5.png");
  obsImage6 = loadImage("obstacle6.png");
  
  cloudImage = loadImage("cloud.png");
  
  restartImg = loadImage("restart.png");
  gameoverimg = loadImage("gameOver.png");
  
}

function setup()
{
  createCanvas(600,200);
  
  trex = createSprite(50,150,10,10);
  trex.addAnimation("trex_running",trexImage);
  trex.addAnimation("trex_collided",trexcollidedImage);
  trex.scale = 0.4;
   
  ground = createSprite(300,150,600,10);
  ground.addImage(groundImage);
  ground.velocityX = -6;
  ground.x = ground.width/2;
  
  ig = createSprite(300,160,600,10);
  ig.visible = false;
  
  obstacles = new Group();
  clouds = new Group();
  
  gameover = createSprite(300,70,10,10);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;
  gameover.visible = false;
  
  restart = createSprite(300,100,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  score = 0;
  
  PLAY = 1;
  END = 0;
  gs = PLAY;
  
}
function draw()
{
  background(180);
  

    
  trex.collide(ig);
  
  
  if(ground.x<0)
  {
    ground.x = ground.width/2;
  }
  
  if(gs == PLAY)
  {
    spawnObstacles();
    spawnclouds();
    score =  score + Math.round(getFrameRate()/60);
    //console.log(trex.y);
    if(keyDown("space")&&trex.y>135)
  {
    trex.velocityY = -12;
    jumpsound.play();
  }
   
  trex.velocityY = trex.velocityY + 0.8;
    
    if(trex.isTouching(obstacles))
    {
      gs = END;
      diesound.play();
      
    }
    
  }
  if(gs == END)
  {
    trex.velocityY = 0;
    trex.changeAnimation("trex_collided",trexcollidedImage);
    ground.velocityX = 0;
      obstacles.setLifetimeEach(-1);
      clouds.setLifetimeEach(-1);
    obstacles.setVelocityXEach(0);
    clouds.setVelocityXEach(0);
    
    restart.visible = true;
    gameover.visible = true;
  }
  if(mousePressedOver(restart) && gs == END)
  {
    gs = PLAY;
    reset();
  }
  if(score>0 && score%100==0)
  {
    checksound.play();
  }
  
  
  
  
  
  drawSprites();
  text("SCORE :" + score,270,180);
}

function spawnObstacles()
{
  if(frameCount % 60 == 0)
  {
  obs = createSprite(600,140,10,10);
  obs.scale = 0.5;
  obs.lifetime = 300;
  obstacles.add(obs);
  obs.velocityX = -6;
  r = random(1,6);
  r1 = Math.round(r);
  if(r1 == 1)
  {
    obs.addImage(obsImage1);
  }
  else if(r1 == 2)
  {
    obs.addImage(obsImage2);
  }
  else if(r1 == 3)
  {
    obs.addImage(obsImage3);
  }
  else if(r1 == 4)
  {
    obs.addImage(obsImage4);
  }
  else if(r1 == 5)
  {
    obs.addImage(obsImage5);
  }
  else 
  {
    obs.addImage(obsImage6);
  }
  }
  
  
}
 
function spawnclouds()
{
  if(frameCount % 60 == 0)
  {
    cloud = createSprite(600,random(20,100),10,10);
    cloud.addImage(cloudImage);
    cloud.lifetime = 300;
    cloud.scale = 0.5;
    cloud.velocityX = -6;
    clouds.add(cloud);
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
  }
}

function reset()
{
  score = 0;
  ground.velocityX = -6;
  trex.changeAnimation("trex_running",trexImage);
  gameover.visible = false;
  restart.visible = false;
  obstacles.destroyEach();
  clouds.destroyEach();
}
  
























