class Stone {
  int stonePosX;
  int stonePosY;
  int stoneWidth;
  int stoneHeight;
  int stoneSpeed;
  
  //Kollisionsprüfdaten
  int stoneBorderDistanceFromItsCenterX;
  int stoneBorderDistanceFromItsCenterY;
  boolean stoneHit;
  
  //Bild Daten
  PImage rockImage;
  PImage currentImage;
  int imageWidth;
  int imageHeight;
  
  Stone(int centerX, int waterfallWidth, int waterfallHeight, int speed, PImage rock) {
    this.stoneWidth = waterfallHeight / 15;
    this.stoneHeight = this.stoneWidth;
    this.imageWidth = this.stoneWidth * 3 / 2;
    this.imageHeight = this.stoneHeight * 3 / 2;
    this.stonePosX = centerX - ((waterfallWidth - this.imageWidth) / 2) + (int)random(waterfallWidth - this.imageWidth * 2) ;
    this.stonePosY = -this.stoneHeight * 2;
    this.stoneSpeed = speed;
    
    this.stoneBorderDistanceFromItsCenterX = this.stoneWidth / 2;
    this.stoneBorderDistanceFromItsCenterY = this.stoneHeight / 2;
    stoneHit = false;
    
    this.rockImage = rock;
  }
  
  void render(){
    currentImage = rockImage.get(0,frameCount / 4 % 4 * 32,32,32);
    image(currentImage, this.stonePosX, this.stonePosY, this.imageWidth, this.imageHeight);
    //rect(this.stonePosX, this.stonePosY, this.stoneWidth, this.stoneHeight);
    this.stonePosY += this.stoneSpeed;
  }
}
