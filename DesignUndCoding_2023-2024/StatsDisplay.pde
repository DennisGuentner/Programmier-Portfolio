class StatsDisplay {
  int statsDisplayPosX;
  int statsDisplayPosY;
  int statsDisplayWidth;
  int statsDisplayHeight;

  int lives;
  int livesDisplayWidth;
  int livesDisplayHeight;
  int livesDisplayPosX;
  int livesDisplayPosY;
  int livesDisplayDistance;
  PImage liveImage;
  
  int endurance;
  int enduranceMax;
  int struggle;
  int endurancePosX;
  int endurancePosY;
  int enduranceMeterPosX;
  int enduranceMeterPosY;
  int enduranceMeterWidth;
  int enduranceMeterHeight;
  int enduranceMeterCorner;
  
  //Punkte
  int punkte;
  int punkteTextSize;
  int punktePosX;

  
  
  
  StatsDisplay(int centerX, int waterfallWidth, int waterfallHeight, int endurance, int struggle, int lives, PImage liveImage, int fishWidth, int fishHeight) {
    this.statsDisplayWidth = waterfallWidth;
    this.statsDisplayHeight = waterfallHeight * 11 / 90; 
    this.statsDisplayPosX =  centerX;
    this.statsDisplayPosY = waterfallHeight - this.statsDisplayHeight / 2;
    
    this.lives = lives;
    this.livesDisplayWidth = fishWidth * 3 / 5;
    this.livesDisplayHeight = livesDisplayWidth * 2;
    this.livesDisplayPosX = centerX + this.statsDisplayWidth / 13;
    this.livesDisplayPosY = waterfallHeight - this.statsDisplayHeight / 2;
    this.livesDisplayDistance = this.livesDisplayWidth * 2;
    this.liveImage = liveImage;
    
    this.endurance = endurance * 60;
    this.enduranceMax = this.endurance;
    this.struggle = struggle;
    this.enduranceMeterPosX = centerX - this.statsDisplayWidth / 4;
    this.enduranceMeterPosY = waterfallHeight - this.statsDisplayHeight / 2;
    this.enduranceMeterWidth = this.statsDisplayWidth * 2 / 5;
    this.enduranceMeterHeight = this.statsDisplayHeight / 3;
    this.enduranceMeterCorner = this.enduranceMeterHeight / 4;
    this.endurancePosX = enduranceMeterPosX - enduranceMeterWidth / 2;
    this.endurancePosY = enduranceMeterPosY - enduranceMeterHeight / 2;
    
    this.punkte = 0;
    this.punkteTextSize = waterfallHeight / 20;
    this.punktePosX = centerX + waterfallWidth / 2;
  }
  
  void renderBackground() {
    fill(230,230,140);
    rect(this.statsDisplayPosX, this.statsDisplayPosY, this.statsDisplayWidth, this.statsDisplayHeight);
  }
  
  void renderEndurance() {
    rectMode(CORNER);
    fill(0,255,0);
    if(this.endurance > this.enduranceMax) this.endurance = this.enduranceMax;
    if(this.endurance >= 0){
      this.endurance -= this.struggle;
    } else {
      this.endurance = 0;
    }
    
    rect(endurancePosX, endurancePosY, enduranceMeterWidth * endurance / enduranceMax, enduranceMeterHeight, enduranceMeterCorner);
    
    rectMode(CENTER);
    stroke(0, 0, 0);
    strokeWeight(6);
    fill(0,0,0, 0);
    rect(enduranceMeterPosX, enduranceMeterPosY, enduranceMeterWidth, enduranceMeterHeight, enduranceMeterCorner);
    strokeWeight(1);
  }
  
  void renderLives() {
    for(int i = 0; i < lives; i++) {
      fill(0, 255, 0);
      image(liveImage, this.livesDisplayPosX + this.livesDisplayDistance * i, this.livesDisplayPosY, this.livesDisplayWidth, this.livesDisplayHeight);
      //rect(this.livesDisplayPosX + this.livesDisplayDistance * i, this.livesDisplayPosY, this.livesDisplayWidth, this.livesDisplayHeight);
    }
  }
  
  void renderPunkte() {
    textAlign(RIGHT);
    textSize(this.punkteTextSize);
    fill(255, 255,255);
    text(punkte, this.punktePosX - punkteTextSize / 4, punkteTextSize);
    
  }
  
  void render(){
    renderBackground();
    renderEndurance();
    renderLives();
    renderPunkte();
  }

}
