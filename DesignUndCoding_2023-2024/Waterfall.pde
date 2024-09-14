class Waterfall {

  int waterfallPosX;
  int waterfallPosY;
  int waterfallWidth;
  int waterfallHeight;

  int waterfallBorderDistanceFromItsCenter;
  
  Waterfall(int centerX, int screenHeight) {
    this.waterfallPosX = centerX;
    this.waterfallPosY = screenHeight / 2;
    this.waterfallWidth = screenHeight * 9 /16;
    this.waterfallHeight = screenHeight;
   }
   
   void render() {
     fill(50, 100, 255);
     //image(currentImage, this.stonePosX - this.stoneWidth * 2 / 3, this.stonePosY, this.imageWidth, this.imageHeight);
     rect(this.waterfallPosX, this.waterfallPosY, this.waterfallWidth, this.waterfallHeight);
   }
   
   int getWidth() {
     return waterfallWidth;
   }
}
