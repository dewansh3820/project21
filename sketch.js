var space, spaceImg; 
var rocket, rocketExplosion;
var asteroid, asteroidsGroup;
var asteroid1, asteroid2, asteroid3;
var gameState = "play"
var gameOver, restart

function preload(){
spaceImg = loadImage ("space.jfif")

rocketImg= loadAnimation ("rocket.png")
rocketImg2= loadAnimation ("rocket without fuel.png")

asteroid1= loadImage ("asteroid.png")
asteroid2 = loadImage ("asteroid 2.png")
asteroid3 = loadImage ("asteroid 3.png")

gameOverImg = loadImage ("gameOver.png")
restartImg = loadImage ("restart.png")
rocketExplosion = loadAnimation("rocket explosion.png")
}

function setup() {


  // creating canvas
 createCanvas(400,600)

 // creating space
 space = createSprite(200,300);
 space.addImage("space",spaceImg)
 space.scale = 1
 space.velocityY=5

 // creating rocket
 rocket = createSprite(190,500,20,20)
 rocket.addAnimation("rocket",rocketImg2)
 rocket.addAnimation("rocket 2",rocketImg)
 rocket.addAnimation("rocket explosion",rocketExplosion)
 rocket.scale = 0.15

 asteroidsGroup = new Group() ;

 gameOver = createSprite (200, 280)
 gameOver.addImage("gameOver",gameOverImg)
 gameOver.scale = 0.7

 restart = createSprite (200,340)
 restart.addImage ("restart",restartImg)
 restart.scale = 0.4
restart.debug = true;
}

function draw() {
 
  rocket.depth = 2
  rocket.debug = true;

  // making space infinite
 if (space.y > 500) {
    space.y = 100
 }

 if (gameState ==="play"){

   gameOver.visible = false;
   restart.visible = false;

   // controls of rocket
   if (keyDown("up") || keyDown("space")){
     rocket.velocityY = -6
     rocket.changeAnimation("rocket 2",rocketImg)
     rocket.scale = 0.15
   }

   if (keyDown("right")){
      rocket.x = rocket.x + 3
   }

   if (keyDown("left")){
     rocket.x = rocket.x - 4
   }

   //gravity
   rocket.velocityY = rocket.velocityY + 2

   //changing animation of rocket 
   if (keyWentUp("up") || keyWentUp("space")){
      rocket.changeAnimation("rocket",rocketImg2 )
      rocket.scale = 0.13
   }

   // creating asteroids
   spawnAsteroid();

   if (asteroidsGroup.isTouching(rocket) || rocket.y > 600){
     gameState = "end"
   }
 }

 else if (gameState === "end"){

    gameOver.visible = true;
    restart.visible = true;

    space.velocityY = 0
    asteroidsGroup.setVelocityYEach(0)
    rocket.velocityY = 0

   asteroidsGroup.setLifetimeEach(-1)

   rocket.changeAnimation("rocket explosion",rocketExplosion)

   if (keyDown("enter")){
     //reset();
     background ("red")
   }
 }

 drawSprites();
  
}

function spawnAsteroid(){

  if (frameCount % 80 === 0){

    asteroid = createSprite(200, -50)
    asteroid.velocityY = 7

    var rand = Math.round (random(1,3))

    switch (rand) {
      case 1: asteroid.addImage(asteroid2)
      asteroid.setCollider("rectangle",0,0,200,360)
      asteroid.scale = 0.2
              break;
      case 2: asteroid.addImage(asteroid3)
              break;
      case 3: asteroid.addImage(asteroid1) 
              break;
      default: break;
    }

    asteroid.scale = 0.3

    asteroid.x = Math.round(random(50,350))

    asteroid.depth = 1

    asteroid.lifetime = 100

    asteroidsGroup.add(asteroid)

    asteroid.debug = true;
  }
}

function restarting (){
  gameState = "play"

}

