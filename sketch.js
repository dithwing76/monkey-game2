var backImage,backgr;
var player, player_running;
var ground,ground_img;

var scanner
var END =0;
var PLAY =1;
var gameState = PLAY;


var rock  ,rockimg 
var rockGroup

var num

var banana, bananaimg
var bananaGroup

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  rockimg = loadImage("stone.png")
  bananaimg = loadImage("banana.png")
}

function setup() {
  createCanvas(800,400);
  rockGroup =createGroup()
  rock = createSprite(-100,-100,10,10)

  num =1

  bananaGroup =createGroup()
  banana =createSprite(-100,-100,10,10)

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,50,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  player.setCollider("rectangle",0,10,10,50)

  scanner =createSprite(player.x,player.y-20,20,50)
  scanner.visible =false
  //player.debug=true

  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);
  //player.setCollider("rectangle",0,10,20,50)

  if(gameState===PLAY){//------------------------------------------PLAAAAAAAAAAAAAAAAAAY----------------------------------
  scanner.y =player.y+10
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space")&&scanner.isTouching(ground)) {
      player.velocityY = -15;
    }
    if(!scanner.isTouching(ground)){
      player.rotationSpeed =12
    }else{
      player.rotationSpeed =0
      player.rotation =00
    }
    player.velocityY = player.velocityY + 1;
    
    player.collide(ground);
    if(player.isTouching(rockGroup)){
      gameState = END
    }
    console.log(scale)
    if(player.isTouching(bananaGroup)&&num ==1){
      player.scale = player.scale+0.05;
      banana.destroy()
      num = 0
    }else if(!player.isTouching(bananaGroup)){
        num =1
    }


    createRocks()
    createBanana()
  }else if(gameState===END){//-------------------------------------------------------EEEEEEEEEEENNNNNNNNNNNDDDDDDDDD-------------------------------------
    player.velocityY=0
    player.rotationSpeed =0
    rockGroup.velocityX = 0
    backgr.velocityX = 0
  }
  drawSprites();
}
function createRocks(){
  if(frameCount%60===0){
    var rock =createSprite(800,350)
    rock.addImage(rockimg)
    rock.velocityX=-10
    rock.scale =0.1
    rockGroup.add(rock)
  }
}
function createBanana(){
  if(frameCount%150===0){
    var banana =createSprite(800,200)
    banana.addImage(bananaimg)
    //banana.rotationSpeed =20
    banana.velocityX=-17
    banana.scale =0.05
    bananaGroup.add(banana)
    
  }
  
}