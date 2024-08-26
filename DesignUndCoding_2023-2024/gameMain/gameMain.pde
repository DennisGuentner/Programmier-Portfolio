// Design&Coding finale Abgabe vom 19.03.2024
// Der Code ist völlig selber erstellt worden!


//Ich importiere die Robot Klasse, um die Mausposition auf den spielBildschirm zu limitieren, da ich unbedingt die Maus als Steuerelement nutzen wollte.
import java.awt.Robot;
import oscP5.*;
import netP5.*;

OscP5 osc;
NetAddress meineAdresse;

OscMessage fishDashMessage = new OscMessage("fishDash");
OscMessage waterfallMessage = new OscMessage("waterfall");
OscMessage musicMessage = new OscMessage("music");
OscMessage fishHitMessage = new OscMessage("fishHit");

boolean varToZero; //Wenn das Spiel zuende ist oder pausiert werden alle variablen die die Objekte bewegen auf 0 gesetzt. Derboolean prüft ob dies schon getan wurde um dies nicht immer wieder zu tun!
int worldLeftBorder;
int worldRightBorder;
int centerX;
int centerY;

//Playerstats:
int playerPosX;
int lives = 3;
int endurance = 12; //in sekunden wenn man nichts tut!
int struggle = 1; //Jedes Frame wird die Menge abgezogen!
int enduranceGainMultiplier = 3;
int enduranceGainHit = 20;
int enduranceGainHitPerfect = enduranceGainHit * enduranceGainMultiplier;
float easing = 0.05;
int fishDashTime = 0;

int timer = 0;

//WaveStats:
int waveHeight;
int counterWaves = 0; 
int speedWave = 12;
 
//StoneStats
int counterStones = 0; 
int speedStone = 5;


//perfectEffectStats
int counterPerfect = 0;
int perfectWaveSize;
int perfectAnimationSpeed;

//Bilder;
PImage playerImg;
PImage playerLiveImg;
PImage waveImage;
PImage rockImg;
PImage customMouseImage;


Robot robot;
Menu menu;
Waterfall waterfall;
Wave[] waves = new Wave[7];
Stone[] stones = new Stone[14];
PerfectEffect[] perfect = new PerfectEffect[waves.length];
Fish player;
StatsDisplay statsDisplay;
ObjectSpawnTimer objectSpawnTimer;




void setup() {
  frameRate(60);
  fullScreen();
  background(0,0,0);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  noCursor();
  noSmooth();
  
  playerImg = loadImage("Pictures/fish2.png");
  playerLiveImg = loadImage("Pictures/playerLife2.png");
  waveImage = loadImage("Pictures/wave.png");
  rockImg = loadImage("Pictures/stone3.png");
  customMouseImage = loadImage("Pictures/customMouseCursor.png");
     
  varToZero = false;
  centerX = (width / 2);
  centerY = (height / 2);
  
  //Objekte werden erstellt.
  waterfall = new Waterfall(centerX, height);
  worldLeftBorder = centerX - (waterfall.waterfallWidth / 2);
  worldRightBorder = centerX + (waterfall.waterfallWidth / 2);
  menu = new Menu(centerX, centerY, waterfall.waterfallWidth,waterfall.waterfallHeight, customMouseImage);
  player = new Fish(centerX, waterfall.waterfallHeight, worldLeftBorder, worldRightBorder, easing, waterfall.waterfallWidth, playerImg);
  statsDisplay = new StatsDisplay(centerX, waterfall.waterfallWidth, waterfall.waterfallHeight, endurance, struggle, lives, playerLiveImg, player.fishWidth, player.fishHeight);
  perfectWaveSize = player.fishWidth;
  perfectAnimationSpeed = perfectWaveSize / 20;
  
  
  //SoundDesign
  osc = new OscP5(this,12000);
  meineAdresse = new NetAddress("192.160.1.14", 12345);
  //osc.send(musicMessage,meineAdresse);

  
//Aus dem internet:******
  try {
    robot = new Robot();
  } catch (Throwable e) {}
}




void draw() {
  constraintMouseCursor();
  waterfall.render();
  
  //Wellen werden gerendert
  for(int i = 0; i < waves.length; i++) {
    if(waves[i] != null) {
      waves[i].render();
      if(waves[i].wavePosY > waterfall.waterfallHeight) waves[i] = null;
    }
  }
  
  //Steine werden gerendert:
  for(int i = 0; i < stones.length; i++) {
    if(stones[i] != null) {
      stones[i].render();
      if(stones[i].stonePosY > waterfall.waterfallHeight) stones[i] = null;
    }
  }
  
  statsDisplay.render();
  player.render(playerPosX);
  for(int i = 0; i < perfect.length; i++) {
    if(perfect[i] != null) {
      perfect[i].render(constrain(player.fishPosX, player.fishWorldBorderLeft, player.fishWorldBorderRight));
      
      if(perfect[i].renderFinished()) perfect[i] = null; 
    }
  }
  gameStatus();
  
  //Die Geschwindigkeit für die Fischanimation wird kurz beschleunigt
  if(fishDashTime > 0) {
      player.animationSpeed = 1;
      fishDashTime--; 
    } else {
      player.animationSpeed = 3;
    }
}




