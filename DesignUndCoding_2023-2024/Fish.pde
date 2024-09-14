class Fish {
  float fishPosX;
  float fishXEasing;
  int fishPosY;
  int fishWidth;
  int fishHeight;
  
  //Kollisionen
  int fishBorderdistanceFromItsCenterX;
  int fishBorderTop;
  int fishBorderBottom;
  int fishInnerBorderTop;
  int fishInnerBorderBottom;
  
  //Bewegungsgrenze an der X-Achse
  int fishWorldBorderLeft ;
  int fishWorldBorderRight;
  int worldLeftBorder;
  int worldRightBorder;
  
  //Für Tests
  int centerX;
  int worldWidth;
  
  //Animation:
  PImage fishImg;
  PImage currentImage;
  int fishImgWidth;
  int fishImgHeight;
  int animationSpeed;

 
  
  Fish(int centerX, int waterfallHeight, int worldLeftBorder, int worldRightBorder, float easing, int worldWidth, PImage playerImage) {
    this.fishPosX = centerX;
    this.fishXEasing = easing;
    this.fishPosY = waterfallHeight - (waterfallHeight * 3 / 7);
    this.fishWidth = waterfallHeight / 15;
    this.fishHeight = fishWidth * 2;
    this.fishImgWidth = fishWidth * 6 / 5;
    this.fishImgHeight = fishImgWidth * 2;
    
    //Kollisionen
    this.fishBorderdistanceFromItsCenterX = this.fishImgWidth / 2;
    this.fishBorderTop = fishPosY - this.fishHeight / 2;
    this.fishBorderBottom = fishPosY + this.fishHeight / 2;
    this.fishInnerBorderTop = fishPosY - this.fishHeight / 8;
    this.fishInnerBorderBottom = fishPosY + this.fishHeight / 8;
    
    
    //Bewegungsgrenze an der X-Achse
    this.fishWorldBorderLeft = worldLeftBorder + fishBorderdistanceFromItsCenterX;
    this.fishWorldBorderRight = worldRightBorder - fishBorderdistanceFromItsCenterX;
    
    //Für Tests
    this.centerX = centerX;
    this.worldLeftBorder = worldLeftBorder;
    this.worldRightBorder = worldRightBorder;
    this.worldWidth = worldWidth;
    
    //Animation
    this.fishImg = playerImage;
    this.animationSpeed = 3;
  }
  
  void renderWaveKollisionArea() {
    fill(255,255,0,125);
    rect(this.centerX, this.fishPosY, this.worldWidth, this.fishBorderBottom - this.fishBorderTop);
    fill(255,155,0,125);
    rect(this.centerX, this.fishPosY, this.worldWidth, this.fishInnerBorderBottom - this.fishInnerBorderTop);
  }
  
  void render(int mouseXPosition) {
    //renderWaveKollisionArea(); //Test
    //fill(255, 0, 0);
    //rect(constrain(this.fishPosX, this.fishWorldBorderLeft, this.fishWorldBorderRight), this.fishPosY, this.fishWidth, this.fishHeight);
    currentImage = fishImg.get(0,frameCount / animationSpeed  % 8 * 32, 16, 32);
    image(currentImage, constrain(this.fishPosX, this.fishWorldBorderLeft, this.fishWorldBorderRight), this.fishPosY, this.fishImgWidth, this.fishImgHeight);
   
   
    this.fishPosX += (mouseXPosition - this.fishPosX) * this.fishXEasing;
    
    
    
  }
}
