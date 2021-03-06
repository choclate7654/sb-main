var sb,sbImage
var bg,bgImage
var patty,pattyImage,pattygroup;
var ground;
var giantBurger
var PLAY=1;
var END=0;
var gameState=PLAY
var restart,restartImage;
var gameOver,gameOverImage
function preload(){
  sbImage=loadAnimation("images/sb1.png","images/sb3.png","images/sb5.png")
  bgImage=loadImage("images/bg.jpg")
  pattyImage=loadImage("images/pattty.png")
  restartImage=loadImage("images/restart.png")
  gameOverImage=loadImage("images/gameOver.png")
}
function setup()
 {
    createCanvas(1650,1300);

bg=createSprite(1000,700,2600,1000)
bg.addImage(bgImage)
bg.scale=3.5
bg.velocityX=10
bg.x=bg.width/2

ground=createSprite(800,1280,1680,30)
ground.visible=false;

sb=createSprite(1550,950,10,10)
sb.addAnimation("running",sbImage)
sb.scale=1.5;
sb.debug=true;
sb.setCollider("rectangle",15,0,70,100)

giantBurger=createSprite(1600,700,400,400)
pattygroup= new Group()

restart=createSprite(800,700)
restart.addImage(restartImage)
restart.visible=false;
restart.scale=0.5

gameOver=createSprite(800,450)
gameOver.addImage(gameOverImage)
gameOver.visible=false;
   
}

function draw() 
{
  background("peachpuff"); 
  if(gameState===PLAY)
  {
    if(bg.x>1300)
    {
      bg.x=bg.width/2
    }
    if(keyDown("SPACE"))
    {
      sb.velocityY=-10;
    }
      sb.velocityY=sb.velocityY+0.5

    if(keyDown(LEFT_ARROW))
    {
      sb.x=sb.x-3
    }
    if(keyDown(RIGHT_ARROW) &&sb.x<1650)
    {
      sb.x=sb.x+3
    }
        
    sb.collide(ground);
    pattyObstacle()
   
    if(pattygroup.isTouching(sb)){
     gameState=END
    }
  }
  else if(gameState===END){
    bg.velocityX=0;
    sb.velocityX=0;
    sb.velocityY=0;
    pattygroup.setLifetimeEach(-1)
    restart.visible=true;
    gameOver.visible=true
    if(keyDown("r")){
reset()
    }
  }
  drawSprites();
}

function pattyObstacle(){
  if(frameCount%80===0){
    patty=createSprite(0,random(100,1200),30,30)
    patty.setCollider("rectangle",0,0,50,70)
    patty.debug=true;
    patty.addImage(pattyImage)
    patty.velocityX=12
    patty.scale=0.3
    patty.lifetime=200
    pattygroup.add(patty)
  }
  
  
}
function reset(){
  gameState=PLAY
  restart.visible=true;
    gameOver.visible=true
    score=0
}