void mousePressed() {
  if(mouseButton == LEFT) {
    fishDashTime = 30;
    osc.send(fishDashMessage, meineAdresse);
    
    //Es wird geprüft ob der Fish eine Welle reiten kann!
    for(int i = 0; i < waves.length; i++) {
      if(waves[i] != null) {
        if((waves[i].wavePosY + waves[i].waveBorderdistanceFromItsCenterY > player.fishInnerBorderTop) && (waves[i].wavePosY - waves[i].waveBorderdistanceFromItsCenterY < player.fishInnerBorderBottom)) {
          statsDisplay.endurance += enduranceGainHitPerfect;
          statsDisplay.punkte    += enduranceGainHitPerfect;
          
          perfect[counterPerfect] = new PerfectEffect(perfectWaveSize, player.fishPosY, perfectAnimationSpeed);
          counterPerfect = (counterPerfect + 1) % perfect.length;
        } else if((waves[i].wavePosY + waves[i].waveBorderdistanceFromItsCenterY > player.fishBorderTop) && (waves[i].wavePosY - waves[i].waveBorderdistanceFromItsCenterY < player.fishBorderBottom)) {
          statsDisplay.endurance += enduranceGainHit;
          statsDisplay.punkte    += enduranceGainHit;
        }
      }
    }
  }
}




void constraintMouseCursor() {
  if(mouseX < worldLeftBorder) {robot.mouseMove(worldLeftBorder, mouseY);}
  else if(mouseX > worldRightBorder) {robot.mouseMove(worldRightBorder, mouseY);}
}




void harmfullCollision() {
  for(int i = 0; i < stones.length; i++) {
    if(stones[i] != null && stones[i].stoneHit == false) {
      if((stones[i].stonePosY + stones[i].stoneBorderDistanceFromItsCenterY > player.fishBorderTop) &&
         (stones[i].stonePosY - stones[i].stoneBorderDistanceFromItsCenterY < player.fishBorderBottom) &&
         (stones[i].stonePosX + stones[i].stoneBorderDistanceFromItsCenterX > player.fishPosX - player.fishBorderdistanceFromItsCenterX) &&
         (stones[i].stonePosX - stones[i].stoneBorderDistanceFromItsCenterX < player.fishPosX + player.fishBorderdistanceFromItsCenterX)) {
        statsDisplay.lives--;
        stones[i].stoneHit = true;
        
        osc.send(fishHitMessage, meineAdresse);
      }
    }
  }
}




void gameStatus() {
  if(statsDisplay.lives > 0 && statsDisplay.endurance > 0) {
    playerPosX = mouseX;
    
    //Muss noch ersetzt werden*********************************************************************************************************************************************************************************
    if(timer % 60 == 0) {
    waves[counterWaves] = new Wave(centerX, waterfall.waterfallWidth, waterfall.waterfallHeight, speedWave, waveImage);
    counterWaves = (counterWaves + 1) % waves.length;
    }
    if(timer % 65 == 0) {
      stones[counterStones] = new Stone(centerX, waterfall.waterfallWidth, waterfall.waterfallHeight, speedStone, rockImg);
      counterStones = (counterStones + 1) % stones.length;
    }
    
    timer++;
    //*********************************************************************************************************************************************************************************************************
    
    //Kollisionen mit Steinen werden gecheckt
    harmfullCollision();
    
  } else {
    if(varToZero == false) {
      varToZero = true;
      statsDisplay.struggle = 0;
      player.fishXEasing = 0;
      enduranceGainHit = 0;
      enduranceGainHitPerfect = 0;
      
      for(int i = 0; i < waves.length; i++) {
        if(waves[i] != null) {
          waves[i].waveSpeed = 0;
        }
      }
      for(int i = 0; i < stones.length; i++) {
        if(stones[i] != null) {
          stones[i].stoneSpeed = 0;
        }
      }
    }
    
    menu.GameOver(mouseX, mouseY);
    
    if(menu.restartStatus == true) { 
      menu.restartStatus = false;
      varToZero = false;
      
      statsDisplay.lives = lives;
      statsDisplay.endurance = endurance * 60;
      statsDisplay.struggle = struggle;
      player.fishXEasing = 0.05;
      enduranceGainHit = 60 ;
      enduranceGainHitPerfect = enduranceGainHit * enduranceGainMultiplier;
      statsDisplay.punkte = 0;
      
      //Wellen werden gelöscht:
      for(int i = 0; i < waves.length; i++) {
        waves[i] = null;
      }
    
      //Steine werden gelöscht:
      for(int i = 0; i < stones.length; i++) {
        stones[i] = null;
      }
    }
  }
}
